const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'taller_mecanico';
let db;

/* 
* Conexión a Mongo
*/
MongoClient.connect(url)
  .then(client => {
    db = client.db(dbName);
  })
  .catch(err => console.error("Error conectando a MongoDB:", err.message));

/* 
* Configuración de Swagger
*/
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Taller Mecánico API',
      version: '1.6.1',
      description: 'Documentación de la API del Taller Mecánico'
    }
  },
  apis: [__filename] 
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/*
* fetch http://localhost:3001/login
* method POST
* Content type application/json
* body { user, password }
*/
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticar usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente.
 *       401:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
app.post('/login', async (req, res) => {
  if (!db) {
    return res.status(500).json({ message: "Base de datos no inicializada" });
  }

  const { user, password } = req.body;

  try {
    let someUsername = await db.collection('users').findOne({ user, password }); 

    if (someUsername) {
      return res.status(200).json({
        message: `¡Hola, ${someUsername.user}!`,
        role: someUsername.role, 
      });
    }

    return res.status(401).json({ message: "No se encontró el usuario" });

  } catch (err) {
    console.error("Error en el servidor:", err);
    return res.status(500).json({ message: "Error en el servidor", err });
  }
});

/**
 * @swagger
 * /tools:
 *   get:
 *     summary: Obtener todas las herramientas o filtrar por búsqueda
 *     description: Devuelve una lista de herramientas. Si se incluye el parámetro `search`, se filtran las herramientas cuyo nombre coincida parcialmente con el texto proporcionado.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Texto para filtrar herramientas por nombre.
 *     responses:
 *       200:
 *         description: Lista de herramientas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único de la herramienta.
 *                   name:
 *                     type: string
 *                     description: Nombre de la herramienta.
 *                   status:
 *                     type: string
 *                     description: Estado de la herramienta.
 *                   brand:
 *                     type: string
 *                     description: Marca de la herramienta.
 *       500:
 *         description: Error en el servidor.
 */
app.get('/tools', async (req, res) => {
  const collectionTools = db.collection('tools');
  const { search } = req.query; // Obtener el parámetro de búsqueda

  try {
    let query = {};
    if (search) { // Inclusión de la opción de búsqueda con el campo search para filtrar las herramientas por nombre
      query = { name: { $regex: search, $options: 'i' } };
    }

    const herramientas = await collectionTools.find(query).toArray();
    res.json(herramientas);
  } catch (err) {
    console.error("Error al obtener herramientas:", err);
    res.status(500).json({ message: "Error al obtener herramientas", err });
  }
});

/*
* fetch http://localhost:3001/tools
* method POST
* Content type application/json
* body { name, status, brand }
*/
/**
 * @swagger
 * /tools:
 *   post:
 *     summary: Añadir una herramienta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *               brand:
 *                 type: string
 *     responses:
 *       200:
 *         description: Herramienta añadida correctamente.
 *       500:
 *         description: Error en el servidor.
 */

// Insertar herramienta nueva
app.post('/tools', async (req, res) => {
  const { name, status, brand } = req.body;
  const collectionTools = db.collection('tools');
  const newTool = { name, status, brand };
  const result = await collectionTools.insertOne(newTool);
  res.json({ message: 'Herramienta añadida:', tool: { _id: result.insertedId, name, status, brand } });
});

/**
 * @swagger
 * /tools/{id}:
 *   patch:
 *     summary: Actualiza los detalles de una herramienta.
 *     description: Permite actualizar los campos name, status y brand de una herramienta específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la herramienta a actualizar.
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: Campos a actualizar.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: Llave Inglesa
 *             status:
 *               type: string
 *               example: disponible
 *             brand:
 *               type: string
 *               example: Black+Decker
 *     responses:
 *       200:
 *         description: Herramienta actualizada correctamente.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Herramienta actualizada
 *       400:
 *         description: No se enviaron campos válidos para actualizar.
 *       404:
 *         description: Herramienta no encontrada.
 *       500:
 *         description: Error al actualizar la herramienta.
 */

// Actualizar herramienta total o parcialmente
app.patch('/tools/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status, brand } = req.body;

  if (!name && !status && !brand) {
    return res.status(400).json({ message: "Se requiere al menos un campo para actualizar (name, status, brand)." });
  }

  const collectionTools = db.collection('tools');

  try {

    const updateFields = {};
    if (name) updateFields.name = name;
    if (status) updateFields.status = status;
    if (brand) updateFields.brand = brand;

    const updatedTool = await collectionTools.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (updatedTool.matchedCount > 0) {
      res.json({ message: 'Herramienta actualizada' });
    } else {
      res.status(404).json({ message: 'Herramienta no encontrada' });
    }
  } catch (err) {
    console.error("Error al actualizar la herramienta:", err);
    res.status(500).json({ message: 'Error al actualizar la herramienta', err });
  }
});

/*
* fetch http://localhost:3001/tools/${id}
* method DELETE
*/
/**
 * @swagger
 * /tools/{id}:
 *   delete:
 *     summary: Eliminar una herramienta
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la herramienta
 *     responses:
 *       200:
 *         description: Herramienta eliminada correctamente.
 *       404:
 *         description: Herramienta no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
app.delete('/tools/:id', async (req, res) => {
  const { id } = req.params;
  const allTools = db.collection('tools');
  const deletedTool = await allTools.deleteOne({ _id: new ObjectId(id) });
  if (deletedTool.deletedCount > 0) {
    res.json({ message: 'Herramienta eliminada' });
  } else {
    res.status(404).json({ message: 'Herramienta no encontrada' });
  }
});

/*
* fetch http://localhost:3001/notifications
*/
/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Obtener todas las notificaciones
 *     responses:
 *       200:
 *         description: Lista de notificaciones.
 *       500:
 *         description: Error en el servidor.
 */
app.get('/notifications', async (req, res) => {
  const collectionNotifications = db.collection('notifications');
  const allNotifications = await collectionNotifications.find().toArray();
  res.json(allNotifications);
});

/*
* fetch http://localhost:3001/notifications
* method POST
* Content type application/json
* body { message }
*/
/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Crear una notificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notificación creada correctamente.
 *       500:
 *         description: Error en el servidor.
 */
app.post('/notifications', async (req, res) => {
  const { message } = req.body;
  const collectionNotifications = db.collection('notifications');
  const newNotification = {
    message,
    fecha: new Date()
  };

  try {
    const result = await collectionNotifications.insertOne(newNotification);

    const insertedNotification = await collectionNotifications.findOne({ _id: result.insertedId });

    res.json({ message: 'Notificación enviada', notification: insertedNotification });
  } catch (err) {
    console.error('Error al insertar la notificación:', err);
    res.status(500).json({ message: 'Error al insertar la notificación', err });
  }
});

/*
* fetch http://localhost:3001/notifications
* method DELETE
*/
/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Eliminar una notificación
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación eliminada correctamente.
 *       404:
 *         description: Notificación no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
app.delete('/notifications/:id', async (req, res) => {
  const { id } = req.params
  const allNotifications = db.collection('notifications')
  const deletedNotification = await allNotifications.deleteOne({ _id: new ObjectId(id) })

  if (deletedNotification.deletedCount > 0) {
    res.json({ message: 'Notificacion eliminada' })
  } else {
    res.status(404).json({ message: 'Notificacion no encontrada' })
  }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

# App-MERN-Crud

Este proyecto grupal consiste en el desarrollo de una aplicación completa utilizando la arquitectura MERN (MongoDB, ExpressJS, React y Node.js). La aplicación incluye:

- Un servidor backend construido con ExpressJS, que gestiona las operaciones del sistema y está conectado a una base de datos MongoDB para la manipulación y almacenamiento de datos

- Un cliente frontend desarrollado con React, que ofrece una interfaz dinámica e interactiva para los usuarios finales.

El objetivo principal del proyecto es implementar un sistema funcional y escalable como parte del curso de Desarrollo Web del Campus Digital San Blas, aplicando las mejores prácticas en desarrollo de software.

## ROLES

- Lead Developer: [Andrés](https://github.com/andresr0826)
- Analyst Developer: [Marco Ferreira](https://github.com/MarcoApunto)
- Relaciones Públicas: [Rolando Cepeda](https://github.com/Rolando-Cepeda)

## INSTRUCCIONES

> [!IMPORTANT]  
> Tener instalado MongoDB Compass.

- Primeramente, crearemos una base de datos. Previamente su configuración ha de ser que funcione de manera _local_ `(mongodb://localhost:27017/)`

- La Base de Datos tiene que tener la siguiente estructura:

```
taller_mecanico
├── users
│
├── tools
│
├── notifications
```

- Creada dicha estructura con los nombres correspondientes, importaremos de una en una en cada colección la colección corespondiente que se encuentra en el directorio de las [colecciones](./mongo-taller_mecanico-collections/)

- En la carpeta raíz, instalaremos las dependencias con `npm i` e inicializaremos el servidor con `npm start`. Su puerto está configurado en el _3001_ y con el `CORS` trabajando de manera específica para el cliente REACT, que está asignado al puerto _3000_

- Finalmente, nos situaremos en el directorio [cliente](./client), instalamos las dependencias con `npm i` y lo inicializaremos con `npm start`

## INICIAR SESIÓN

- En la colección _users_ en MongoDB, se encuentra todos los usuarios activos en el sistema.

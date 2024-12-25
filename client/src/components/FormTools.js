/*
 * @author Andrés
 * @fecha 19/12/2024
 * @description Componente Formulario que crea y modifica las herramientas.
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";

const FormTools = () => {
  // Definición de los estados necesarios para manejar las herramientas y el formulario
  const [tools, setTools] = useState([]);
  const [formData, setFormData] = useState({ name: "", status: "", brand: "" });
  const [showForm, setShowForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Carga inicial de herramientas desde el backend al montar el componente
  useEffect(() => {
    fetchTools();
  }, []);

  // Función para obtener la lista de herramientas del backend
  const fetchTools = async () => {
    try {
      const response = await fetch("http://localhost:3001/tools");
      if (!response.ok) throw new Error("Error al obtener herramientas");
      const data = await response.json();
      setTools(data);
    } catch (error) {
      console.error("Error al cargar herramientas:", error);
      alert("No se pudieron cargar las herramientas.");
    }
  };

  // Maneja los cambios en los campos del formulario para actualizar el estado
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Prepara el formulario para crear una nueva herramienta
  const handleNewTool = () => {
    setFormData({ name: "", status: "", brand: "" });
    setShowForm(true);
    setIsCreating(true);
  };

  // Prepara el formulario para editar una herramienta seleccionada
  const handleEdit = (tool) => {
    setFormData({ _id: tool._id, name: tool.name, status: tool.status, brand: tool.brand });
    setShowForm(true);
    setIsCreating(false);
  };

  // Envía los datos del formulario al backend, ya sea para crear o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isCreating
        ? await fetch("http://localhost:3001/tools", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          })
        : await fetch(`http://localhost:3001/tools/${formData._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

      if (!response.ok) throw new Error("Error al guardar la herramienta");
      setFormData({ name: "", status: "", brand: "" });
      setShowForm(false);
      fetchTools();
    } catch (error) {
      console.error("Error al guardar la herramienta:", error);
      alert("No se pudo guardar la herramienta.");
    }
  };

  // Cierra el formulario y restablece los datos sin guardar cambios
  const handleCancel = () => {
    setFormData({ name: "", status: "", brand: "" });
    setShowForm(false);
  };

  // Elimina una herramienta específica mediante su ID
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/tools/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar la herramienta");
      fetchTools();
    } catch (error) {
      console.error("Error al eliminar la herramienta:", error);
      alert("No se pudo eliminar la herramienta.");
    }
  };

  return (
    <div>
      <button className="new-tool-button" onClick={handleNewTool}>
        Nueva Herramienta
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="tool-form">
          <input
            type="text"
            name="name"
            placeholder="Nombre de la herramienta"
            value={formData.name}
            onChange={handleInputChange}
            autoFocus
          />
          <input
            type="text"
            name="brand"
            placeholder="Marca"
            value={formData.brand}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="status"
            placeholder="Estado"
            value={formData.status}
            onChange={handleInputChange}
          />
          <div>
            <button type="submit">{isCreating ? "Agregar" : "Actualizar"}</button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool._id}>
              <td>{tool.name}</td>
              <td>{tool.brand}</td>
              <td>{tool.status}</td>
              <td>
                <button onClick={() => handleEdit(tool)}>Editar</button>
                <button onClick={() => handleDelete(tool._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormTools;








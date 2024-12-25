/*
 * @author Rolando Cepeda
 * @fecha 17/12/2024
 * @description Componente Formulario que realizará las notificaciones.
 * @version 1.0.0
 */

import React, { useState } from "react";

const FormularioNotificacion = () => {
  // Estado inicial de los campos del formulario

  const [comentarios, setComentarios] = useState(""); // Identifica el estado del campo COMENTARIOS

  // Función para manejar el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosMecanico = { message : comentarios };
    console.log(datosMecanico);
    // Incluimos un TRY por si hubiera algun error, enviamos los datos al BACKEND.
    try {
      const respuesta = await fetch("http://127.0.0.1:3001/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Cabecera de la petición
        body: JSON.stringify(datosMecanico), // Cuerpo de la petición.
      });
      // Condición si no hubiera respuesta.
      if (!respuesta.ok) {
        throw new Error("Error al realizar la solicitud");
      }
      const resultado = await respuesta.json(); //Espera la respuesta en formato JSON.
      alert("Herramienta añadida: " + JSON.stringify(resultado));
      /* if (onSubmit) onSubmit(datosMecanico); // Llamar a la función onSubmit pasada por props */
    } catch (error) {//Si hay un error lo captura
      alert("Error al enviar los datos: ", error.message);
    }
  };

  return (
    <>
    
    <form onSubmit={handleSubmit}>
    <h2>Notificar herramientas</h2>
      <textarea placeholder="Comentarios" value={comentarios} onChange={(e) => setComentarios(e.target.value)} cols={40} rows={8}></textarea>
      <button type="submit">Notificar</button>
    </form>
  </>
  );
};

export default FormularioNotificacion;

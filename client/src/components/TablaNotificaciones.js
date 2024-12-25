/*
 * @author Rolando Cepeda @author Andrés Rojas R.
 * @fecha 17/12/2024
 * @description Componente TablaNotificaciones para mostrar y gestionar las notificaciones.
 * @version 1.0.0
 */
import React from "react";

const TablaNotificaciones = ({ notificaciones, onEliminar }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Mensaje</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {notificaciones.map((notificacion) => (
          <tr key={notificacion._id}>
            <td>{notificacion._id}</td>
            <td>{notificacion.message}</td>
            <td>{new Date(notificacion.fecha).toLocaleString()}</td>
            <td>
              <button onClick={() => onEliminar(notificacion._id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaNotificaciones;




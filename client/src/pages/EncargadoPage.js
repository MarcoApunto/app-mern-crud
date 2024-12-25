/*
 * @author Rolando Cepeda @author Andrés Rojas Ríos
 * @fecha 17/12/2024
 * @description Componente encargado que administra las notificaciones y herramientas.
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TablaNotificaciones from "../components/TablaNotificaciones";
import FormTools from "../components/FormTools";
import Logout from "../components/Logout"; // Importa el componente Logout

const Encargado = () => {
  const [usuario, setUsuario] = useState(null); 
  const [notificaciones, setNotificaciones] = useState([]);

  // Obtener los datos de la sesión desde LocalStorage
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      const { username } = JSON.parse(session);
      setUsuario(username);
    }
  }, []);

  // Cargar notificaciones desde el backend
  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await fetch("http://localhost:3001/notifications");
        if (!response.ok) throw new Error("Error al cargar notificaciones");
        const datosBackend = await response.json();
        setNotificaciones(datosBackend);
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
        alert("No se pudieron cargar las notificaciones.");
      }
    };

    fetchNotificaciones();
  }, []);

  // Función para eliminar una notificación
  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/notifications/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar la notificación");

      // Eliminar la notificación del estado
      setNotificaciones(notificaciones.filter((notif) => notif._id !== id));
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
      alert("No se pudo eliminar la notificación.");
    }
  };

  return (
    <div>
      <Header />
      {usuario && (
  <div className="user-section">
    <span>{usuario}</span> 
    <Logout /> 
  </div>
)}
      <h2>Administrar notificaciones</h2>
      <TablaNotificaciones
        notificaciones={notificaciones}
        onEliminar={handleEliminar}
      />
      <h2>Administrar herramientas</h2>
      <FormTools />
      <Footer />
    </div>
  );
};

export default Encargado;






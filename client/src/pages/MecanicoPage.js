/*
 * @author Rolando Cepeda
 * @fecha 17/12/2024
 * @description Componente mecánico que realizará las notificaciones.
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';
import BuscarHerramientas from '../components/BuscarHerramientas';
import FormularioNotificacion from '../components/FormularioNotificacion';
import Logout from '../components/Logout';

// Página para el Mecánico.
const Mecanico = () => {
    const [usuario, setUsuario] = useState('');

      useEffect(() => {
        const session = localStorage.getItem("session");
        if (session) {
          const { username } = JSON.parse(session);
          setUsuario(username);
        }
      }, []);

    return (
        <div>
    
            <Header />
            <div className="user-section">
            {usuario}
            <Logout/> 
            </div>
            <BuscarHerramientas/>
            <FormularioNotificacion/>
            <Footer/>
        </div>
    );
};

export default Mecanico;
/*
 * @author Rolando Cepeda
 * @fecha 17/12/2024
 * @description Componente que buscará las herramientas que se verá en todas las páginas
 * @version 1.0.0
 */

import React, { useState } from "react";

const BuscarHerramientas = () => {

    // Usamos el useState para manejar el estado del input QUERY y los RESULTADOS. (*** ESTADOS ***)
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState([]);

    // Función que actualiza el estado cada vez que el usuario escribe en el input. (*** EVENTOS ***)
    const handleInputHerramienta = (evento) => {
        setQuery(evento.target.value);// TARGET muestra loque el usuario escribe en tiempo real.
    };

    // Función que buscará la Herramienta en la base de datos.
    const handleSearchHerramienta = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/tools?search=${query}`);// URL de prueba
            if (!response.ok) {
                throw new Error("Error en la solicitud")
            }
            const data = await response.json();
            setResultados(data);
        } catch (error) {
            alert("No se ha encontrado la herramienta solicitada", error)
        }
    };


    return (
        <div>
            <form onSubmit={handleSearchHerramienta}>
                <h2>Buscar herramientas</h2>
                <input
                    type="text"
                    placeholder="Buscar herramienta..."
                    value={query}
                    onChange={handleInputHerramienta}
                />
                <button type="submit">Buscar</button>
            </form>

            {/*  */}
            <div>
                {resultados.map((herramienta) => (
                    <div className="centred-content" key={herramienta._id}>
                        <h3>{herramienta.name}</h3>
                        <p>{herramienta.status}</p>
                        {/* <img src={herramienta.image} alt={herramienta.title} style={{width: "100px"}}/> */}
                        <p>{herramienta.brand}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
export default BuscarHerramientas;
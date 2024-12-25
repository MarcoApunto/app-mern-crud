/* 
 * @author Rolando Cepeda
 * @fecha 17/12/2024
 * @description Componente Header que se verá en todas las páginas
 * @version 1.0.0
 */
import React from "react";

const Header = ({ usuario }) => {
    return (
        <header>
            <h1>Taller Mecánico</h1>
            <p>{usuario}</p>
        </header>
    );
}

export default Header;

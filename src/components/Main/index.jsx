import React, { useState } from "react";
import "./styles.css";
import logo from "../../assets/img/home.svg";

const Main = () => {
  const [consultarAbierto, setConsultarAbierto] = useState(false);

  const toggleConsultar = () => {
    setConsultarAbierto(!consultarAbierto);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="#" onClick={toggleConsultar}>
              Consultar
            </a>
            {consultarAbierto && (
              <ul className="sub-menu">
                <li>
                  <a href="/Consulta-Libros">Consultar Libro</a>
                </li>
                <li>
                  <a href="/Consulta-Usuario">Consultar Usuario</a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="/Registro-Libros">Registro Libro</a>
          </li>
          <li>
            <a href="/Registro-Usuario">Registro Usuarios</a>
          </li>
          <li>
            <a href="#">Prestamo</a>
          </li>
        </ul>
      </nav>
      <a className="btn" href="#">
        <button>Cerrar Sesión</button>
      </a>
    </header>
  );
};

export default Main;

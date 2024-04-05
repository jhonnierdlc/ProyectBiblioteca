import React, { useState } from "react";
import "./styles.css";
import logo from "../../assets/img/home.svg";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  const [consultarAbierto, setConsultarAbierto] = useState(false);

  const toggleConsultar = () => {
    setConsultarAbierto(!consultarAbierto);
  };

  const navigate = useNavigate();  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');

    // Redirige a la página de inicio de sesión
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
      <a class="btn" href="#" onClick={handleLogout}>
        <button>Cerrar Sesión</button>
      </a>
    </header>
  );
};

export default Main;

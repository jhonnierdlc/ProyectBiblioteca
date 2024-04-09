import React, { useState } from "react";
import "./styles.css";
import logo from "../../assets/img/home.svg";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();

    // Redirige a la página de inici de sesión
  };

  return (
    <header class="header">
      <div class="logo">
        <img src={logo} alt="" />
      </div>
      <nav>
        <ul class="nav-links">
          <Link to="/Inicio">
            <li>
              <a href="#">Inicio </a>
            </li>
          </Link>
          <li>
            <a href="#">Consultar</a>
          </li>
          <li>
            <a href="#">Prestamo </a>
          </li>
        </ul>
      </nav>
      <a class="btn" href="#" onClick={handleLogout}>
        <button>Cerrar Sesión</button>
      </a>
    </header>
  );
};

export default Main;

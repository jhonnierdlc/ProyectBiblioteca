import React, { useState } from "react";
import "./styles.css";
import logo from "../../assets/img/home.svg";

const Main = () => {
  return (
    <header class="header">
      <div class="logo">
        <img src={logo} alt="" />
      </div>
      <nav>
        <ul class="nav-links">
          <li>
            <a href="#">Inicio </a>
          </li>
          <li>
            <a href="#">Consultar</a>
          </li>
          <li>
            <a href="/Registro-Libros">Registro Libro</a>
          </li>
          <li>
            <a href="/Registro-Usuario">Registro Usuarios</a>
          </li>
          <li>
            <a href="#">Prestamo </a>
          </li>
        </ul>
      </nav>
      <a class="btn" href="#">
        <button>Cerrar Sesión</button>
      </a>
    </header>
  );
};

export default Main;

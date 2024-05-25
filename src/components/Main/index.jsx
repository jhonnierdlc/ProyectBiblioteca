import React, { useState } from "react";
import "./styles.css";
import logo from "../../assets/img/home.svg";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <nav>
        <ul className="nav-links">
          <Link to="/Inicio">
            <li>
              <a href="#">Inicio</a>
            </li>
          </Link>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="dropdown"
          >
            <a href="#">Registrar</a>
            {showMenu && (
              <div className="dropdown-menu">
                <ul>
                  <Link to="/Registro-Usuario">
                    <li>
                      <a href="#">Usuario</a>
                    </li>
                  </Link>
                  <Link to="/Registro-Libros">
                    <li>
                      <a href="#"> Libros</a>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </li>

          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="dropdown"
          >
            <a href="#">Consultar</a>
            {showMenu && (
              <div className="dropdown-menu">
                <ul>
                  <Link to="/Consulta-Usuario">
                    <li>
                      <a href="#">Usuario</a>
                    </li>
                  </Link>
                  <Link to="/Consulta-Libros">
                    <li>
                      <a href="#">Libros</a>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="dropdown"
          >
            <a href="#">Prestamo</a>
            {showMenu && (
              <div className="dropdown-menu">
                <ul>
                  <Link to="/SeleccionPrestamo">
                    <li>
                      <a href="#">Registrar</a>
                    </li>
                  </Link>
                  <Link to="/ConsultarPrestamos">
                    <li>
                      <a href="#">Consultar</a>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="dropdown"
          >
            <a href="#">Multas</a>
            {showMenu && (
              <div className="dropdown-menu">
                <ul>
                  <Link to="/SeleccionMulta">
                    <li>
                      <a href="#">Registrar</a>
                    </li>
                  </Link>
                  <Link to="/ConsultarMulta">
                    <li>
                      <a href="#">Consultar</a>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div className="btn" onClick={handleLogout}>
        <button>Cerrar Sesión</button>
      </div>
    </header>
  );
};

export default Main;

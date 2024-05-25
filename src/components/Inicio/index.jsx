import React from "react";
import "./styles.css";
import logo from "../../assets/img/InicioH.svg";

const Inicio = () => {
  return (
    <div className="fondo">
      <div className="contenedor">
        <img src={logo} alt="Logo de inicio" className="hom" />
        <div className="texto">
          <h1>Bienvenido a BiblioSoft</h1>
          <p className="mensaje">
            Aplicativo administrativo en el cual podrá realizar todas las
            operaciones correspondientes a la biblioteca.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

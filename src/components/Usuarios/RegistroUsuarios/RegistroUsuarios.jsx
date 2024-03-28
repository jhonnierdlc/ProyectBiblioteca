import React from "react";
import "./RegistroUsuario.css";

function RegistroUsuarios() {
  return (
    <div className="container">
      <div className="registro-usuarios-container">
        <h2>Registro de usuarios</h2>
        <div className="img-user">
          <img
            src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png"
            alt="Img user"
          />
        </div>

        <form className="form-registro-usuarios">
          <input
            type="text"
            placeholder="Id"
            className="input-field"
            required
          />
          <input type="text" placeholder="Nombre" className="input-field" />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input-field"
            required
          />

          <button type="submit" className="submit-btn">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuarios;

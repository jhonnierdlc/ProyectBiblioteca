import React from "react";
import "./RegistroUsuario.css";

function RegistroUsuarios() {
  return (
    <div className="bdy">
      <div class="containerr">
        <div class="title"> Registro de Usuario </div>
        <form>
          <div class="user-details">
            <div class="input-box">
              <span class="details">
                Cedula
              </span>
              <input type="text" placeholder="Digite la cedula" required name="cedula" />
            </div>
            <div class="input-box">
              <span class="details">
                Nombre Completo
              </span>
              <input type="text" placeholder="Escriba el nombre" required name="nombre" />
            </div>
            <div class="input-box">
              <span class="details">
                Edad
              </span>
              <input type="text" placeholder="Digite la Edad" required name="Edad" />
            </div>
            <div class="input-box">
              <span class="details">
                Direccion
              </span>
              <input type="text" placeholder="Digite la direccion" required name="direccion" />
            </div>
            <div class="input-box">
              <span class="details">
                Celular
              </span>
              <input type="text" placeholder="Digite el celular" required name="celular" />
            </div>
          </div>
          <div class="button">
            <input type="submit" class="btt" value="Registrar" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuarios;

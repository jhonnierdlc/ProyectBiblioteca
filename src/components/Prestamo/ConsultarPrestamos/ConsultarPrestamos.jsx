import React from "react";

const ConsultarPrestamos = () => {
  return (
    <div>
      <div className="contenedor">
        <table className="content-table">
          <thead>
            <tr>
              <th>Cedula</th>
              <th>Nombre</th>
              <th>Libro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>111111111</td>
              <td>Juan Carlos</td>
              <td>La odisea</td>
              <td>
                <button className="bEditar">Aceptar</button>

                <button className="bEliminar">Cancelar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultarPrestamos;

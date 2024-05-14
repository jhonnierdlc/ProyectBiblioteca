import React, { useEffect, useState } from "react";
import { obtenerPrestamo } from "../../../services/prestamoServices";
import "./ConsultarPrestamos.css";

const ConsultarPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    obtenerPrestamo()
      .then((response) => {
        setPrestamos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los libros:", error);
      });
  }, []);

  return (
    <div>
      <div className="input-filtro-cc">
        <input
          className="input-filtro"
          type="text"
          name=""
          placeholder="Cedula"
          id=""
        />
      </div>

      <div className="contenedor-prestamos">
        <table className="content-table-prestamo">
          <thead>
            <tr>
              <th>Cedula</th>
              <th>Nombre</th>
              <th>Libro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((prestamo, index) => (
              <tr>
                <td>{prestamo.cedula}</td>
                <td>{prestamo.nombre}</td>
                <td>{prestamo.libro.titulo}</td>
                {/* <td>
                <button className="bEditar">Aceptar</button>
                <button className="bEliminar">Cancelar</button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultarPrestamos;

import React, { useEffect, useState } from "react";
import { obtenerPrestamo } from "../../../services/prestamoServices";
import "./ConsultarPrestamos.css";

const ConsultarPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [filtroCedula, setFiltroCedula] = useState("");

  useEffect(() => {
    obtenerPrestamo()
      .then((response) => {
        setPrestamos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los libros:", error);
      });
  }, []);

  const prestamosFiltrados = prestamos.filter((prestamo) =>
    prestamo.cedula.toLowerCase().includes(filtroCedula.toLowerCase())
  );

  return (
    <div>
      <div className="input-filtro-cc">
        <input
          className="input-filtro"
          type="text"
          placeholder="Cédula"
          value={filtroCedula}
          onChange={(e) => setFiltroCedula(e.target.value)}
        />
      </div>

      <div className="contenedor-prestamos">
        <table className="content-table-prestamo">
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Libro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {prestamosFiltrados.length > 0 ? (
              prestamosFiltrados.map((prestamo, index) => (
                <tr key={index}>
                  <td>{prestamo.cedula}</td>
                  <td>{prestamo.nombre}</td>
                  <td>{prestamo.libro.titulo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  No se encontraron préstamos para la cédula ingresada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultarPrestamos;

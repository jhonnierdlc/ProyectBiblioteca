import React, { useEffect, useState } from "react";
import {
  obtenerPrestamo,
  eliminarPrestamo,
} from "../../../services/prestamoServices";
import "./ConsultarPrestamos.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalEliminar from "../../UI/ModalEliminar";

const ConsultarPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [filtroCedula, setFiltroCedula] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  useEffect(() => {
    obtenerPrestamo()
      .then((response) => {
        setPrestamos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los préstamos:", error);
      });
  }, []);

  const prestamosFiltrados = prestamos.filter((prestamo) =>
    prestamo.cedula.toLowerCase().includes(filtroCedula.toLowerCase())
  );

  const formatearFecha = (fechaIso) => {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString("es-ES", { timeZone: "UTC" });
  };

  const handleDelete = async (id) => {
    setIdAEliminar(id);
    setMostrarModal(true);
  };

  const confirmarEliminacion = async (id) => {
    const originalData = [...prestamos];
    try {
      const updatedPrestamos = originalData.filter(
        (prestamo) => prestamo._id !== id
      );
      setPrestamos(updatedPrestamos);
      const response = await eliminarPrestamo(id);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response?.data || "Error al eliminar préstamo");
      setPrestamos(originalData);
    } finally {
      setMostrarModal(false);
    }
  };

  return (
    <div className="consultar-prestamos-container">
      <h1 className="title">Buscar Préstamo</h1>

      <div className="input-container">
        <input
          type="text"
          className="input-filtro"
          placeholder="Buscar por cédula"
          value={filtroCedula}
          onChange={(e) => setFiltroCedula(e.target.value)}
        />
      </div>

      <div className="prestamos-lista">
        {prestamosFiltrados.length > 0 ? (
          prestamosFiltrados.map((prestamo) => (
            <div className="prestamo-card" key={prestamo._id}>
              <div className="prestamo-info">
                <p className="title-target">
                  <strong>
                    {prestamo.cedula}- {prestamo.nombre}
                  </strong>
                </p>

                <p>
                  <strong>Libro:</strong> {prestamo.libro.titulo}
                </p>
                <p>
                  <strong>Fecha Préstamo:</strong>{" "}
                  {formatearFecha(prestamo.fecha_inicio)}
                </p>
                <p>
                  <strong>Fecha Devolución:</strong>{" "}
                  {formatearFecha(prestamo.fecha_devolucion)}
                </p>
              </div>
              <div className="prestamo-actions">
                <Link to={`/EditarPrestamo/${prestamo._id}`}>
                  <button className="btn btn-edit">Editar</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(prestamo._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-result">
            No se encontraron préstamos para la cédula ingresada.
          </p>
        )}
      </div>

      {mostrarModal && (
        <ModalEliminar
          eliminarId={confirmarEliminacion}
          setMostrarModal={setMostrarModal}
          idAEliminar={idAEliminar}
        />
      )}
    </div>
  );
};

export default ConsultarPrestamos;

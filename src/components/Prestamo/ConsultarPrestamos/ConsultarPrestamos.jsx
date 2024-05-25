import React, { useEffect, useState } from "react";
import { obtenerPrestamo, eliminarPrestamo } from "../../../services/prestamoServices";
import "./ConsultarPrestamos.css";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalEliminar from "../../UI/ModalEliminar";

const ConsultarPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [filtroCedula, setFiltroCedula] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false); // Nuevo estado para mostrar/ocultar el modal
  const [idAEliminar, setIdAEliminar] = useState(null); // Estado para almacenar el ID del cliente a eliminar

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
    return fecha.toLocaleDateString('es-ES', { timeZone: 'UTC' }); // Especificar el uso de la zona horaria UTC
  };

  const handleDelete = async (id) => {
    setIdAEliminar(id); // Establece el ID del cliente a eliminar
    setMostrarModal(true); // Muestra el modal de confirmación
  };

  const confirmarEliminacion = async (id) => {
    const originalData = [...prestamos];
    try {
      const updatedPrestamos = originalData.filter((prestamo) => prestamo._id !== id);
      setPrestamos(updatedPrestamos);
      const response = await eliminarPrestamo(id);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response?.data || 'Error al eliminar préstamo');
      setPrestamos(originalData);
    } finally {
      setMostrarModal(false); // Oculta el modal después de la operación
    }
  };

  return (
    <div>
      <div className="titleo">Buscar Usuario</div>

      <div className="input-boxo">
        <input
          type="text"
          placeholder="Buscar por cedula"
          value={filtroCedula}
          onChange={(e) => setFiltroCedula(e.target.value)}
        />
      </div>

      <div className="contenedor">
        <table className="content-table">
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Libro</th>
              <th>Fecha Préstamo</th>
              <th>Fecha Devolución</th>
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
                  <td>{formatearFecha(prestamo.fecha_inicio)}</td>
                  <td>{formatearFecha(prestamo.fecha_devolucion)}</td>
                  <td>
                    <Link to={`/EditarPrestamo/${prestamo._id}`}>
                      <button className='bEditar'>Editar</button>
                    </Link>
                    <button className='bEliminar' onClick={() => handleDelete(prestamo._id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No se encontraron préstamos para la cédula ingresada.</td>
              </tr>
            )}
          </tbody>
        </table>
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

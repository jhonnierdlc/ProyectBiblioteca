import React, { useEffect, useState } from 'react';
import "./styles.css";
import ModalEliminar from "../../UI/ModalEliminar";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {inactivarMulta, obtenerMultas } from "../../../services/multaService";

const ConsultarMultas = () => {
  const [multas, setMultas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false); // Nuevo estado para mostrar/ocultar el modal
  const [idAEliminar, setIdAEliminar] = useState(null); // Estado para almacenar el ID del multa a eliminar

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await obtenerMultas();
        setMultas(data);
      } catch (error) {
        toast.error(error.response?.data || 'Error al obtener clientes');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setIdAEliminar(id); // Establece el ID de la multa a inactivar
    setMostrarModal(true); // Muestra el modal de confirmación
  };

  const confirmarEliminacion = async (id) => {
    const originalData = [...multas];
    try {
      const updatedMultas = originalData.map((multa) => 
        multa._id === id ? { ...multa, estado: 'Inactivo' } : multa
      );
      setMultas(updatedMultas);
      const response = await inactivarMulta(id);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response?.data || 'Error al inactivar multa');
      setMultas(originalData);
    } finally {
      setMostrarModal(false); // Oculta el modal después de la operación
    }
  };

  return (
    <div className='contenedor'>
      <table className="content-table">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Libro</th>
            <th>Descripcion</th>
            <th>Valor Multa</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {multas.map((multa) => (
            <tr key={multa._id}>    
              <td>{multa.cliente.cedula}</td>
              <td>{multa.libro}</td>
              <td>{multa.descripcion}</td>
              <td>{multa.precio}</td>
              <td>{multa.estado}</td>
              <td>
                <Link to={`/EditarMulta/${multa._id}`}>
                  <button className='bEditar'>Editar</button> 
                </Link>
                <button className='bEliminar' onClick={() => handleDelete(multa._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default ConsultarMultas;

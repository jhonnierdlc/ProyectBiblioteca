import React, { useEffect, useState } from 'react';
import "./styles.css";
import ModalEliminar from "../../UI/ModalEliminar";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { eliminarMulta, obtenerMultas } from "../../../services/multaService";

const HistorialMultas = () => {
  const [multas, setMultas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

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

  const handleDelete = (id) => {
    setIdAEliminar(id);
    setMostrarModal(true);
  };

  const confirmarEliminacion = async (id) => {
    const originalData = [...multas];
    try {
      const updatedMultas = originalData.map((multa) => 
        multa._id === id ? { ...multa, estado: 'Inactivo' } : multa
      );
      setMultas(updatedMultas);
      const response = await eliminarMulta(id);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response?.data || 'Error al inactivar multa');
      setMultas(originalData);
    } finally {
      setMostrarModal(false);
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
          {multas.filter(multa => multa.estado === 'Inactivo').map((multa) => (
            <tr key={multa._id}>
              <td>{multa.cliente.cedula}</td>
              <td>{multa.libro}</td>
              <td>{multa.descripcion}</td>
              <td>{multa.precio}</td>
              <td>{multa.estado}</td>
              <td>
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

export default HistorialMultas;

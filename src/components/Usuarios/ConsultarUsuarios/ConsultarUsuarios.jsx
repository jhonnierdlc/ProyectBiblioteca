import React, { useEffect, useState } from "react";
import "./ConsultarUsuarios.css";
import ModalEliminar from "../../UI/ModalEliminar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  eliminarCliente,
  obtenerClientes,
} from "../../../services/clienteServices";

const ConsultarUsuarios = () => {
  const [clientes, setClientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [filtroCedula, setFiltroCedula] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await obtenerClientes();
        setClientes(data);
      } catch (error) {
        toast.error(error.response?.data || "Error al obtener clientes");
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
    const originalData = [...clientes];
    try {
      const updatedClientes = originalData.filter(
        (cliente) => cliente._id !== id
      );
      setClientes(updatedClientes);
      const response = await eliminarCliente(id);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response?.data || "Error al eliminar cliente");
      setClientes(originalData);
    } finally {
      setMostrarModal(false);
    }
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.cedula.toLowerCase().includes(filtroCedula.toLowerCase())
  );

  return (
    <div className="consultar-usuarios-container">
      <h1 className="title">Buscar Usuario</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Buscar por cédula"
          value={filtroCedula}
          onChange={(e) => setFiltroCedula(e.target.value)}
          className="input-filtro"
        />
      </div>

      <div className="table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Dirección</th>
              <th>Celular</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente._id}>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.edad}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.celular}</td>
                  <td>
                    <Link to={`/EditarUsuario/${cliente._id}`}>
                      <button className="btn btn-edit">Editar</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(cliente._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  No se encontraron clientes para la cédula ingresada.
                </td>
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

export default ConsultarUsuarios;

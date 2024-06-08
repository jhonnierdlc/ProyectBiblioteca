import React, { useEffect, useState } from "react";
import "./styles.css";
import ModalEliminar from "../../UI/ModalEliminar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { inactivarMulta, obtenerMultas } from "../../../services/multaService";

const ConsultarMultas = () => {
  const [multas, setMultas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await obtenerMultas();
        setMultas(data);
      } catch (error) {
        toast.error(error.response?.data || "Error al obtener multas");
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
        multa._id === id ? { ...multa, estado: "Inactivo" } : multa
      );
      setMultas(updatedMultas);
      const response = await inactivarMulta(id);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response?.data || "Error al inactivar multa");
      setMultas(originalData);
    } finally {
      setMostrarModal(false);
    }
  };

  return (
    <div className="consultar-multas-container">
      <h1 className="title">Consultar Multas</h1>

      <div className="multas-lista">
        {multas
          .filter((multa) => multa.estado === "Activo")
          .map((multa) => (
            <div className="multa-card" key={multa._id}>
              <div className="multa-info">
                <p>
                  <strong>Cédula: {multa.cliente.cedula}</strong>
                </p>
                <p>
                  <strong>Libro:</strong> {multa.libro}
                </p>
                <p>
                  <strong>Descripción:</strong> {multa.descripcion}
                </p>
                <p>
                  <strong>Valor Multa:</strong> ${multa.precio}
                </p>
                <p>
                  <strong>Estado:</strong> {multa.estado}
                </p>
              </div>
              <div className="multa-actions">
                <Link to={`/EditarMulta/${multa._id}`}>
                  <button className="btn btn-edit">Editar</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(multa._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
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

export default ConsultarMultas;

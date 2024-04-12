import React from "react";

function ModalEliminar({ eliminarId, setMostrarModal, idAEliminar }) {
  console.log(idAEliminar);
  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <p>¿Estás seguro de que deseas eliminar?</p>
          <div>
            <button onClick={() => eliminarId(idAEliminar)}>Aceptar</button>
            <button
              onClick={() => setMostrarModal(false)}
              style={{ marginLeft: "8px", background: "#009879" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEliminar;

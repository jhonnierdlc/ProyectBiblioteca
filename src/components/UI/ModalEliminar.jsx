import React from "react";

function ModalEliminar({ eliminarId, setMostrarModal, idAEliminar }) {
  console.log(idAEliminar);
  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <p>¿Estás seguro de que deseas eliminar?</p>
          <div>
            <button onClick={() => eliminarId(idAEliminar)}>Sí</button>
            <button onClick={() => setMostrarModal(false)}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEliminar;

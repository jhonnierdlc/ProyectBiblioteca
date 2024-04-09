import React, { useState } from "react";
import "./ConsultarUsuarios.css";
import ModalEliminar from "../../UI/ModalEliminar";

const ConsultarUsuarios = () => {
  // Datos de usuarios de prueba
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Usuario de Prueba", email: "prueba@example.com" },
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  const eliminarUsuario = (id) => {
    const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(nuevosUsuarios);
    setMostrarModal(false);
    setUsuarioAEliminar(null);
  };

  const mostrarModalEliminar = (id) => {
    setUsuarioAEliminar(id);
    setMostrarModal(true);
  };

  return (
    <div className="usuarios-container">
      <h2>Lista de Usuarios</h2>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>
                <button onClick={() => mostrarModalEliminar(usuario.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mostrarModal && (
        <ModalEliminar
          eliminarId={eliminarUsuario}
          setMostrarModal={setMostrarModal}
          idAEliminar={usuarioAEliminar}
        />
      )}
    </div>
  );
};

export default ConsultarUsuarios;

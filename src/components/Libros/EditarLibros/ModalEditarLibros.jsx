import React, { useState } from "react";
import { actualizarLibro } from "../../../services/libroServices";
import { toast } from "react-toastify";
import "./ModalEditarLibros.css";

const ModalEditarLibros = ({ libro, isOpen, closeModal }) => {
  const [nuevoTitulo, setNuevoTitulo] = useState(libro.titulo);
  const [nuevoISBN, setNuevoISBN] = useState(libro.isbn);
  const [nuevaPortada, setNuevaPortada] = useState(libro.portada);
  const [nuevoAutor, setNuevoAutor] = useState(libro.autor);
  const [nuevaDescripcion, setNuevaDescripcion] = useState(libro.descripcion);

  const handleEditarLibro = async () => {
    try {
      const updatedLibro = {
        portada: nuevaPortada,
        titulo: nuevoTitulo,
        isbn: nuevoISBN,
        autor: nuevoAutor,
        descripcion: nuevaDescripcion,
      };

      await actualizarLibro(libro._id, updatedLibro);
      toast.success("Libro actualizado correctamente");

      closeModal();
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data || "Error al actualizar libro");
    }
  };

  return (
    <div className={`edit-modal ${isOpen ? "open" : "closed"}`}>
      <div className="edit-modal-content">
        <span className="edit-close" onClick={closeModal}>
          &times;
        </span>
        <h2 className="edit-modal-title">Editar Libro</h2>
        <form className="edit-modal-form">
          <label className="edit-modal-label">
            Título:
            <input
              className="edit-modal-input"
              type="text"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
            />
          </label>
          <label className="edit-modal-label">
            ISBN:
            <input
              className="edit-modal-input"
              type="text"
              value={nuevoISBN}
              onChange={(e) => setNuevoISBN(e.target.value)}
            />
          </label>
          <label className="edit-modal-label">
            Portada:
            <input
              className="edit-modal-input"
              type="text"
              value={nuevaPortada}
              onChange={(e) => setNuevaPortada(e.target.value)}
            />
          </label>
          <label className="edit-modal-label">
            Autor:
            <input
              className="edit-modal-input"
              type="text"
              value={nuevoAutor}
              onChange={(e) => setNuevoAutor(e.target.value)}
            />
          </label>
          <label className="edit-modal-label">
            Descripción:
            <textarea
              className="edit-modal-textarea"
              value={nuevaDescripcion}
              onChange={(e) => setNuevaDescripcion(e.target.value)}
            />
          </label>
          <button
            className="edit-modal-button"
            type="button"
            onClick={handleEditarLibro}
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarLibros;

import React, { useEffect, useState } from "react";
import "./ConsultaLibro.css";
import { Link } from "react-router-dom";
import { eliminarLibro, obtenerLibro } from "../../../services/libroServices";
import ModalEliminar from "../../UI/ModalEliminar";
import { FaTrash } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { toast } from "react-toastify";
import ModalEditarLibros from "../EditarLibros/ModalEditarLibros";

const ConsultarLibro = () => {
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [libros, setLibros] = useState([]);
  const [libroAEditar, setLibroAEditar] = useState(null);

  const [tituloFiltro, setTituloFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [autorFiltro, setAutorFiltro] = useState("");

  const handleEliminarClick = (id) => {
    setIdAEliminar(id);
    setMostrarModalEliminar(true);
  };

  const handleEditarClick = (libro) => {
    setLibroAEditar(libro);
    setMostrarModalEditar(true);
  };

  const handleAceptarEliminar = async (id) => {
    const originalData = [...libros];
    try {
      const updatedLibros = originalData.filter((libro) => libro._id !== id);
      setLibros(updatedLibros);
      const response = await eliminarLibro(id);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response?.data || "Error al eliminar Libro");
      setLibros(originalData);
    } finally {
      setMostrarModalEliminar(false);
    }
  };

  useEffect(() => {
    obtenerLibro()
      .then((response) => {
        setLibros(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los libros:", error);
      });
  }, []);

  const [expandedBooks, setExpandedBooks] = useState([]);

  const toggleDescription = (index) => {
    if (expandedBooks.includes(index)) {
      setExpandedBooks(expandedBooks.filter((item) => item !== index));
    } else {
      setExpandedBooks([...expandedBooks, index]);
    }
  };

  const filteredLibros = libros.filter((libro) => {
    const titulo = libro.titulo || ""; // Asegúrate de que título sea una cadena
    const categoria = libro.categoria || ""; // Asegúrate de que categoría sea una cadena
    const autor = libro.autor || ""; // Asegúrate de que autor sea una cadena
    return (
      titulo.toLowerCase().includes(tituloFiltro.toLowerCase()) &&
      categoria.toLowerCase().includes(categoriaFiltro.toLowerCase()) &&
      autor.toLowerCase().includes(autorFiltro.toLowerCase())
    );
  });

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Titulo"
          value={tituloFiltro}
          onChange={(e) => setTituloFiltro(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={autorFiltro}
          onChange={(e) => setAutorFiltro(e.target.value)}
        />
      </div>
      <div className="libros-container">
        {filteredLibros.length > 0 ? (
          filteredLibros.map((libro, index) => (
            <div className="libro" key={index}>
              <div className="container-icons">
                <Link
                  className="img-delete"
                  onClick={() => handleEliminarClick(libro._id)}
                >
                  <FaTrash size={20} color="red" />
                </Link>
                <Link
                  className="img-pencil"
                  onClick={() => handleEditarClick(libro)}
                >
                  <GoPencil size={20} />
                </Link>
              </div>
              <img
                src={libro.portada}
                alt="Portada del libro"
                className="portada-libro"
              />
              <div className="info-libro">
                <h3>{libro.titulo}</h3>
                <p>
                  <strong>ISBN:</strong> {libro.isbn}
                </p>
                <p>
                  <strong>Autor:</strong> {libro.autor}
                </p>
                <p>
                  <strong>Descripción:</strong>{" "}
                  {libro.descripcion.length > 100
                    ? expandedBooks.includes(index)
                      ? libro.descripcion
                      : `${libro.descripcion.slice(0, 100)}... `
                    : libro.descripcion}
                  {libro.descripcion.length > 100 && (
                    <Link onClick={() => toggleDescription(index)}>
                      {expandedBooks.includes(index)
                        ? "[Leer menos]"
                        : "[Leer más]"}
                    </Link>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-libros">
            <p>No se encontraron libros para el filtro aplicado.</p>
          </div>
        )}
      </div>
      {mostrarModalEliminar && (
        <ModalEliminar
          eliminarId={handleAceptarEliminar}
          setMostrarModal={setMostrarModalEliminar}
          idAEliminar={idAEliminar}
        />
      )}
      {mostrarModalEditar && (
        <ModalEditarLibros
          libro={libroAEditar}
          isOpen={mostrarModalEditar}
          closeModal={() => setMostrarModalEditar(false)}
        />
      )}
    </>
  );
};

export default ConsultarLibro;

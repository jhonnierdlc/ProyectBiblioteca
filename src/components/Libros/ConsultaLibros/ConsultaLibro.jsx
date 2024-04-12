import React, { useEffect, useState } from "react";
import "./ConsultaLibro.css";
import { Link } from "react-router-dom";
import { eliminarLibro, obtenerLibro } from "../../../services/libroServices";
import ModalEliminar from "../../UI/ModalEliminar";
import { toast } from "react-toastify";

const ConsultarLibro = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  const [libros, setLibros] = useState([]);

  const handleEliminarClick = (id) => {
    setIdAEliminar(id);
    setMostrarModal(true);
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
      setMostrarModal(false);
    }
    setMostrarModal(false);
  };

  useEffect(() => {
    // Realiza la solicitud para obtener la lista de libros cuando el componente se monte
    obtenerLibro()
      .then((response) => {
        setLibros(response.data); // Actualiza el estado con los datos de los libros recibidos
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
  console.log(libros);
  return (
    <>
      <div className="libros-container">
        {libros.map((libro, index) => (
          <div className="libro" key={index}>
            <div className="container-icons">
              <Link
                className="img-delete"
                onClick={() => handleEliminarClick(libro._id)}
              >
                <img
                  src="https://cdn.icon-icons.com/icons2/1808/PNG/512/trash-can_115312.png"
                  alt="Eliminar"
                  height={20}
                />
              </Link>
              <Link className="img-pencil">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/51/51648.png"
                  alt="Pencil"
                  height={20}
                />
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
        ))}
      </div>
      {mostrarModal && (
        <ModalEliminar
          eliminarId={handleAceptarEliminar}
          setMostrarModal={setMostrarModal}
          idAEliminar={idAEliminar}
        />
      )}
    </>
  );
};

export default ConsultarLibro;

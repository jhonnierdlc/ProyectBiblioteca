import React, { useEffect, useState } from "react";
import "./ConsultaLibro.css";
import { Link } from "react-router-dom";
import { obtenerLibro } from "../../../services/libroServices";

const ConsultarLibro = () => {
  // Datos de prueba para los libros
  const [libros, setLibros] = useState([]);

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
    </>
  );
};

export default ConsultarLibro;

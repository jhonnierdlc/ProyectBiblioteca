import React, { useState } from "react";
import "./ConsultaLibro.css";
import { Link } from "react-router-dom";

const ConsultarLibro = () => {
  // Datos de prueba para los libros
  const libros = [
    {
      isbn: "9780141439846",
      titulo: "Moby Dick",
      descripcion:
        "Moby Dick es una novela del autor estadounidense Herman Melville, publicada por vez primera en 1851.",
      autor: "Herman Melville",
      portada:
        "https://assets-global.website-files.com/6034d7d1f3e0f52c50b2adee/625454132a4288889ad4b1d8_6034d7d1f3e0f57d87b2b2a9_Moby-dick-herman-melville-editorial-alma.jpeg",
    },
    {
      isbn: "9788423341379",
      titulo: "Don Quijote de la Mancha",
      descripcion:
        "Don Quijote de la Mancha es una novela escrita por el español Miguel de Cervantes Saavedra. Publicada su primera parte con el título de El ingenioso hidalgo don Quijote de la Mancha a comienzos de 1605.",
      autor: "Miguel de Cervantes Saavedra",
      portada:
        "https://images.cdn2.buscalibre.com/fit-in/360x360/73/b6/73b6fd96c31d26e2b6a3531808c1188c.jpg",
    },
    {
      isbn: "9780061122415",
      titulo: "To Kill a Mockingbird",
      descripcion:
        "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",
      autor: "Harper Lee",
      portada:
        "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
    },
    {
      isbn: "9788806213942",
      titulo: "I Promessi Sposi",
      descripcion:
        "I Promessi Sposi è un romanzo storico di Alessandro Manzoni pubblicato nel 1827.",
      autor: "Alessandro Manzoni",
      portada:
        "https://images.cdn3.buscalibre.com/fit-in/360x360/1b/cd/1bcd571d3560a0dac9bf926301e8e65f.jpg",
    },
    {
      isbn: "9788806213942",
      titulo: "I Promessi Sposi",
      descripcion:
        "I Promessi Sposi è un romanzo storico di Alessandro Manzoni pubblicato nel 1827.",
      autor: "Alessandro Manzoni",
      portada:
        "https://images.cdn3.buscalibre.com/fit-in/360x360/1b/cd/1bcd571d3560a0dac9bf926301e8e65f.jpg",
    },
  ];

  const [expandedBooks, setExpandedBooks] = useState([]);

  const toggleDescription = (index) => {
    if (expandedBooks.includes(index)) {
      setExpandedBooks(expandedBooks.filter((item) => item !== index));
    } else {
      setExpandedBooks([...expandedBooks, index]);
    }
  };

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

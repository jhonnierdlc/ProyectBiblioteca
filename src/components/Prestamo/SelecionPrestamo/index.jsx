import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { obtenerLibro } from "../../../services/libroServices";

const Seleccion = () => {
  const [libros, setLibros] = useState([]);
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [librosFiltrados, setLibrosFiltrados] = useState([]);

  useEffect(() => {
    obtenerLibro()
      .then((response) => {
        setLibros(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los libros:", error);
      });
  }, []);

  useEffect(() => {
    // Filtrar libros por título cuando se actualice el estado de filtroTitulo
    const librosFiltrados = libros.filter((libro) =>
      libro.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
    );
    setLibrosFiltrados(librosFiltrados);
  }, [filtroTitulo, libros]);

  const handleInputChange = (e) => {
    setFiltroTitulo(e.target.value);
  };

  return (
    <div>
      <div className="titlee">Seleccionar Libro</div>

      <div className="input-boxx">
        <input
          type="text"
          placeholder="Buscar por título"
          value={filtroTitulo}
          onChange={handleInputChange}
        />
      </div>

      <div className="libros-container">
        {librosFiltrados.map((libro, index) => (
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
              <Link to={`/RegistrarPrestamo/${libro._id}`}>
                <div className="butto">
                  <input type="submit" className="bttt" value="Seleccionar" />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seleccion;

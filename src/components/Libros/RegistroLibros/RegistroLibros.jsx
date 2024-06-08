import React, { useState } from "react";
import "./RegistroLibros.css";
import { crearLibro } from "../../../services/libroServices";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistroLibros = () => {
  const [book, setBook] = useState({
    isbn: "",
    titulo: "",
    descripcion: "",
    portada: "",
    autor: "",
  });
  const navigate = useNavigate();

  const schema = {
    isbn: Joi.string().required(),
    titulo: Joi.string().required(),
    descripcion: Joi.string().required(),
    portada: Joi.string().required(),
    autor: Joi.string().required(),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = Joi.object(schema).validate(book, { abortEarly: false });

    if (error) {
      console.error("Error de validación:", error.details);
      return;
    }

    try {
      await crearLibro(book);

      toast.success("Libro creado con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Error al crear el libro");
    }
  };

  return (
    <div className="container">
      <div className="left-pane">
        <div className="img-libro">
          <img
            src="https://images.vexels.com/media/users/3/271649/isolated/preview/3a1938ea55f27c31d53b585fcebdcd5e-icono-de-dibujos-animados-de-libro-abierto.png"
            alt="Libro"
          />
        </div>
        <h3>Registrar Libro</h3>
        <p>
          Bienvenido a nuestro sistema de registro de libros. Aquí podrás añadir
          nuevos títulos a nuestra colección de manera sencilla y rápida.
          Completa el formulario proporcionado con la información requerida para
          registrar un libro.
        </p>
      </div>
      <div className="right-pane">
        <div className="book-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="isbn">Isbn:</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="titulo">Título:</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={book.titulo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={book.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="portada">Portada:</label>
              <input
                type="text"
                id="portada"
                name="portada"
                value={book.portada}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="autor">Autor:</label>
              <input
                type="text"
                id="autor"
                name="autor"
                value={book.autor}
                onChange={handleChange}
                required
              />
            </div>
            <button className="bto" type="submit">
              Registrar Libro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroLibros;

import React, { useState, useRef } from "react";
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
  console.log(book);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos con Joi
    const { error } = Joi.object(schema).validate(book, { abortEarly: false });

    if (error) {
      console.error("Error de validación:", error.details);
      return;
    }

    try {
      // Llama a la función del servicio para enviar la solicitud POST
      await crearLibro(book);

      toast.success("Libro creado con éxito");
      console.log("libro creado");
      navigate("/");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Error al crear el libro");
      // Manejar los errores según sea necesario
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(book);
  //   setBook({
  //     isbn: "",
  //     title: "",
  //     descripcion: "",
  //     portada: null,
  //     portadaName: "",
  //     autor: "",
  //   });
  // };

  return (
    <div className="book-form-container">
      <h3>Registrar Libro</h3>
      <div className="img-libro">
        <img
          src="https://images.vexels.com/media/users/3/271649/isolated/preview/3a1938ea55f27c31d53b585fcebdcd5e-icono-de-dibujos-animados-de-libro-abierto.png"
          alt=""
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="isbn">Isbn:</label>
          <input
            type="number"
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
  );
};

export default RegistroLibros;

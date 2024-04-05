import React, { useState, useRef } from "react";
import "./RegistroLibros.css";

const RegistroLibros = () => {
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    description: "",
    cover: null,
    coverName: "",
    author: "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const file = files && files[0];
    setBook((prevState) => ({
      ...prevState,
      [name]: name === "cover" ? file : value,
      coverName: name === "cover" && file ? file.name : prevState.coverName,
    }));
  };

  const handleCoverClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book);
    setBook({
      isbn: "",
      title: "",
      description: "",
      cover: null,
      coverName: "",
      author: "",
    });
  };

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
            type="text"
            id="isbn"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={book.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="cover">Portada:</label>
          <div className="file-input-container" onClick={handleCoverClick}>
            {book.coverName || "Subir imagen"}{" "}
            <input
              type="file"
              id="cover"
              name="cover"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
              style={{ display: "none" }}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <button className="bto" type="submit">Registrar Libro</button>
      </form>
    </div>
  );
};

export default RegistroLibros;

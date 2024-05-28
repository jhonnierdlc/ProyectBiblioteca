import React, { useEffect, useState } from "react";
import "./styles.css";
import logo from "../../assets/img/InicioH.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { obtenerLibro } from "../../services/libroServices";

// Imágenes de libros para el slider (puedes reemplazar estas URLs con tus propias imágenes)
const bookImages = [
  {
    imageUrl:
      "https://www.educaciontrespuntocero.com/wp-content/uploads/2021/09/en-portada-1.jpg",
    description: "A leer es una estrategia para mejorar la vida",
  },
  {
    imageUrl:
      "https://www.educapeques.com/wp-content/uploads/2013/12/fomentar-la-lectura-2.jpg",
    description: "Algunos consejos para fomentar la lectura",
  },
  {
    imageUrl:
      "https://www.gob.mx/cms/uploads/identity/image/29986/Cover_Twitter_1500x500_Mesa_de_trabajo_1.png",
    description:
      "Leer es uno de las principales actividades que despierta tu imaginación",
  },
];
// Código anterior...

const Inicio = () => {
  const [libros, setLibros] = useState([]);
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    adaptiveHeight: true,
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

  console.log(libros);

  return (
    <div>
      {/* Slider de libros */}
      <div className="slider-container">
        <Slider {...settings} className="slider">
          {bookImages.map((book, index) => (
            <div key={index}>
              <img
                className="img-banner"
                src={book.imageUrl}
                alt={book.description}
              />
              <p className="slider-description">{book.description}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* Sección de importancia de la lectura */}
      <div className="importance-section">
        <div className="image-container">
          <img
            src="https://english-tm.es/wp-content/uploads/2020/03/nino-leyendo-un-libro-1-1024x576.jpg"
            alt="Imagen sobre la importancia de la lectura"
          />
        </div>
        <div className="text-container">
          <p>
            La lectura es fundamental para el desarrollo intelectual, emocional
            y social. Nos permite expandir nuestro conocimiento, mejorar nuestra
            comprensión del mundo y desarrollar habilidades críticas como el
            pensamiento analítico y la empatía.
          </p>
        </div>
      </div>

      {/* Slider de libros disponibles */}
      <div className="books-section">
        <div className="books-title">
          <h2>Algunos libros disponibles</h2>
        </div>

        <div className="books-slider">
          <Slider {...settings} className="slider">
            {libros.slice(0, 5).map((libro, index) => (
              <div key={index}>
                <img
                  className="img-algunos-libros"
                  src={libro.portada}
                  alt={libro.titulo}
                />
                <p className="slider-description">{libro.titulo}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

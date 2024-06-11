import React, { useState, useEffect } from "react";
import "./styles.css";
import Joi from "joi";
import { toast } from "react-toastify";
import { registrarPrestamo } from "../../../services/prestamoServices";
import { obtenerLibroId } from "../../../services/libroServices";
import emailjs from "@emailjs/browser";
import { useParams, useNavigate } from "react-router-dom";

const Prestamo = () => {
  const [data, setData] = useState({
    isbn: "",
    titulo: "",
    descripcion: "",
    portada: "",
    autor: "",
  });
  const [prestamo, setPrestamo] = useState({
    libroId: "",
    cedula: "",
    nombre: "",
    celular: "",
  });
  const { id } = useParams();
  const templateParams = {
    from_name: prestamo.nombre,
    from_email: "jhonnierjdelacruz@unicesar.edu.co",
    to_name: "Biblioteca",
    message: data.titulo,
  };
  const navigate = useNavigate();

  const schema = {
    libroId: Joi.string().required(),
    cedula: Joi.string().required(),
    nombre: Joi.string().required(),
    celular: Joi.string().required(),
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: libro } = await obtenerLibroId(id);
        const updatedData = {
          isbn: libro.isbn,
          titulo: libro.titulo,
          descripcion: libro.descripcion,
          portada: libro.portada,
          autor: libro.autor,
        };
        setData(updatedData);
        setPrestamo((prevState) => ({
          ...prevState,
          libroId: id, // Asignamos el valor de id a libroId
        }));
      } catch (error) {
        toast.error(
          error.response?.data || "Error al obtener datos del cliente"
        );
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestamo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceID = "service_mw84yzk";
    const emailTemplate = "template_gxm06va";
    const publicId = "RdVSXJ9drnttQH2YX";
    const { errorEmail } = (prestamo, { abortEarly: false });

    const { error } = Joi.object(schema).validate(prestamo, {
      abortEarly: false,
    });

    if (error) {
      console.error("Error de validación:", error.details);
      return;
    }

    try {
      await registrarPrestamo(prestamo);
      e.preventDefault();
      await emailjs
        .send(serviceID, emailTemplate, templateParams, publicId)
        .then(
          (response) => {
            console.log("Email enviado!", response);
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
      toast.success("Préstamo registrado exitosamente");
      navigate("/Inicio");
    } catch (error) {
      console.error("Error al registrar el préstamo:", error);
      toast.error("Error al registrar el préstamo");
    }
  };

  return (
    <div className="bdy">
      <div className="containerr" style={{ marginTop: "100px" }}>
        <div className="title"> Registro de Préstamo </div>
        <div className="libroo">
          <img
            src={data.portada}
            alt="Portada del libro"
            className="portada-libroo"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Título del Libro</span>
              <input type="text" placeholder="" readOnly value={data.titulo} />
            </div>
            <div className="input-box">
              <span className="details">ISBN del Libro</span>
              <input type="text" placeholder="" readOnly value={data.isbn} />
            </div>
            <div className="input-box">
              <span className="details">Cédula Cliente</span>
              <input
                type="text"
                placeholder="Digite la cédula"
                required
                name="cedula"
                value={prestamo.cedula}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Nombre Cliente</span>
              <input
                type="text"
                placeholder="Digite el nombre"
                required
                name="nombre"
                value={prestamo.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Celular</span>
              <input
                type="text"
                placeholder="Digite el celular"
                required
                name="celular"
                value={prestamo.celular}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="button">
            <input type="submit" className="btt" value="Registrar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prestamo;

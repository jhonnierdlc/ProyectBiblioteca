import React, { useState, useEffect } from "react";
import Joi from "joi";
import { toast } from "react-toastify";
import {
  actualizarPrestamo,
  obtenerPrestamoPorId,
} from "../../../services/prestamoServices";
import { useParams, useNavigate } from "react-router-dom";

function EditarUsuario() {
  const [data, setData] = useState({
    cedula: "",
    nombre: "",
    celular: "",
    libro: { titulo: "" },
    fecha_inicio: "",
    fecha_devolucion: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = {
    cedula: Joi.string().required(),
    nombre: Joi.string().required(),
    celular: Joi.string().required(),
    libro: Joi.object().required(),
    fecha_inicio: Joi.string().required(),
    fecha_devolucion: Joi.string().required(),
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: prestamo } = await obtenerPrestamoPorId(id);
        const updatedData = {
          cedula: prestamo.cedula,
          nombre: prestamo.nombre,
          celular: prestamo.celular,
          libro: prestamo.libro,
          fecha_inicio: new Date(prestamo.fecha_inicio)
            .toISOString()
            .split("T")[0],
          fecha_devolucion: new Date(prestamo.fecha_devolucion)
            .toISOString()
            .split("T")[0],
        };
        setData(updatedData);
      } catch (error) {
        toast.error(
          error.response?.data || "Error al obtener datos del préstamo"
        );
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = Joi.object(schema).validate(data, { abortEarly: false });

    if (error) {
      console.error("Error de validación:", error.details);
      toast.error("Error de validación");
      return;
    }

    try {
      const { libro, fecha_inicio, fecha_devolucion, ...dataToUpdate } = data;

      dataToUpdate.fecha_inicio = new Date(fecha_inicio).toISOString();
      dataToUpdate.fecha_devolucion = new Date(fecha_devolucion).toISOString();

      await actualizarPrestamo(id, { ...dataToUpdate, libro });
      toast.success("Préstamo actualizado con éxito");
      navigate("/ConsultarPrestamos");
    } catch (error) {
      console.error("Error al actualizar el préstamo:", error);
      toast.error("Error al actualizar el préstamo");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bdy">
      <div className="containerr">
        <div className="title-modal">Editar Préstamo</div>
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Cedula</span>
              <input
                type="text"
                placeholder="Digite la cedula"
                required
                name="cedula"
                value={data.cedula}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Nombre Completo</span>
              <input
                type="text"
                placeholder="Escriba el nombre"
                required
                name="nombre"
                value={data.nombre}
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
                value={data.celular}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Título del Libro</span>
              <input
                type="text"
                placeholder="Escriba el título del libro"
                name="libro.titulo"
                value={data.libro.titulo}
                readOnly
              />
            </div>
            <div className="input-box">
              <span className="details">Fecha Préstamo</span>
              <input
                type="date"
                placeholder="Digite la fecha de inicio"
                required
                name="fecha_inicio"
                value={data.fecha_inicio}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Fecha Devolución</span>
              <input
                type="date"
                placeholder="Digite la fecha de devolución"
                required
                name="fecha_devolucion"
                value={data.fecha_devolucion}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="button">
            <input type="submit" className="btt" value="Actualizar" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarUsuario;

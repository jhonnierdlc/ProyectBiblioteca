import React, { useState, useEffect } from "react";
import Joi from "joi";
import { toast } from "react-toastify";
import {
  obtenerMultaPorId,
  actualizarMulta,
} from "../../../services/multaService";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";

function EditarMulta() {
  const [data, setData] = useState({
    libro: "",
    descripcion: "",
    precio: "",
    estado: "",
    cliente: { cedula: "" },
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = {
    libro: Joi.string().required(),
    cliente: Joi.object().required(),
    descripcion: Joi.string().required(),
    precio: Joi.string().required(),
    estado: Joi.string().required(),
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: multa } = await obtenerMultaPorId(id);
        const updatedData = {
          libro: multa.libro,
          descripcion: multa.descripcion,
          precio: multa.precio,
          estado: multa.estado,
          cliente: multa.cliente,
        };
        setData(updatedData);
      } catch (error) {
        toast.error(
          error.response?.data || "Error al obtener datos de la multa"
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
      await actualizarMulta(id, data);
      toast.success("Multa actualizada con éxito");
      navigate("/ConsultarMulta");
    } catch (error) {
      console.error("Error al actualizar la multa:", error);
      toast.error("Error al actualizar la multa");
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
        <div className="title-modal">Editar Multa</div>
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Cedula</span>
              <input
                type="text"
                placeholder="Cedula"
                required
                name="cedula"
                value={data.cliente.cedula}
                readOnly
              />
            </div>
            <div className="input-box">
              <span className="details">Libro</span>
              <input
                type="text"
                placeholder="Escriba el nombre"
                required
                name="libro"
                value={data.libro}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Descripcion</span>
              <input
                type="text"
                placeholder="Digite la descripcion"
                required
                name="descripcion"
                value={data.descripcion}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Valor Multa</span>
              <input
                type="text"
                placeholder="Digite el valor"
                required
                name="precio"
                value={data.precio}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Estado</span>
              <input
                type="text"
                placeholder="Digite el estado"
                required
                name="estado"
                value={data.estado}
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

export default EditarMulta;

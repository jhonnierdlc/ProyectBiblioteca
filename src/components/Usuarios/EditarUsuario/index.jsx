import React, { useState, useEffect } from "react";
import Joi from "joi";
import { toast } from "react-toastify";
import {
  obtenerClienteId,
  actualizarCliente,
} from "../../../services/clienteServices";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";

function EditarUsuario() {
  const [data, setData] = useState({
    cedula: "",
    nombre: "",
    edad: "",
    direccion: "",
    celular: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = {
    cedula: Joi.string().required(),
    nombre: Joi.string().required(),
    edad: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    direccion: Joi.string().required(),
    celular: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: cliente } = await obtenerClienteId(id);
        const updatedData = {
          cedula: cliente.cedula,
          nombre: cliente.nombre,
          edad: cliente.edad,
          direccion: cliente.direccion,
          celular: cliente.celular,
        };
        setData(updatedData);
      } catch (error) {
        toast.error(
          error.response?.data || "Error al obtener datos del cliente"
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
      return;
    }

    try {
      await actualizarCliente(id, data);
      toast.success("Cliente actualizado con éxito");
      navigate("/Consulta-Usuario");
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      toast.error("Error al actualizar el cliente");
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
      <div class="containerr">
        <div class="title-modal"> Editar Usuario </div>
        <form>
          <div class="user-details">
            <div class="input-box">
              <span class="details">Cedula</span>
              <input
                type="text"
                placeholder="Digite la cedula"
                required
                name="cedula"
                value={data.cedula}
                onChange={handleChange}
              />
            </div>
            <div class="input-box">
              <span class="details">Nombre Completo</span>
              <input
                type="text"
                placeholder="Escriba el nombre"
                required
                name="nombre"
                value={data.nombre}
                onChange={handleChange}
              />
            </div>
            <div class="input-box">
              <span class="details">Edad</span>
              <input
                type="text"
                placeholder="Digite la edad"
                required
                name="edad"
                value={data.edad}
                onChange={handleChange}
              />
            </div>
            <div class="input-box">
              <span class="details">Direccion</span>
              <input
                type="text"
                placeholder="Digite la direccion"
                required
                name="direccion"
                value={data.direccion}
                onChange={handleChange}
              />
            </div>

            <div class="input-box">
              <span class="details">Celular</span>
              <input
                type="text"
                placeholder="Digite el celular"
                required
                name="celular"
                value={data.celular}
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="button">
            <input
              type="submit"
              class="btt"
              value="Actualizar"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarUsuario;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { registrarMulta } from "../../../services/multaService";
import Joi from 'joi';
import { toast } from 'react-toastify';
import "./styles.css";
import { obtenerClienteId } from "../../../services/clienteServices";

function RegistrarMulta() {
  const [data, setData] = useState({ cedula: "", nombre: "", edad: "", direccion: "", celular: "" });
  const [multa, setMulta] = useState({
    clienteId: "",
    libro: "",
    precio: "",
    descripcion: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const schema = {
    clienteId: Joi.string().required(),
    libro: Joi.string().required(),
    precio: Joi.string().required(),
    descripcion: Joi.string().required(),
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
        setMulta(prevState => ({
          ...prevState,
          clienteId: id
        }));
      } catch (error) {
        toast.error(error.response?.data || 'Error al obtener datos del cliente');
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = Joi.object(schema).validate(multa, { abortEarly: false });

    if (error) {
      console.error('Error de validación:', error.details);
      toast.error('Error de validación');
      return;
    }

    try {
      await registrarMulta(multa);
      toast.success('Multa registrada exitosamente');
      navigate('/Inicio');
    } catch (error) {
      console.error('Error al registrar la multa:', error);
      toast.error('Error al registrar la multa');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMulta(prevMulta => ({
      ...prevMulta,
      [name]: value,
    }));
  };

  return (
    <div className="bdy">
      <div className="containerr">
        <div className="title"> Registrar Multa </div>
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Cedula</span>
              <input type="text" readOnly value={data.cedula} />
            </div>
            <div className="input-box">
              <span className="details">Nombre Completo</span>
              <input type="text" readOnly value={data.nombre} />
            </div>
            <div className="input-box">
              <span className="details">Titulo libro</span>
              <input
                type="text"
                placeholder="Escriba el titulo"
                required
                name="libro"
                value={multa.libro}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Valor Multa</span>
              <input
                type="text"
                placeholder="Digite valor Multa"
                required
                name="precio"
                value={multa.precio}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Descripcion</span>
              <input
                type="text"
                placeholder="Escriba la descripcion"
                required
                name="descripcion"
                value={multa.descripcion}
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
}

export default RegistrarMulta;

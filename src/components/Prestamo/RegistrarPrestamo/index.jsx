import React, { useState, useEffect } from 'react';
import "./styles.css";
import Joi from 'joi';
import { toast } from 'react-toastify';
import { obtenerLibroId, actualizarCliente } from "../../../services/libroServices";
import { useParams, useNavigate } from 'react-router-dom';


const Prestamo = () => {
  const [data, setData] = useState({ isbn: "", titulo: "", descripcion: "", portada: "", autor: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = {
    isbn: Joi.string().required(),
    titulo: Joi.string().required(),
    descripcion: Joi.string().required(),
    portada: Joi.string().required(),
    autor: Joi.string().required(),
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
      } catch (error) {
        toast.error(error.response?.data || 'Error al obtener datos del cliente');
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = Joi.object(schema).validate(data, { abortEarly: false });

    if (error) {
      console.error('Error de validación:', error.details);
      return;
    }

    try {

    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      toast.error('Error al actualizar el cliente');
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
      <div class="containerr" style={{ marginTop:"100px"}}>
        <div class="title"> Registro de Prestamo </div>
        <div className="libroo">
          <img
            src={data.portada}
            alt="Portada del libro"
            className="portada-libroo"
          />
        </div>
        <form>
          <div class="user-details">
            <div class="input-box">
              <span class="details">
                Libro Seleccionado
              </span>
              <input type="text" placeholder="" required name="titulo"  readOnly value={data.titulo} />
            </div>
            <div class="input-box">
              <span class="details">
                Isbn
              </span>
              <input type="text" placeholder="" required name="isbn"  readOnly value={data.isbn} />
            </div>
            <div class="input-box">
              <span class="details">
                Cedula Cliente
              </span>
              <input type="text" placeholder="Digite la cedula" required name="cedula" />
            </div>
            <div class="input-box">
              <span class="details">
                Nombre Cliente
              </span>
              <input type="text" placeholder="Digite el nombre" required name="nombre" />
            </div>

            <div class="input-box">
              <span class="details">
                Celular
              </span>
              <input type="text" placeholder="Digite el celular" required name="celular" />
            </div>
          </div>
          <div class="button">
            <input type="submit" class="btt" value="Registrar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prestamo;

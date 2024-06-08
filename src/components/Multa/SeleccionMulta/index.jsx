import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { obtenerClientes } from "../../../services/clienteServices";
import "./styles.css";

const SeleccionMulta = () => {
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await obtenerClientes();
        setClientes(data);
      } catch (error) {
        toast.error(error.response?.data || "Error al obtener clientes");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.cedula.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="consultar-usuarios-container">
      <h1 className="title">Buscar Usuario</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Buscar por cédula"
          value={search}
          onChange={handleSearch}
          className="input-filtro"
        />
      </div>

      <div className="table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Dirección</th>
              <th>Celular</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <tr key={cliente._id}>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.edad}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.celular}</td>
                  <td>
                    <Link to={`/RegistrarMulta/${cliente._id}`}>
                      <button className="btn btn-edit">Multar</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  No se encontraron clientes para la cédula ingresada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeleccionMulta;

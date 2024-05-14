import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { obtenerClientes } from "../../../services/clienteServices";

import './styles.css';

const SeleccionMulta = () => {
    const [clientes, setClientes] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await obtenerClientes();
                setClientes(data);
            } catch (error) {
                toast.error(error.response?.data || 'Error al obtener clientes');
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredClientes = clientes.filter(cliente =>
        cliente.cedula.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='contenedor'>
            <div className="titlek">Buscar Usuario</div>

            <div className="input-boxk">
                <input
                    type="text"
                    placeholder="Buscar por cedula"
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            <table className="content-table">
                <thead>
                    <tr>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Direccion</th>
                        <th>Celular</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClientes.map((cliente) => (
                        <tr key={cliente._id}>
                            <td>{cliente.cedula}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.edad}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.celular}</td>
                            <td>
                                <Link to={`/RegistrarMulta/${cliente._id}`}>
                                    <button className='bEditar'>Multar</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeleccionMulta;

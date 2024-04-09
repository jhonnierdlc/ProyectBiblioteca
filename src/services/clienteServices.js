import axios from 'axios'

const apiUrl = "http://localhost:8080/api/client";

export const crearCliente = (data) => {
    return axios.post(apiUrl,data)
};

export const obtenerClientes = () => {
    return axios.get(apiUrl)
};

export const obtenerClienteId = (id) => {
    return axios.get(`${apiUrl}/${id}`)
}
    
export const actualizarCliente = (id,data) => {
    return axios.put(`${apiUrl}/${id}`,data)
};

export const eliminarCliente = (id) => {
    return axios.delete(`${apiUrl}/${id}`)
};
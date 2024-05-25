import axios from 'axios'

const apiUrl = "http://localhost:8080/api/prestamo";

export const registrarPrestamo = (data) => {
    return axios.post(apiUrl,data)
};

export const obtenerPrestamo = () => {
    return axios.get(apiUrl)
};

export const actualizarPrestamo = (id,data) => {
    return axios.put(`${apiUrl}/${id}`,data)
};

export const obtenerPrestamoPorId = (id) => {
    return axios.get(`${apiUrl}/${id}`)
}

export const eliminarPrestamo = (id) => {
    return axios.delete(`${apiUrl}/${id}`)
};
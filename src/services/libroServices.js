import axios from 'axios'

const apiUrl = "http://localhost:8080/api/libro";

export const crearLibro = (data) => {
    return axios.post(apiUrl,data)
};

export const obtenerLibro = () => {
    return axios.get(apiUrl)
};

export const obtenerLibroId = (id) => {
    return axios.get(`${apiUrl}/${id}`)
}
    
export const actualizarLibro = (id,data) => {
    return axios.put(`${apiUrl}/${id}`,data)
};

export const eliminarLibro= (id) => {
    return axios.delete(`${apiUrl}/${id}`)
};
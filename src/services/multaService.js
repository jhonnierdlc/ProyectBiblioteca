import axios from 'axios'

const apiUrl = "http://localhost:8080/api/multa";

export const registrarMulta = (data) => {
    return axios.post(apiUrl,data)
};

export const obtenerMultas = () => {
    return axios.get(apiUrl)
};

export const actualizarMulta = (id,data) => {
    return axios.put(`${apiUrl}/${id}`,data)
};

export const obtenerMultaPorId = (id) => {
    return axios.get(`${apiUrl}/${id}`)
}

export const eliminarMulta = (id) => {
    return axios.delete(`${apiUrl}/${id}`)
};

export const inactivarMulta = (id) => {
    return axios.put(`${apiUrl}/inactivar/${id}`);
  };
  
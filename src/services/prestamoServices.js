import axios from 'axios'

const apiUrl = "http://localhost:8080/api/prestamo";

export const registrarPrestamo = (data) => {
    return axios.post(apiUrl,data)
};


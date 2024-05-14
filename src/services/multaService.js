import axios from 'axios'

const apiUrl = "http://localhost:8080/api/multa";

export const registrarMulta = (data) => {
    return axios.post(apiUrl,data)
};


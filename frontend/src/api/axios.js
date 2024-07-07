import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api', // Ajusta la URL base según sea necesario
    withCredentials: true
});

export default axiosInstance;

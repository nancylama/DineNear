import axios from "axios";

const api = axios.create({
    baseURL: 'https://thriving-peace-production.up.railway.app',
    withCredentials: true,
});

export default api;
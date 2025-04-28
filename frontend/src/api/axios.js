import axios from "axios";

const api = axios.create({
    baseURL: 'thriving-peace-production.up.railway.app',
    withCredentials: true,
});

export default api;
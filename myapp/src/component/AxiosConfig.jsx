import axios from 'axios';

var BackendUrl = "http://localhost:8000/api/v1"

if(process.env.MODE === "PRODUCTION"){
    BackendUrl = "https://nestcraft-backend.onrender.com"
}

const api = axios.create({baseURL:BackendUrl})

export default api;
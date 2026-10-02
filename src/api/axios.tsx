import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const api = axios.create({
    // Para desenvolvimento local, crie um .env.local com VITE_API_URL=http://localhost:3332
    baseURL: import.meta.env.VITE_API_URL ?? 'https://unisinos-groups-api.onrender.com',
})

// const navigate = useNavigate();

// axios.interceptors.response.use(response => {
//     return response;
//  }, error => {
//    if (error.response.status === 401) {
//     navigate("/401")
//    }
//    return error;
//  });

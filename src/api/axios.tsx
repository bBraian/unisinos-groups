import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const api = axios.create({
    // baseURL: 'http://localhost:3332',
    baseURL: 'https://unisinos-groups-api.onrender.com',
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
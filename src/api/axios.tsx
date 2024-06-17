import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3332',
    // baseURL: 'https://unisinos-groups-api.onrender.com',
})
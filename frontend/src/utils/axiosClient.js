import axios from "axios";

export const axiosClient = axios.create({
    baseURL : 'https://techbridge-expencetracker-backend.onrender.com/'
})

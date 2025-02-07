import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'https://dsa-tracker-rjce.onrender.com',
    withCredentials: true,
});
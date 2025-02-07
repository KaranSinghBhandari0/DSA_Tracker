import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://dsa-tracker-rjce.onrender.com',
    withCredentials: true,
});
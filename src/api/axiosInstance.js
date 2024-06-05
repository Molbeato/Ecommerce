import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://cima-back.onrender.com/"
});
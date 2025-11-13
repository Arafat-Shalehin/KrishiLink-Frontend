import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://krishi-link-backend.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
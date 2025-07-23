import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_server_api,
});

const usePublicAxios = () => {
  return axiosInstance;
};

export default usePublicAxios;

import axios from 'axios';
import { serverDetails } from '../config';
import { toast } from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: serverDetails.serverProxyURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response.data,

  (error) => {

    if (error.response.status === 401 && error.response.data.code === 'unauthorized') {
      location.href = '/login'
    }
    if (error.response.status === 403) {
      toast.error('You are not allowed to access this resource');
      return Promise.reject({
        code: "forbidden",
        message: 'You are not authorized to access this resource'
      });
    }
    if (error.response.status === 500) {
      toast.error('Internal server error');
    }

    return Promise.reject(error.response.data);
  },
);

export default axiosInstance;

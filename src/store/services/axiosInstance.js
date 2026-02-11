import axios from 'axios';

const axiosInstance = axios.create({
  // CHANGE THIS: Use the relative path so it goes through the Vite proxy
  baseURL: '/api',
  //OLD: baseURL: 'https://healthcrm.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
    // CHANGE THIS: Use the relative path so it goes through the Vite proxy
    baseURL: '/api',
    //OLD: baseURL: 'https://healthcrm.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

<<<<<<< HEAD
// Add a request interceptor to automatically add the token to headers.
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // The backend expects a "Bearer" token
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
=======
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
>>>>>>> 2dfbe76 (role base)
);

export default axiosInstance;

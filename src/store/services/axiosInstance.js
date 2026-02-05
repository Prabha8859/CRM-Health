import axios from 'axios';

const axiosInstance = axios.create({
    // CHANGE THIS: Use the relative path so it goes through the Vite proxy
    baseURL: '/api',
    //OLD: baseURL: 'https://healthcrm.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// ... rest of your interceptors
export default axiosInstance;

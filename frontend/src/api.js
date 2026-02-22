import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
});

// Optionally, you can add interceptors here to automatically attach headers if needed
export default api;

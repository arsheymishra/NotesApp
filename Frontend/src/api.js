import axios from 'axios';

// Determine the base URL based on environment
const baseURL = import.meta.env.MODE === 'production'
  ? '/api' // In production, use relative path which will be handled by Vercel routing
  : 'http://localhost:5000/api'; // In development, use the local backend URL

const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Add response interceptor to handle CORS errors
API.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'Network Error') {
      console.error('CORS error or network issue:', error);
      // You could add custom handling here, like showing a user-friendly message
    }
    return Promise.reject(error);
  }
);

export default API;

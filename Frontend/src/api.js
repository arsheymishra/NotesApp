import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
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

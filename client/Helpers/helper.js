import axios from 'axios';
import jwt from 'jsonwebtoken';

const instance = axios.create({
  baseURL: '/api/v1'
});

instance.interceptors.request.use((config) => {
  config.headers['x-access-token'] = localStorage.getItem('token');
  return config;
});

export default instance;

const secret = process.env.JWT_SECRET;

export const validateToken = () => {
  const token = localStorage.getItem('token');
  let message;
  jwt.verify(token, secret, (error) => {
    if (error) {
      message = 'Session expired';
      localStorage.clear();
    }
  });
  return message;
};

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.120.222:3333',
});

export default api;

// const accessToken = localStorage.getItem('access_token');
// accessToken && (request.headers.authorization = 'bearer ' + accessToken);
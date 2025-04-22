import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`, // Backend URL
  withCredentials: true, // Allow sending cookies
});

export default api;
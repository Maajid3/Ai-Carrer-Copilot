import axios from "axios";

const api = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: api,
  headers: { "Content-Type": "application/json" },
  timeout: 8000,
});

export default apiClient;

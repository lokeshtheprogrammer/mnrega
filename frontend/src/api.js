import axios from "axios";

const API_BASE_URL = "https://mnrega.onrender.com"; // Your Render backend URL

export const getDistricts = () => axios.get(`${API_BASE_URL}/districts`);

export const getLatestStats = (district) =>
  axios.get(`${API_BASE_URL}/stats/${district}`);

export const getHistoryStats = (district) =>
  axios.get(`${API_BASE_URL}/stats/history/${district}`);

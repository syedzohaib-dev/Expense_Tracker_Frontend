import axios from "axios";

const isProduction = window.location.hostname !== "localhost";

const axiosInstance = axios.create({
    baseURL: isProduction
        ? "https://expense-tracker-backend-ashen.vercel.app/"
        : "http://localhost:3000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("expense_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auto logout on 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("expense_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

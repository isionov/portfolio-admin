import axios from "axios";

axios.defaults.baseURL = "http://iliaion-dev.ru/api/";
// axios.defaults.baseURL = "http://localhost:3000/api/";
// axios.defaults.baseURL = "https://webdev-api.loftschool.com";
axios.defaults.headers = {
  "Content-Type": "application/json"
};

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      return axios.post("/refreshToken").then(response => {
        const token = response.data.token;
        localStorage.setItem("tkn", token);
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default axios;

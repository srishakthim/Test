import axios from "axios";

const Axios = axios.create({
    baseURL: `http://${process.env.REACT_APP_HOST_URL}:3030/api/v1`,
});

Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response["data"]["message"] === "jwt expired") {
            localStorage.clear()
            window.location.href = "/auth/signin";
        }
        return Promise.reject(error);
    }
);

export default Axios;

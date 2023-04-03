import axios from "axios";

// Create an Axios instance with default configuration
const axiosInstance = axios.create();

// Add a response interceptor to the Axios instance
axiosInstance.interceptors.response.use(
    (response) => response, // Do nothing for successful responses
    (error) => {
        if (error.response.status === 401 || error.response.body === 'Unauthorized') {
            // Redirect to the homepage for unauthorized responses
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export {
    axiosInstance
}
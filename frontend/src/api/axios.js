// USE: axios helps to send api requests to the backend server
import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})
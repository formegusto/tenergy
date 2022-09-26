import axios from "axios";

const baseURL = process.env.REACT_APP_API_SERVER;
const client = axios.create({ baseURL });

export default client;

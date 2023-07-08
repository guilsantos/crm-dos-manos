import baseAxios from "axios";

const axios = baseAxios.create({
  baseURL: process.env.BASE_URL,
});

export default axios;

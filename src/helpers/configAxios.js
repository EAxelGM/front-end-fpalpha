import axios from "axios";

const http = axios.create({
  baseURL: "https://back-end-books-x7gq7zmvhq-uc.a.run.app/api/v1",
});

export default http;

import axios from "axios";

export default axios.create({
  baseURL: "https://todo.api.devcode.gethired.id",
  headers: {
    "Content-type": "application/json"
  }
});
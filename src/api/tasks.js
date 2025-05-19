import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.13:3000", //ip del pc
});

export const getTasks = () => API.get("/tasks");
export const addTask = (data) => API.post("/tasks", data);
export const updTask = (id, data) => API.put(`/tasks/${id}`, data);
export const delTask = (id) => API.delete(`/tasks/${id}`);

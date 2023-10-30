import axios from "axios";
import { User } from "../pages/type";

const userAPI = axios.create({
  baseURL: "http://localhost:8000/user",
});

async function getUser() {
  const response = await userAPI.get("/");

  return response.data;
}

async function createUser(formData: User) {}

export { getUser, createUser };

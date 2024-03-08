import axios from "axios";
import { User } from "../pages/type";

const userAPI = axios.create({
  baseURL: "https://kaolin-all-instruments.uc.r.appspot.com/user",
});

async function getUser() {
  const response = await userAPI.get("/");

  return response.data;
}

async function createUser(formData: User) {}

export { getUser, createUser };

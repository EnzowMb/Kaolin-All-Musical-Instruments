import axios from "axios";

const woodWindAPI = axios.create({
  baseURL: "http://localhost:8000/instrument/",
});

async function getInstruments() {
  const response = await woodWindAPI.get("/");

  return response.data;
}

export { getInstruments };

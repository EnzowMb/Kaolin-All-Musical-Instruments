import axios from "axios";

const woodWindAPI = axios.create({
  baseURL: "https://kaolin-all-instruments.uc.r.appspot.com/instrument",
});

async function getAllInstruments() {
  const response = await woodWindAPI.get("/");

  return response.data;
}

async function getInstruments(family: string) {
  const response = await woodWindAPI.get(`/family?string=${family}`);

  return response.data;
}

export { getInstruments, getAllInstruments };

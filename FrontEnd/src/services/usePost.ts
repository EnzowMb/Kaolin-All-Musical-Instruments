import axios from "axios";
import { useState } from "react";

export function usePost() {
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState(false);
  const [response, setResponse] = useState("");

  async function registerData<T>({
    url,
    data,
    token,
  }: {
    url: string;
    data: T;
    token?: string;
  }) {
    try {
      const response = await axios.post(`http://localhost:8000/${url}`, data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      setSucess(true);
      const convertedResponse = await response.data.json();
      setResponse(convertedResponse.acessToken);
    } catch (error) {
      setError("Não foi possível enviar os dados");
    }
  }

  return { registerData, sucess, error, response };
}

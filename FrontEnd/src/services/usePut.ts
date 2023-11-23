import axios from "axios";
import { useState } from "react";

export function usePut() {
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState(false);
  const [response, setResponse] = useState("");

  async function updateData<T>({
    url,
    data,
    token,
  }: {
    url: string;
    data: T;
    token?: string;
  }) {
    try {
      const response = await axios.put(`http://localhost:8000/${url}`, data, {
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

  return { updateData, sucess, error, response };
}

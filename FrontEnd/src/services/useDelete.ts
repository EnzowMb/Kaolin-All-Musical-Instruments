import axios from "axios";
import { useState } from "react";

export function useDelete() {
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState(false);
  const [response, setResponse] = useState("");

  async function deleteData<T>({ url, token }: { url: string; token: string }) {
    try {
      const response = await axios.delete(`http://localhost:8000/${url}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      setSucess(true);
      const convertedResponse = await response.data.json();
      setResponse(convertedResponse.acessToken);
    } catch (error) {
      setError("Não foi possível deletar os dados");
    }
  }

  return { deleteData, sucess, error, response };
}

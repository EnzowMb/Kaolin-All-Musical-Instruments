import axios from "axios";
import { useState } from "react";

export function useDelete() {
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState(false);
  const [response, setResponse] = useState("");

  async function deleteData({ url, token }: { url: string; token: string }) {
    try {
      const response = await axios.delete(
        `https://kaolin-all-instruments.uc.r.appspot.com/${url}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      setSucess(true);
      return response;
    } catch (error) {
      setError("Não foi possível deletar os dados");
    }
  }

  return { deleteData, sucess, error, response };
}

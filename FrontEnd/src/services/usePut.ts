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
      const response = await axios.put(
        `https://kaolin-all-instruments.uc.r.appspot.com/${url}`,
        data,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      setSucess(true);
      return response;
    } catch (error) {
      setError("Não foi possível enviar os dados");
    }
  }

  return { updateData, sucess, error, response };
}

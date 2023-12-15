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
      const formData = new FormData();

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const value = data[key];

          // Verifica se o valor é um arquivo (Blob)
          if (value instanceof Blob) {
            formData.append(key, value); // 'filename' é opcional, você pode ajustar conforme necessário
          } else {
            formData.append(key, String(value));
          }
        }
      }

      const response = await axios.post(
        `http://localhost:8000/${url}`,
        formData,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      setSucess(true);
      const convertedResponse = await response.data.json();
      setResponse(convertedResponse.acessToken);
    } catch (error) {
      setError("Não foi possível enviar os dados");
    }
  }

  return { registerData, sucess, error, response };
}

import { useEffect, useState } from "react";
import { getInstruments } from "../../services/instrumentTypeService";
import { Instrument } from "../type";

export const WoodWind = () => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  async function fetchInstruments() {
    const instrumentsAPI = await getInstruments("madeiras");
    setInstruments(instrumentsAPI);
  }

  useEffect(() => {
    fetchInstruments();
  }, []);

  return (
    <div>
      {instruments.map((instrument) => (
        <p>{instrument.name}</p>
      ))}
    </div>
  );
};

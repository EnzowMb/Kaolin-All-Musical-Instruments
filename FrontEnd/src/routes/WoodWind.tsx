import { useEffect, useState } from "react";
import { getInstruments } from "../services/woodWind";

type Instrument = {
  name: string;
};

export const WoodWind = () => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  console.log("opa");

  async function fetchInstruments() {
    const instrumentsAPI = await getInstruments();
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

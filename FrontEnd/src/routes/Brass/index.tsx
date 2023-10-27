import { useEffect, useState } from "react";
import { getInstruments } from "../../services/instrumentTypeService";
import { Instrument } from "../type";
import { InstrumentCard } from "../../components/InstrumentCard";

export const Brass = () => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  async function fetchInstruments() {
    const instrumentsAPI = await getInstruments("metais");
    setInstruments(instrumentsAPI);
  }

  useEffect(() => {
    fetchInstruments();
  }, []);

  return (
    <div>
      {instruments.map((instrument) => (
        <InstrumentCard name={instrument.name} family={instrument.family} />
      ))}
    </div>
  );
};

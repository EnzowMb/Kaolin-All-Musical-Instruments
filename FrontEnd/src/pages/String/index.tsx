import { useEffect, useState } from "react";
import { getInstruments } from "../../services/instrumentService";
import { Instrument } from "../type";
import { InstrumentCard } from "../../components/InstrumentCard";

export const String = () => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  async function fetchInstruments() {
    const instrumentsAPI = await getInstruments("cordas");
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
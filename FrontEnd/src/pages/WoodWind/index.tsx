import { useEffect, useState } from "react";
import { getInstruments } from "../../services/instrumentService";
import { Instrument } from "../type";
import { InstrumentCard } from "../../components/InstrumentCard";
import "./style.css";

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
    <div className="elements">
      {instruments.map((instrument) => (
        <InstrumentCard
          name={instrument.name}
          family={instrument.family}
          date={instrument.date}
          description={instrument.description}
        />
      ))}
    </div>
  );
};

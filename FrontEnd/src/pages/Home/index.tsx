import { useEffect, useState } from "react";
import { Instrument } from "../type";
import "./home.css";
import { getAllInstruments } from "../../services/instrumentService";
import { InstrumentCard } from "../../components/InstrumentCard";

export function Home() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  async function fetchInstruments() {
    const instrumentsAPI = await getAllInstruments();
    setInstruments(instrumentsAPI);
  }

  useEffect(() => {
    fetchInstruments();
  }, []);

  return (
    <div className="appContainer">
      <div className="elements">
        {instruments.map((instrument) => (
          <InstrumentCard name={instrument.name} family={instrument.family} />
        ))}
      </div>
    </div>
  );
}

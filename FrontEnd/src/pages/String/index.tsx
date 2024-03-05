import { useEffect, useState } from "react";
import { getInstruments } from "../../services/instrumentService";
import { Instrument } from "../type";
import { InstrumentCard } from "../../components/InstrumentCard";
import styled from "styled-components";

export const String = () => {
  const Instruments = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em;
  `;

  const [instruments, setInstruments] = useState<Instrument[]>([]);

  async function fetchInstruments() {
    const instrumentsAPI = await getInstruments("cordas");
    setInstruments(instrumentsAPI);
  }

  useEffect(() => {
    fetchInstruments();
  }, []);

  return (
    <Instruments>
      {instruments.map((instrument) => (
        <InstrumentCard
          key={instrument.id}
          name={instrument.name}
          family={instrument.family}
          date={instrument.date}
          description={instrument.description}
          img={instrument.img}
        />
      ))}
    </Instruments>
  );
};

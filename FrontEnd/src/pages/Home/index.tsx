import { useEffect, useState } from "react";
import { Instrument } from "../type";
import "./home.css";
import { getAllInstruments } from "../../services/instrumentService";
import { InstrumentCard } from "../../components/InstrumentCard";
import { Banner } from "./Banner";
import styled from "styled-components";
import { Search } from "./Search";
import { TypeInstrument } from "./TypeInstrument";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
      <Banner />
      <div className="elements">
        <Container>
          <Search />
          <TypeInstrument />
        </Container>
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
      </div>
    </div>
  );
}

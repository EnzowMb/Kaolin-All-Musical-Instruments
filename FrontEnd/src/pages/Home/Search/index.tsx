import styled from "styled-components";
import { useEffect, useState } from "react";

import search from "./assets/search.png";
import { Button } from "../../../components/Button";
import { getAllInstruments } from "../../../services/instrumentService";
import { Instrument } from "../../type";
import { InstrumentCard } from "../../../components/InstrumentCard";
import { Subtitle } from "../../../components/SubTitle";

const Input = styled.input`
  padding: 16px 16px 16px 30px;
  margin: 1em;
  background-image: url(${search});
  background-repeat: no-repeat;
  background-color: var(--gray);
  background-position: 10px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  width: 40%;
  ::placeholder {
    color: black;
  }
`;

const Container = styled.section`
  background: white;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 2em 5em;
  text-align: center;
  margin: 3em 0;
  width: 75%;
`;

const ContainerForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 22px;
  color: black;
`;

const ButtonOK = styled(Button)`
  margin-top: 1rem;
`;

export function Search() {
  const [search, setSearch] = useState("");

  const [instruments, setInstruments] = useState<Instrument[]>([]);

  const handleSearchClick = () => {
    if (search === "") return;

    setIsInputEnabled(true);
  };

  const handleOKClick = () => {
    setIsInputEnabled(false);
    setSearch("");
  };

  const [isInputEnabled, setIsInputEnabled] = useState(false);

  async function fetchInstruments() {
    const instrumentsAPI = await getAllInstruments();
    setInstruments(instrumentsAPI);
  }

  useEffect(() => {
    fetchInstruments();
  }, []);

  const instrumentFilter =
    search !== ""
      ? instruments.filter((instrumento) =>
          instrumento.name.toLowerCase().startsWith(search.toLowerCase())
        )
      : [];

  return (
    <Container>
      <Title>Procure seu instrumento favorito!</Title>
      <ContainerForm>
        <Input
          type="text"
          onChange={(ev) => setSearch(ev.target.value)}
          value={search}
          placeholder={"Digite o instrumento que você procura!"}
        />
        <Button type="button" label="Buscar" onClick={handleSearchClick} />
      </ContainerForm>
      {isInputEnabled && (
        <>
          {instrumentFilter.map((instrument) => (
            <InstrumentCard
              key={instrument.id}
              name={instrument.name}
              family={instrument.family}
              date={instrument.date}
              description={instrument.description}
              img={instrument.img}
            />
          ))}
          {instrumentFilter.length === 0 && (
            <Subtitle>Nenhum instrumento encontado :(</Subtitle>
          )}
          <ButtonOK type="button" label="OK" onClick={handleOKClick} />
        </>
      )}
    </Container>
  );
}

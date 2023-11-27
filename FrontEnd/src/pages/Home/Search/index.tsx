import styled from "styled-components";
import search from "./assets/search.png";
import { Button } from "../../../components/Button";

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
  font-family: var(--Main-Font);
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: black;
`;

export function Seacrh() {
  return (
    <Container>
      <Title>Procure seu instrumento favorito!</Title>
      <ContainerForm>
        <Input placeholder={"Digite o instrumento que você procura!"} />
        <Button label="Buscar" />
      </ContainerForm>
    </Container>
  );
}

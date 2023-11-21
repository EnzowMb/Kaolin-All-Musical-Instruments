import styled from "styled-components";
import { Container } from "../../components/Container";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";

const UserContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomizedButton = styled(Button)`
  background-color: var(--palegoldenrod);
  color: black;
  box-sizing: border-box;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border: 1px solid;
  margin: 1.5em;
  font-size: 1em;
  padding: 2em;
`;

export const Dashboard = () => {
  return (
    <UserContainer>
      <Title>Perfil do Usuario!</Title>
      <CustomizedButton label="Editar Usuario" />
      <CustomizedButton label="Adicionar Instrumento" />
    </UserContainer>
  );
};

import styled from "styled-components";
import imageForm from "./imageForm.png";
import { Outlet } from "react-router-dom";

const MainContainer = styled.div`
  background-image: url(${imageForm});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  background-color: white;
  background: rgba(0, 0, 0, 0.5);
  width: 50vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BasicFormPage = () => {
  return (
    <MainContainer>
      <Container>
        <Outlet />
      </Container>
    </MainContainer>
  );
};

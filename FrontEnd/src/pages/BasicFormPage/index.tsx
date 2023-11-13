import styled from "styled-components";
import imageForm from "./imageForm.png";

const MainContainer = styled.div`
  background-image: url(${imageForm});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BasicFormPage = () => {
  return <MainContainer></MainContainer>;
};

import styled from "styled-components";

const BannerArea = styled.section`
  height: 50vh;
  background: linear-gradient(var(--cor-principal), rgba(255, 255, 255, 0.336));
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.6rem;
`;

const Title = styled.h1`
  text-transform: uppercase;
  margin: 0;
  font-size: 4rem;
`;

export const Banner = () => {
  return (
    <BannerArea>
      <Container>
        <Title>Kaolin</Title>
        <p>Todos os instrumentos registrados.</p>
      </Container>
    </BannerArea>
  );
};

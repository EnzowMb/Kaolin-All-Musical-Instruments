import styled from "styled-components";
import banner from "./banner.jpg";

const BannerArea = styled.section`
  height: 50vh;
  background: linear-gradient(
      rgba(240, 240, 240, 0.144),
      rgba(255, 255, 255, 0.336)
    ),
    url(${banner});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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

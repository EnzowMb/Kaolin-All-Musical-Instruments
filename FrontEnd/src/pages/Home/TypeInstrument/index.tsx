import styled from "styled-components";
import woodwind from "./assets/WoodWind.png";
import brass from "./assets/Brass.png";
import percussion from "./assets/Percussion.png";
import string from "./assets/String.png";

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 60%;
`;

const Section = styled.div`
  width: 20%;
  background-color: var(--gray);
  padding: 16px 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  cursor: pointer;
`;

const Text = styled.p`
  line-height: 19px;
  color: var(--SaddleBrown);
  padding: 0.5em 0.5em;
  border-radius: 1em;
  background-color: white;
  &:hover {
    color: black;
    border: 0.5px solid black;
  }
`;

const Img = styled.img`
  width: 50%;
`;

const Link = styled.a`
  text-decoration: none;
`;

export const TypeInstrument = () => {
  return (
    <Container>
      <Section>
        <Link href="/cordas">
          <Img src={string} alt="String" />
          <Text>Cordas</Text>
        </Link>
      </Section>

      <Section>
        <Link href="/madeiras">
          <Img src={woodwind} alt="Woodwind" />
          <Text>Madeiras</Text>
        </Link>
      </Section>

      <Section>
        <Link href="/metais">
          <Img src={brass} alt="Brass" />
          <Text>Metais</Text>
        </Link>
      </Section>

      <Section>
        <Link href="/percussao">
          <Img src={percussion} alt="Percussion" />
          <Text>Percussão</Text>
        </Link>
      </Section>
    </Container>
  );
};

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
`;

const Text = styled.p`
  line-height: 19px;
  color: blue;
`;

const Img = styled.img`
  width: 50%;
`;

export const TypeInstrument = () => {
  return (
    <Container>
      <Section>
        <Img src={string} alt="String" />
        <Text>Cordas</Text>
      </Section>
      <Section>
        <Img src={woodwind} alt="Woodwind" />
        <Text>Madeiras</Text>
      </Section>
      <Section>
        <Img src={brass} alt="Brass" />
        <Text>Metais</Text>
      </Section>
      <Section>
        <Img src={percussion} alt="Percussion" />
        <Text>Percussão</Text>
      </Section>
    </Container>
  );
};

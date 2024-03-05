import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--PaleGoldenrod);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 0.5em auto;
  max-width: 600px;
  padding: 1em;
  justify-content: space-around;
  width: 90%;
`;

const Title = styled.h3`
  color: var(--SaddleBrown);
  font-weight: 700;
  font-size: 2em;
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  overflow: hidden;
  border: 8px solid #eaf0ff;
  border-radius: 90%;
  width: 10em;
`;

const Main = styled.div``;

const Desc = styled.div`
  text-align: center;
`;

const Family = styled.div`
  color: #002f52;
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0;
`;

const Description = styled.div`
  background-color: var(--gray);
  border-radius: 10px;
  padding: 1em;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  font-size: 1em;
`;

const Date = styled.p`
  background-color: var(--HoneyDew);
  padding: 0.5em;
  border-radius: 10px;
`;

interface InstrumentCardProps {
  name: string;
  family: string;
  date: string;
  description: string;
  img: string;
}

export const InstrumentCard = ({
  name,
  family,
  date,
  description,
  img,
}: InstrumentCardProps) => {
  return (
    <Card>
      <Main>
        <Title>{name}</Title>
        <Image src={img} alt="Instrumento" />
      </Main>
      <Desc>
        <Family>{family[0].toUpperCase() + family.substring(1)}</Family>
        <Description>{description}</Description>
        <Date>Ano de criação: {date}</Date>
      </Desc>
    </Card>
  );
};

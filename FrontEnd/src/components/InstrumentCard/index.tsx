import styled from "styled-components";

const Card = styled.div`
  align-items: center;
  background-image: linear-gradient(90deg, #e0c675 35%, #c6b3b0);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  margin: 0 auto;
  max-width: 600px;
  padding: 25px 20px;
  justify-content: space-around;
  width: 100%;
  transition: transform 0.1s;
  &:hover {
    transform: scale(1.04);
    cursor: pointer;
  }
`;

const Desc = styled.div``;

const Family = styled.div`
  color: #002f52;
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0;
`;

interface InstrumentCardProps {
  name: string;
  family: string;
  date: string;
}

export const InstrumentCard = ({ name, family, date }: InstrumentCardProps) => {
  return (
    <Card>
      <Desc>
        <h3>{name}</h3>
        <Family>{family}</Family>
        <p>Ano de criação: {date}</p>
      </Desc>
    </Card>
  );
};

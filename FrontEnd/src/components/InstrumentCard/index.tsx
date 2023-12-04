import "./style.css";

interface InstrumentCardProps {
  name: string;
  family: string;
  date: string;
}

export const InstrumentCard = ({ name, family, date }: InstrumentCardProps) => {
  return (
    <div className="card">
      <div className="desc">
        <h3>{name}</h3>
        <div className="family">{family}</div>
        <p>Ano de criação: {date}</p>
      </div>
    </div>
  );
};

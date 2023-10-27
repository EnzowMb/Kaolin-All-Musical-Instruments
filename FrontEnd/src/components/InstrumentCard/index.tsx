import "./style.css";

interface InstrumentCardProps {
  name: string;
  family: string;
}

export const InstrumentCard = ({ name, family }: InstrumentCardProps) => {
  return (
    <div className="card">
      <div className="desc">
        <h3>{name}</h3>
        <div className="family">{family}</div>
      </div>
    </div>
  );
};

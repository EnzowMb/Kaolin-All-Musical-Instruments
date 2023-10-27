import "./style.css";

export const CardRecomenda = ({ name, family }) => {
  return (
    <div className="card">
      <div className="desc">
        <h3>{name}</h3>
        <div className="family">{family}</div>
      </div>
    </div>
  );
};

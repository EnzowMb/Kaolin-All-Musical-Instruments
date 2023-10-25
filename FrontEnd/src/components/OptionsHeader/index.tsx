import "./optionsHeader.css";
import { Link } from "react-router-dom";

const textoOpcoes = ["CORDAS", "MADEIRAS", "METAIS", "PERCUSSAO"];

// const Opcoes = styled.ul`
//     display: flex;
// `

// const Opcao = styled.li`
//     font-size: 16px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
//     height: 100%;
//     padding: 0 5px;
//     cursor: pointer;
//     min-width: 120px;
// `

export const OpcaoHeader = () => {
  return (
    <ul className="options">
      {textoOpcoes.map((texto) => (
        <Link to={`${texto.toLowerCase().split(" ").join("")}`}>
          <li className="option">
            <p>{texto}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

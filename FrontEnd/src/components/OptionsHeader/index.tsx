import "./optionsHeader.css";

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
        <li className="option">
          <p>{texto}</p>
        </li>
      ))}
    </ul>
  );
};

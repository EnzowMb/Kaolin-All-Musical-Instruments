import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface Props {
  onClose: () => void;
}

export const SuccessModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="successModalContainer">
      <div className="successModalContent">
        <h2 className="successModalTitle">Cadastro bem-sucedido!</h2>
        <p className="successModalText">Sua conta foi criada com sucesso.</p>
        <Link to={"/login"}>
          <button className="successModalButton" onClick={onClose}>
            Fazer Login
          </button>
        </Link>
      </div>
    </div>
  );
};

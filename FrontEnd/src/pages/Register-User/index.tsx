import { useState } from "react";
import "./style.css";
import { SuccessModal } from "../../components/SuccessModal";
import { Link } from "react-router-dom";
import axios from "axios";

export const RegisterUser: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === "")) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    if (!isEmailValid(formData.email)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    axios
      .post("http://localhost:8000/user/create", formData)
      .then((response) => {
        console.log("Dados enviados com sucesso:", response.data);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
      });
  };

  return (
    <div className="container">
      <div className="content">
        <div className="containerTitle">
          <text className="title">Entrar</text>
        </div>
        <form onSubmit={handleSubmit}>
          {showSuccessModal ? (
            <SuccessModal onClose={() => setShowSuccessModal(false)} />
          ) : (
            <>
              <input
                type="text"
                placeholder="Insira seu nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Senha"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Link to={"/"}>
                <button>Cancelar</button>
              </Link>
              <button type="submit">Cadastrar-se</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

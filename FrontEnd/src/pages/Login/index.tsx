import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { TitledInput } from "../../components/TitledInput";
import { Button } from "../../components/Button";
import axios from "axios";
import { useUserState } from "../../context/UserStore";

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (formData.email === "" || formData.password === "") {
      alert("Por favor, preencha todos os campos antes de fazer o login.");
      return;
    }

    try {
      const user = await axios.post("http://localhost:8000/login", formData);
      let userLogin = useUserState.getState().user;
      userLogin = {
        name: user.data.name,
      };
      useUserState.setState({ user: userLogin });
      alert("Login bem-sucedido!");
    } catch (error) {
      alert("Email ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-screen flex flex-col justify-center items-center">
      <div className="bg-white w-2/5 mx-auto my-auto p-12 shadow-2xl rounded border-x-4 border-yellow-400">
        <div className="flex flex-row justify-center rounded border-x-4 border-yellow-400 mx-2 my-1">
          <text className="text-4xl lg: text-6xl font-bold text-center">
            Entrar
          </text>
        </div>

        <div className="flex flex-col justify-center">
          <TitledInput
            label={"Email"}
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TitledInput
            label={"Senha"}
            type="password"
            placeholder="Senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="containerButtons">
            <button onClick={handleLogin}>Login</button>
            <Link to={"/register-user"}>
              <Button label={"Cadastrar-se"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

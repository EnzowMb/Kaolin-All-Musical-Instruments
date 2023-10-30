import React, { useEffect, useState } from "react";
import { IUser } from "./types";
import { getUser } from "../../services/userService";
import { Link } from "react-router-dom";
import "./style.css";
import { TitledInput } from "../../components/TitledInput";
import { Button } from "../../components/Button";

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [users, setUsers] = useState<IUser[]>([]);

  async function fetchUsers() {
    const usersAPI = await getUser();
    setUsers(usersAPI);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    if (formData.email === "" || formData.password === "") {
      alert("Por favor, preencha todos os campos antes de fazer o login.");
      return;
    }

    console.log(users);

    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      alert("Login bem-sucedido!");
    } else {
      alert("Email ou senha incorretos. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="content">
        <div className="containerTitle">
          <text className="title">Entrar</text>
        </div>

        <div className="containerBody">
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

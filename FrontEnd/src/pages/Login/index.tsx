import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { TitledInput } from "../../components/TitledInput";
import { Button } from "../../components/Button";
import axios from "axios";
import { useUserState } from "../../context/UserStore";
import styled from "styled-components";
import logo from "../../Img/Logo.png";

const Image = styled.img`
  padding: 2em 0;
  width: 10em;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: var(--cinza);
`;

const Form = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomizedButton = styled(Button)`
  width: 50%;
`;

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: blue;
`;

const RegisterParagraph = styled(Paragraph)`
  color: gray;
`;

const CustomizedLink = styled(Link)`
  color: blue;
  font-weight: 700;
  text-decoration: none;
`;

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
    <>
      <Image src={logo} alt="Logo Kaolin" />
      <Title>Faça login em sua conta</Title>
      <Form>
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
        <CustomizedButton label="Login" onClick={handleLogin} />
      </Form>
      <Paragraph>Esqueceu sua senha?</Paragraph>
      <RegisterParagraph>
        Ainda não tem conta?
        <CustomizedLink to="/register-user">Faça seu cadastro!</CustomizedLink>
      </RegisterParagraph>
    </>
  );
};

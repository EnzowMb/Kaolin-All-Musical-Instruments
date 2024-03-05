import { useState } from "react";
import { SuccessModal } from "../../components/SuccessModal";
import { Link } from "react-router-dom";
import axios from "axios";
import { TitledInput } from "../../components/TitledInput";
import { Button } from "../../components/Button";
import logo from "../../Img/Logo.png";
import styled from "styled-components";
import { Step, StepLabel, Stepper } from "@mui/material";
import { usePost } from "../../services/usePost";

const Image = styled.img`
  padding: 2em 0;
  width: 10em;
  border-radius: 10em;
`;

interface CustomizedProps {
  color: string;
}

const CustomizedStep = styled.div<CustomizedProps>`
  background-color: ${({ color }) => color};
  width: 8px;
  height: 8px;
  border-radius: 50%;
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

const CustomButton = styled(Button)`
  margin: 0.3em;
  width: 50%;
`;

export const RegisterUser: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const { registerData, sucess, error } = usePost();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.name === "") {
      alert("Por favor, insira o nome do usuario.");
      return;
    }

    if (!isNameValid(formData.name)) {
      alert("Por favor, insira um nome válido.");
      return;
    }

    setActiveStage(activeStage + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isNameValid = (email: string) => {
    const nameRegex = /^[A-Z0-9._%+-]{4,20}$/;
    return nameRegex.test(email);
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string) => {
    const passwordRegex = /^[A-Z0-9._%+-]{4,}$/;
    return passwordRegex.test(password);
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

    if (!isPasswordValid(formData.password)) {
      alert("Por favor, insira uma senha válida.");
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
    <>
      <Image src={logo} alt="Logo Kaolin" />
      <Stepper activeStep={activeStage}>
        <Step>
          <StepLabel
            StepIconComponent={(props) => (
              <CustomizedStep
                color={props.active ? "lightblue" : "lightgray"}
              />
            )}
          />
        </Step>
        <Step>
          <StepLabel
            StepIconComponent={(props) => (
              <CustomizedStep
                color={props.active ? "lightblue" : "lightgray"}
              />
            )}
          />
        </Step>
      </Stepper>

      {activeStage === 0 ? (
        <>
          <Title>Primeiro, alguns dados básicos:</Title>
          <Form onSubmit={handleStep}>
            <TitledInput
              label={"Nome"}
              type="text"
              placeholder="Insira seu nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <CustomButton type="submit" label="Avançar" />
          </Form>
        </>
      ) : (
        <>
          <Title>Agora, os dados técnicos:</Title>
          <Form onSubmit={handleSubmit}>
            {showSuccessModal ? (
              <SuccessModal onClose={() => setShowSuccessModal(false)} />
            ) : (
              <>
                <TitledInput
                  label={"Email"}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TitledInput
                  label={"Senha"}
                  type="password"
                  placeholder="Senha"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <CustomButton type="submit" label="Cadastrar-se" />
              </>
            )}
          </Form>
        </>
      )}
    </>
  );
};

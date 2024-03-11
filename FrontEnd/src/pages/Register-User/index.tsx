import { useState } from "react";
import axios from "axios";
import { TitledInput } from "../../components/TitledInput";
import { Button } from "../../components/Button";
import logo from "../../Img/Logo.png";
import styled from "styled-components";
import { Step, StepLabel, Stepper } from "@mui/material";
import { usePost } from "../../services/usePost";
import { Validation } from "../../services/Validation";
import { SmileOutlined } from "@ant-design/icons";
import { Alert, Space, Result } from "antd";
import { Link } from "react-router-dom";

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

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowErrorAlert(false);
    setShowAlert(false);
  };

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

    const result = Validation.UserSchema.pick({ name: true }).safeParse({
      name: formData.name,
    });

    if (result.success) {
      setActiveStage(activeStage + 1);
    } else {
      result.error.errors.forEach((error) => {
        if (error.path.includes("name")) {
          setAlertMessage(error.message);
          setShowAlert(true);
        }
      });
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === "")) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    const result = Validation.UserSchema.safeParse({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      await axios
        .post(
          "https://kaolin-all-instruments.uc.r.appspot.com/user/create",
          formData
        )
        .then((response) => {
          console.log("Dados enviados com sucesso:", response.data);
          setShowSuccessModal(true);
        })
        .catch((error) => {
          console.error("Erro ao enviar os dados " + error);
          if (error.response.status === 422) {
            setShowErrorAlert(true);
          }
        });
    } else {
      let message = "Os seguintes alertas foram encontrados: ";
      result.error.issues.forEach((issue) => {
        message += issue.message + ";";
      });
      setAlertMessage(message);
      setShowAlert(true);
    }
  };

  return (
    <>
      {showErrorAlert && (
        <Space direction="vertical" style={{ width: "80%" }}>
          <Alert
            message="Algo deu errado!"
            description="Usuario com este email já existe!"
            type="error"
            showIcon
            closable
            onClose={onClose}
          />
        </Space>
      )}
      {showAlert && (
        <Space direction="vertical" style={{ width: "80%" }}>
          <Alert
            message="Aviso!"
            description={alertMessage}
            type="warning"
            showIcon
            closable
            onClose={onClose}
          />
        </Space>
      )}
      <Link to="/">
        <Image src={logo} alt="Logo Kaolin" />
      </Link>
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
          <Form onSubmit={handleSubmit}>
            {showSuccessModal ? (
              <Result
                icon={<SmileOutlined />}
                title="Cadastrado com sucesso! Faça o login "
                extra={
                  <Link to={"/login"}>
                    <Button label="Login"></Button>
                  </Link>
                }
              />
            ) : (
              <>
                <Title>Agora, os dados técnicos:</Title>
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

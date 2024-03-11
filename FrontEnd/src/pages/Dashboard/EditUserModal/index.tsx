/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import { Title } from "../../../components/Title";
import { TitledInput } from "../../../components/TitledInput";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { usePut } from "../../../services/usePut";
import { useAuth } from "../../../contexts/authContext";
import { Validation } from "../../../services/Validation";
import { Alert, Space } from "antd";

const CustomizedBox = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  max-height: 90vh;
  overflow-y: auto;
  background-color: white;
  border: none;
  border-radius: 16px;
  padding: 1em 5em;
`;

const CustomizedButton = styled(Button)`
  width: 50%;
  display: block;
  margin: 1em auto;
`;

export default function EditUserModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const { user, updateUser } = useAuth();
  const { updateData } = usePut();

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowAlert(false);
  };

  if (!user) return <></>;

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  const handleEnableDisableClick = () => {
    setIsInputEnabled(!isInputEnabled);
  };

  const [isInputEnabled, setIsInputEnabled] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      const response = await updateData({
        url: `user/${user.id}`,
        data: formData,
        token: user.acesstoken,
      });
      if (response?.status === 202) {
        handleClose();
        setIsInputEnabled(!isInputEnabled);
        updateUser(user.id, response.data);
      }
    } else {
      let message = "Os seguintes alertas foram encontrados: ";
      result.error.issues.forEach((issue) => {
        message += issue.message + ";";
      });
      setAlertMessage(message);
      setShowAlert(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Modal de edição de usuario"
      aria-describedby="Nesse modal terá os dados de cadastro do instrumento"
    >
      <CustomizedBox>
        {showAlert && (
          <Space direction="vertical" style={{ width: "100%" }}>
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
        <Title>Edite os dados do usuario:</Title>
        <form onSubmit={handleSubmit}>
          <TitledInput
            label={"Nome"}
            type="text"
            placeholder="Insira seu nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isInputEnabled}
            style={{
              border: isInputEnabled
                ? "none"
                : "2px solid var(--cor-secundaria)",
              color: isInputEnabled ? "black" : "gray",
            }}
            required
          />
          <TitledInput
            label={"Email"}
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isInputEnabled}
            style={{
              border: isInputEnabled
                ? "none"
                : "2px solid var(--cor-secundaria)",
              color: isInputEnabled ? "black" : "gray",
            }}
            required
          />
          <TitledInput
            label={"Senha"}
            type="password"
            placeholder="Senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={!isInputEnabled}
            style={{
              border: isInputEnabled
                ? "none"
                : "2px solid var(--cor-secundaria)",
              color: isInputEnabled ? "black" : "gray",
            }}
            required
          />
          {isInputEnabled && (
            <CustomizedButton type="submit" label="Atualizar" />
          )}
          <CustomizedButton
            type="button"
            onClick={handleEnableDisableClick}
            label={isInputEnabled ? "Cancelar" : "Habilitar"}
          />
        </form>
      </CustomizedBox>
    </Modal>
  );
}

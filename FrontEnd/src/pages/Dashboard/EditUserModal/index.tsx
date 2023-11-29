import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import { Title } from "../../../components/Title";
import { TitledInput } from "../../../components/TitledInput";
import { useState } from "react";
import { authenticStore } from "../../../stores/authentic.store";
import { Button } from "../../../components/Button";
import { usePut } from "../../../services/usePut";

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
  const { user } = authenticStore;
  const { updateData } = usePut();

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

    if (!isEmailValid(formData.email)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    await updateData({
      url: `user/${user.id}`,
      data: formData,
      token: user.token,
    });

    handleClose();
  };

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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Modal de edição de usuario"
      aria-describedby="Nesse modal terá os dados de cadastro do instrumento"
    >
      <CustomizedBox>
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
              border: isInputEnabled ? "none" : "2px solid var(--SaddleBrown)",
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
              border: isInputEnabled ? "none" : "2px solid var(--SaddleBrown)",
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
              border: isInputEnabled ? "none" : "2px solid var(--SaddleBrown)",
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

import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import { Title } from "../../../components/Title";
import { TitledInput } from "../../../components/TitledInput";
import { useState } from "react";
import { authenticStore } from "../../../stores/authentic.store";
import { Button } from "../../../components/Button";
import { usePut } from "../../../services/usePut";
import { Instrument } from "../../type";

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

export default function EditInstrumentModal({
  open,
  handleClose,
  instrument,
}: {
  open: boolean;
  handleClose: () => void;
  instrument: Instrument;
}) {
  const { user } = authenticStore;
  const { updateData } = usePut();

  const { name, family, date } = instrument;

  const [formData, setFormData] = useState({
    name: name,
    family: family,
    date: date,
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Modal de edição de instrumento"
      aria-describedby="Nesse modal terá os dados de edição do instrumento"
    >
      <CustomizedBox>
        <Title>Edite os dados do instrumento selecionado:</Title>
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
            label={"Family"}
            type="text"
            placeholder="Email"
            name="family"
            value={formData.family}
            onChange={handleChange}
            disabled={!isInputEnabled}
            style={{
              border: isInputEnabled ? "none" : "2px solid var(--SaddleBrown)",
              color: isInputEnabled ? "black" : "gray",
            }}
            required
          />
          <TitledInput
            label={"Data de lançamento"}
            type="date"
            placeholder="01/01/2001"
            name="date"
            value={formData.date}
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

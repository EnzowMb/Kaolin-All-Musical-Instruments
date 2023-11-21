import { Modal, Box } from "@mui/material";
import { Title } from "../../../components/Title";
import styled from "styled-components";
import { TitledInput } from "../../../components/TitledInput";
import { useState } from "react";

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

export default function ModalCadastro({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    family: "",
  });

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
      aria-labelledby="Modal de cadastro de Instrumento"
      aria-describedby="Nesse modal terá os dados de cadastro do instrumento"
    >
      <CustomizedBox>
        <Title>Cadastre o instrumento inserindo os dados abaixo:</Title>
        <TitledInput
          label={"Nome"}
          type="text"
          placeholder="Insira o nome do Instrumento"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </CustomizedBox>
    </Modal>
  );
}

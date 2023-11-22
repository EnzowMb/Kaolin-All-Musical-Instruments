import {
  Modal,
  Box,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Title } from "../../../components/Title";
import styled from "styled-components";
import { TitledInput } from "../../../components/TitledInput";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { authenticStore } from "../../../stores/authentic.store";
import { usePost } from "../../../services/usePost";

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

const StyleSelect = styled(Select)`
  background: #f0f0f0;
  color: black;
  minwidth: 200;
  fontweight: 200;
  borderstyle: none;
  borderwidth: 2;
  borderradius: 12;
  paddingleft: 24;
  paddingtop: 14;
  paddingbottom: 15;
  boxshadow: 0px 5px 8px -3px rgba(0, 0, 0, 0.14);
  &:focus: {
    borderradius: 12;
    background: white;
    bordercolor: black;
  }
`;

const CustomizedButton = styled(Button)`
  width: 50%;
  display: block;
  margin: 1em auto;
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
  const { registerData } = usePost();
  const { user } = authenticStore;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeSelect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      formData.name === "" ||
      formData.family === "none" ||
      formData.family === ""
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    console.log(user.token);

    await registerData({
      url: "instrument/create",
      data: formData,
      token: user.token,
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
        <form onSubmit={handleSubmit}>
          <TitledInput
            label={"Nome"}
            type="text"
            placeholder="Insira o nome do Instrumento"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Familia</InputLabel>
            <StyleSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.family}
              name="family"
              label="Familia"
              onChange={handleChangeSelect}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              <MenuItem value="cordas">Cordas</MenuItem>
              <MenuItem value="madeiras">Madeiras</MenuItem>
              <MenuItem value="metais">Metais</MenuItem>
              <MenuItem value="percussao">Percussão</MenuItem>
            </StyleSelect>
          </FormControl>
          <CustomizedButton label="Cadastrar" />
        </form>
      </CustomizedBox>
    </Modal>
  );
}

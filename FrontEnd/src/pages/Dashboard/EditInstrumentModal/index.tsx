import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styled from "styled-components";
import { Title } from "../../../components/Title";
import { TitledInput } from "../../../components/TitledInput";
import { useEffect, useState } from "react";
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
  margin-bottom: 1em;
  boxshadow: 0px 5px 8px -3px rgba(0, 0, 0, 0.14);
  &:focus: {
    borderradius: 12;
    background: white;
    bordercolor: black;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: black;
  margin-bottom: 1em;
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

  const convertDateFormat = (inputDate: string) => {
    const [day, month, year] = inputDate.split("/");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    name: "",
    family: "",
    date: "",
    userEmail: "",
  });

  useEffect(() => {
    if (open) {
      const formattedDate = convertDateFormat(instrument.date);
      setFormData({
        name: instrument.name,
        family: instrument.family,
        date: formattedDate,
        userEmail: instrument.userEmail,
      });
    } else {
      setFormData({
        name: "",
        family: "",
        date: "",
        userEmail: "",
      });
    }
  }, [open, instrument]);

  const handleEnableDisableClick = () => {
    setIsInputEnabled(!isInputEnabled);
  };

  const [isInputEnabled, setIsInputEnabled] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      formData.name === "" ||
      formData.family === "none" ||
      formData.family === "" ||
      formData.date === ""
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const parts = formData.date.split("-");
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    console.log(formattedDate);
    formData.date = formattedDate;

    if (
      !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(formData.date)
    ) {
      alert("Por favor, insira um data valida!.");
      return;
    }

    await updateData({
      url: `instrument/${instrument.id}`,
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

  const handleChangeSelect = (e: SelectChangeEvent) => {
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
          <Label>Familia</Label>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Familia</InputLabel>
            <StyleSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.family}
              name="family"
              label="Familia"
              onChange={handleChangeSelect}
              style={{
                border: isInputEnabled
                  ? "none"
                  : "2px solid var(--SaddleBrown)",
                color: isInputEnabled ? "black" : "gray",
              }}
              disabled={!isInputEnabled}
              required
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

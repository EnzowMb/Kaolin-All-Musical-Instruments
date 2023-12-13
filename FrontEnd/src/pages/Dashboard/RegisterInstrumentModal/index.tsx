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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";

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
  margin-bottom: 1em;
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

const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: black;
  margin-bottom: 1em;
`;

export default function RegisterInstrumentModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const { registerData } = usePost();
  const { user } = authenticStore;
  // const [imgURL, setImgURL] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    family: "",
    date: "",
    description: "",
    img: "",
    userEmail: user.email,
  });
  const [progress, setProgress] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      formData.family === "" ||
      formData.date === "" ||
      formData.description === "" ||
      formData.img === ""
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

    // const fileInput = (event.target as HTMLFormElement)[0] as HTMLInputElement;
    // console.log("file " + fileInput);
    // const file = fileInput?.files?.[0];
    // console.log("file " + file);
    // if (!file) return;

    // const storageRef = ref(storage, `images/${file.name}`);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     setProgress(progress);
    //   },
    //   (error) => {
    //     alert(error);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //       setImgURL(url);
    //     });
    //   }
    // );

    console.log(user.token);

    await registerData({
      url: "instrument/create",
      data: formData,
      token: user.token,
    });

    handleClose();
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
            pattern="\d{2}-\d{2}-\d{4}"
            onChange={handleChangeDate}
          />
          <TitledInput
            label={"Descrição"}
            type="text"
            placeholder="..."
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TitledInput
            label={"Imagem"}
            type="file"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
          {/* {!imgURL && <progress value={progress} max="100" />}
          {imgURL && <img src={imgURL} alt="Imagem" />} */}
          <CustomizedButton label="Cadastrar" />
        </form>
      </CustomizedBox>
    </Modal>
  );
}

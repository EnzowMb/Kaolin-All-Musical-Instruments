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

  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState<File>();
  const [userEmail, setUserEmail] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    family: "",
    date: "",
    description: "",
    img: imgURL,
    userEmail: user.email,
  });
  const [progress, setProgress] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      name === "" ||
      family === "none" ||
      family === "" ||
      date === "" ||
      description === "" ||
      !imgURL
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const parts = date.split("-");
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    console.log(formattedDate);
    setDate(formattedDate);
    console.log(date);

    if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(date)) {
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

    console.log(imgURL);

    // await registerData({
    //   url: "instrument/create",
    //   data: formData,
    //   token: user.token,
    // });

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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label>Familia</Label>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Familia</InputLabel>
            <StyleSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={family}
              name="family"
              label="Familia"
              onChange={(e: SelectChangeEvent) => setFamily(e.target.value)}
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
            name="date"
            value={date}
            pattern="\d{2}-\d{2}-\d{4}"
            onChange={(e) => setDate(e.target.value)}
          />
          <TitledInput
            label={"Descrição"}
            type="text"
            placeholder="..."
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TitledInput
            label={"Imagem"}
            type="file"
            name="img"
            onChange={(e) => {
              setImgURL(
                e.currentTarget.files ? e.currentTarget.files[0] : undefined
              );
            }}
          />
          {/* {!imgURL && <progress value={progress} max="100" />}
          {imgURL && <img src={imgURL} alt="Imagem" />} */}
          <CustomizedButton label="Cadastrar" />
        </form>
      </CustomizedBox>
    </Modal>
  );
}

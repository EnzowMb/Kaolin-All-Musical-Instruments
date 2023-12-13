import styled from "styled-components";
import { Container } from "../../components/Container";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useState } from "react";
import RegisterModal from "./RegisterInstrumentModal";
import EditModal from "./EditUserModal";
import { authenticStore } from "../../stores/authentic.store";
import { InstrumentCard } from "../../components/InstrumentCard";
import { useDelete } from "../../services/useDelete";
import EditInstrumentModal from "./EditInstrumentModal";
import { Instrument } from "../type";

const UserContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomizedButton = styled(Button)`
  box-sizing: border-box;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border: 1px solid;
  margin: 1.5em;
  font-size: 1em;
  padding: 2em;
`;

const CardEdit = styled.div`
  display: block;
  background-image: linear-gradient(90deg, #e0c821 35%, #c6b832);
  padding: 1em;
  box-sizing: border-box;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border: 1px solid;
`;

export const Dashboard = () => {
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [openModalEditUser, setOpenModalEditUser] = useState(false);
  const [openModalEditInstrument, setOpenModalEditInstrument] = useState(false);
  const [instrumentEdit, setInstrumentEdit] = useState({
    id: "",
    name: "",
    family: "",
    date: "",
    description: "",
    userEmail: "",
  });

  const { user } = authenticStore;

  const { deleteData } = useDelete();

  const handleOpenRegister = () => {
    setOpenModalRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenModalRegister(false);
  };

  const handleOpenEditUser = () => {
    setOpenModalEditUser(true);
  };

  const handleCloseEditUser = () => {
    setOpenModalEditUser(false);
  };

  const handleOpenEditInstrument = (instrument: Instrument) => {
    setInstrumentEdit(instrument);
    console.log(instrument.name);
    setOpenModalEditInstrument(true);
  };

  const handleCloseEditInstrument = () => {
    setOpenModalEditInstrument(false);
  };

  const handleDelete = async (id: string) => {
    alert("Are you sure you want to delete");

    await deleteData({
      url: `instrument/${id}`,
      token: user.token,
    });
  };

  return (
    <UserContainer>
      <Title>Seus instrumentos</Title>
      <CardEdit>
        {user.instruments.map((instrument) => (
          <>
            <InstrumentCard
              name={instrument.name}
              family={instrument.family}
              date={instrument.date}
              description={instrument.description}
            />
            <CustomizedButton
              onClick={() => handleDelete(instrument.id)}
              label="Excluir"
            />
            <CustomizedButton
              onClick={() => handleOpenEditInstrument(instrument)}
              label="Editar"
            />
          </>
        ))}
      </CardEdit>
      <Title>Perfil do Usuario!</Title>
      <CustomizedButton
        onClick={() => handleOpenEditUser()}
        label="Editar Usuario"
      />
      <CustomizedButton
        onClick={() => handleOpenRegister()}
        label="Adicionar Instrumento"
      />
      <RegisterModal
        open={openModalRegister}
        handleClose={handleCloseRegister}
      />
      <EditModal open={openModalEditUser} handleClose={handleCloseEditUser} />
      <EditInstrumentModal
        open={openModalEditInstrument}
        handleClose={handleCloseEditInstrument}
        instrument={instrumentEdit}
      />
    </UserContainer>
  );
};

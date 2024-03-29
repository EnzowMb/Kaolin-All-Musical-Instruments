import styled from "styled-components";
import { Container } from "../../components/Container";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useState } from "react";
import RegisterModal from "./RegisterInstrumentModal";
import EditModal from "./EditUserModal";
import { InstrumentCard } from "../../components/InstrumentCard";
import { useDelete } from "../../services/useDelete";
import EditInstrumentModal from "./EditInstrumentModal";
import { Instrument } from "../type";
import { useAuth } from "../../contexts/authContext";
import React from "react";

const UserContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 4rem;
`;

const CustomizedButton = styled(Button)`
  box-sizing: border-box;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border: 1px solid;
  margin: 1.5em;
  font-size: 1em;
  padding: 1.5em;
`;

const CardEdit = styled.div`
  display: block;
  background-image: linear-gradient(
    50deg,
    var(--background-theme),
    var(--cor-principal)
  );
  padding: 1em;
  box-sizing: border-box;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  border: 1px solid;
  border-radius: 8px;
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
    img: "",
    userEmail: "",
  });

  const { user, loading, deleteInstrument } = useAuth();

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
    console.log(instrument);
    setOpenModalEditInstrument(true);
  };

  const handleCloseEditInstrument = () => {
    setOpenModalEditInstrument(false);
  };

  const handleDelete = async (id: string) => {
    alert("Are you sure you want to delete");

    if (user) {
      const response = await deleteData({
        url: `instrument/${id}`,
        token: user.acesstoken,
      });
      console.log(id);
      if (response?.status === 204) {
        deleteInstrument(id);
      }
    }
  };

  if (loading) return <></>;

  return (
    <UserContainer>
      <Title>Perfil do Usuario!</Title>
      <CustomizedButton
        onClick={() => handleOpenEditUser()}
        label="Editar Usuario"
      />
      <CustomizedButton
        onClick={() => handleOpenRegister()}
        label="Adicionar Instrumento"
      />
      <React.Suspense fallback={"Carregando..."}>
        <RegisterModal
          open={openModalRegister}
          handleClose={handleCloseRegister}
        />
      </React.Suspense>
      <EditModal open={openModalEditUser} handleClose={handleCloseEditUser} />
      <EditInstrumentModal
        open={openModalEditInstrument}
        handleClose={handleCloseEditInstrument}
        instrument={instrumentEdit}
      />

      {user?.instruments.length !== 0 ? (
        <>
          <Title>Seus instrumentos</Title>
          <CardEdit>
            {user &&
              user.instruments.map((instrument, index) => (
                <React.Fragment key={index}>
                  <InstrumentCard
                    name={instrument.name}
                    family={instrument.family}
                    date={instrument.date}
                    description={instrument.description}
                    img={instrument.img}
                  />
                  <CustomizedButton
                    onClick={() => handleDelete(instrument.id)}
                    label="Excluir"
                  />
                  <CustomizedButton
                    onClick={() => handleOpenEditInstrument(instrument)}
                    label="Editar"
                  />
                </React.Fragment>
              ))}
          </CardEdit>
        </>
      ) : (
        <Title>Nenhum instrumento cadastrado para este usuario</Title>
      )}
    </UserContainer>
  );
};

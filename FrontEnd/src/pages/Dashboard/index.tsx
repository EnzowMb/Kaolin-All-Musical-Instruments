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

export const Dashboard = () => {
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const { user } = authenticStore;

  const { deleteData } = useDelete();

  const handleOpenRegister = () => {
    setOpenModalRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenModalRegister(false);
  };

  const handleOpenEdit = () => {
    setOpenModalEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenModalEdit(false);
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
      <div>
        {user.instruments.map((instrument) => (
          <>
            <InstrumentCard
              name={instrument.name}
              family={instrument.family}
              date={instrument.date}
            />
            <CustomizedButton
              onClick={() => handleDelete(instrument.id)}
              label="Excluir"
            />
          </>
        ))}
      </div>
      <Title>Perfil do Usuario!</Title>
      <CustomizedButton
        onClick={() => handleOpenEdit()}
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
      <EditModal open={openModalEdit} handleClose={handleCloseEdit} />
    </UserContainer>
  );
};

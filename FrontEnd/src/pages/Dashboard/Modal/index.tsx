import { Modal, Box } from "@mui/material";
import { Title } from "../../../components/Title";
import styled from "styled-components";

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
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Modal de cadastro do especialista"
      aria-describedby="Nesse modal terá os dados de cadastro do especialista"
    >
      <CustomizedBox>
        <Title>Cadastre o especialista inserindo os dados abaixo:</Title>
      </CustomizedBox>
    </Modal>
  );
}

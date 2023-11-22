import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import { Title } from "../../../components/Title";

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

export default function EditUserModal({
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
      aria-labelledby="Modal de edição de usuario"
      aria-describedby="Nesse modal terá os dados de cadastro do instrumento"
    >
      <CustomizedBox>
        <Title>Edite os dados do usuario:</Title>
      </CustomizedBox>
    </Modal>
  );
}

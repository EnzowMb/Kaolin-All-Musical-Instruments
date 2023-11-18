import "./UserHeader.css";
import UserLogo from "../../Img/User-Logo.png";
import { authenticStore } from "../../stores/authentic.store";
import styled from "styled-components";

const StyledLink = styled.a`
  font-weight: 400;
  color: blue;
`;

const StyledLinkLogout = styled(StyledLink)`
  font-weight: 400;
  text-decoration: none;
  color: blue;
`;

const StyledButton = styled.a`
  background-color: blue;
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--branco);
  text-decoration: none;
`;

export const UserHeader = () => {
  const handleLogout = () => {
    authenticStore.logout();
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="gif-container">
        <img className="userLogo" src={UserLogo} alt="USER-LOGO" />
      </div>
      {authenticStore.isAuthentic ? (
        <>
          Bem vindo!
          <StyledLink href="/" onClick={handleLogout}>
            Sair
          </StyledLink>
        </>
      ) : (
        <>
          <StyledLinkLogout href="/register-user">Cadastre-se</StyledLinkLogout>
          <StyledButton href="/login">Entrar</StyledButton>
        </>
      )}
    </div>
  );
};

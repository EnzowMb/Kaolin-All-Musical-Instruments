import { authenticStore } from "../../stores/authentic.store";
import styled from "styled-components";
import userLogo from "../../Img/User-Logo.png";
import { Link } from "react-router-dom";

const StyledLink = styled.a`
  font-weight: 400;
  color: blue;
`;

const StyledButton = styled.a`
  background-color: var(--MistyRose);
  border-radius: 8px;
  padding: 12px 16px;
  color: black;
  text-decoration: none;
  transition: background-color 0.3s;
  margin: 0.3em;
  &:hover {
    background-color: var(--Thistle);
  }
`;

const UserLogo = styled.img`
  width: 50%;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
    /* content: url("../../Img/User-Logo-gif.gif"); */
  }
`;

export const UserHeader = () => {
  const handleLogout = () => {
    authenticStore.logout();
  };
  const { user } = authenticStore;

  return (
    <div>
      <Link to="/dashboard">
        <UserLogo src={userLogo} alt="USER-LOGO" />
      </Link>
      {authenticStore.isAuthentic ? (
        <div>
          <p>Bem vindo! {user.email}</p>
          <StyledLink href="/" onClick={handleLogout}>
            Sair
          </StyledLink>
        </div>
      ) : (
        <div>
          <StyledButton href="/login">Entrar</StyledButton>
          <StyledButton href="/register-user">Cadastre-se</StyledButton>
        </div>
      )}
    </div>
  );
};

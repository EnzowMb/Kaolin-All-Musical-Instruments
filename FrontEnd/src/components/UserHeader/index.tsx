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
  background-color: var(--MistyRose);
  border-radius: 8px;
  padding: 12px 16px;
  color: black;
  text-decoration: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--Thistle);
  }
`;

export const UserHeader = () => {
  const handleLogout = () => {
    authenticStore.logout();
  };
  const { user } = authenticStore;

  return (
    <div>
      {authenticStore.isAuthentic ? (
        <>
          <p>Bem vindo! {user.email}</p>
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

import logo from "./assets/Logo.png";
import userLogo from "../../Img/User-Logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { authenticStore } from "../../stores/authentic.store";

const textOptions = ["CORDAS", "MADEIRAS", "METAIS", "PERCUSSAO"];

const HeaderContainer = styled.header`
  background-color: var(--Khaki);
  display: flex;
  align-items: center;
  padding: 2em 4em;
`;

const LogoHeader = styled.img`
  margin-right: 1em;
  width: 50%;
  border-radius: 2em;
  border: 2px solid black;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 0.1;
`;

const Options = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

const Option = styled.li`
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 5px;
  cursor: pointer;
  min-width: 120px;
`;

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

const Header = () => {
  const handleLogout = () => {
    authenticStore.logout();
  };
  const { user } = authenticStore;

  return (
    <HeaderContainer>
      <Container>
        <Link to="/">
          <LogoHeader src={logo} alt="logo Kaolin" />
        </Link>
        <Options>
          {textOptions.map((text) => (
            <Link to={`${text.toLowerCase().split(" ").join("")}`}>
              <Option>
                <p>{text}</p>
              </Option>
            </Link>
          ))}
        </Options>
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
      </Container>
    </HeaderContainer>
  );
};

export default Header;

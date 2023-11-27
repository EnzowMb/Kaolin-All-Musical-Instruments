import logo from "./assets/Logo.png";
import userLogo from "./assets/User-Logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { authenticStore } from "../../stores/authentic.store";

const textOptions = ["CORDAS", "MADEIRAS", "METAIS", "PERCUSSAO"];

const HeaderContainer = styled.header`
  background-color: var(--Khaki);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2em 2em;
`;

const LogoHeader = styled.img`
  width: 200px;
  border-radius: 2em;
  border: 2px solid black;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 0.1;
`;

const Options = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  list-style-type: none;
`;

const Option = styled.li`
  font-size: 1.5em;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 5px;
  cursor: pointer;
  min-width: 120px;
`;

const StyledLink = styled.a`
  font-weight: 400;
  color: var(--HoneyDew);
  text-decoration: none;
  padding: 0.5em 1.5em;
  border-radius: 1em;
  background-color: var(--SaddleBrown);
  &:hover {
    color: var(--MistyRose);
  }
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
  width: 220px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.025);
    /* content: url("../../Img/User-Logo-gif.gif"); */
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const UserOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 1em 2em;
  border-radius: 2em;
  font-size: 1em;
`;

const Header = () => {
  const handleLogout = () => {
    authenticStore.logout();
  };
  const { user } = authenticStore;

  return (
    <HeaderContainer>
      <Link to="/">
        <LogoHeader src={logo} alt="logo Kaolin" />
      </Link>
      <Container>
        <Options>
          {textOptions.map((text) => (
            <Link
              to={`${text.toLowerCase().split(" ").join("")}`}
              style={{ textDecoration: "none" }}
            >
              <Option>
                <p>{text}</p>
              </Option>
            </Link>
          ))}
        </Options>
      </Container>
      <UserContainer>
        <Link to="/dashboard">
          <UserLogo src={userLogo} alt="USER-LOGO" />
        </Link>
        {authenticStore.isAuthentic ? (
          <UserOptions>
            <p>Bem vindo {user.name}!</p>
            <StyledLink href="/" onClick={handleLogout}>
              Sair
            </StyledLink>
          </UserOptions>
        ) : (
          <div>
            <StyledButton href="/login">Entrar</StyledButton>
            <StyledButton href="/register-user">Cadastre-se</StyledButton>
          </div>
        )}
      </UserContainer>
    </HeaderContainer>
  );
};

export default Header;

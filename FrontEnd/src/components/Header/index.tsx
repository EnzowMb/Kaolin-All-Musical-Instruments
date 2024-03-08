import styled from "styled-components";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { isMobile } from "react-device-detect";

import logo from "./assets/Logo.png";
import userLogo from "./assets/User-Logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const textOptions = ["CORDAS", "MADEIRAS", "METAIS", "PERCUSSAO"];

const items: MenuProps["items"] = [
  {
    label: <a href="/cordas">Cordas</a>,
    key: "0",
  },
  {
    label: <a href="/madeiras">Madeiras</a>,
    key: "1",
  },
  {
    label: <a href="/madeiras">Metais</a>,
    key: "2",
  },
  {
    label: <a href="/madeiras">Percussão</a>,
    key: "3",
  },
];

const HeaderContainer = styled.header`
  background-color: var(--cor-principal);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2em 2em;
  @media (max-width: 700px) {
    padding: 1em 1em;
  }
`;

const LogoHeader = styled.img`
  width: 200px;
  border-radius: 2em;
  border: 2px solid black;
  @media (max-width: 700px) {
    width: 150px;
  }
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
  padding: 0;
`;

const Option = styled.li`
  font-size: 1.5em;
  align-items: center;
  text-align: center;
  list-style: none;
  display: inline-block;
  margin: 0 8px;
  cursor: pointer;
  min-width: 120px;
  &:after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: var(--cor-secundaria);
    transition: width 0.3s;
  }
  &:hover {
    color: #000;
  }
  &:hover::after {
    width: 100%;
    //transition: width .3s;
  }
  a {
    text-decoration: none;
    font-size: 1.5rem;

    &:visited {
      color: #000;
    }
  }
`;

const TextOption = styled.p`
  display: inline-block;
`;

const StyledLink = styled.a`
  font-weight: 400;
  color: var(--HoneyDew);
  text-decoration: none;
  padding: 0.5em 1.5em;
  border-radius: 1em;
  background-color: var(--cor-secundaria);
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

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const UserLogo = styled.img`
  width: 14rem;
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
  @media (max-width: 700px) {
    padding: 1rem;
  }
`;

const DropdownStyled = styled(Dropdown)`
  padding: 1rem;
  background-color: var(--PaleGoldenrod);
  border: 2px solid var(--cor-secundaria);
  border-radius: 8px;
`;

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  console.log(isMobile);

  return (
    <HeaderContainer>
      {isMobile ? (
        <>
          <Link to="/">
            <LogoHeader src={logo} alt="logo Kaolin" />
          </Link>
          <DropdownStyled menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Instrumentos
                <DownOutlined />
              </Space>
            </a>
          </DropdownStyled>
          {user ? (
            <UserOptions>
              <p>Bem vindo {user.name}!</p>
              <StyledLink href="/" onClick={handleLogout}>
                Sair
              </StyledLink>
            </UserOptions>
          ) : (
            <ButtonArea>
              <StyledButton href="/login">Entrar</StyledButton>
              <StyledButton href="/register-user">Cadastre-se</StyledButton>
            </ButtonArea>
          )}
        </>
      ) : (
        <>
          <Link to="/">
            <LogoHeader src={logo} alt="logo Kaolin" />
          </Link>
          <Container>
            <Options>
              {textOptions.map((text) => (
                <Link
                  to={`${text.toLowerCase().split(" ").join("")}`}
                  style={{ textDecoration: "none" }}
                  key={text}
                >
                  <Option>
                    <TextOption>{text}</TextOption>
                  </Option>
                </Link>
              ))}
            </Options>
          </Container>
          <UserContainer>
            <Link to="/dashboard">
              <UserLogo src={userLogo} alt="USER-LOGO" />
            </Link>
            {user ? (
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
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;

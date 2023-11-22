import logo from "./assets/Logo.png";
import userLogo from "../../Img/User-Logo.png";
import { OpcaoHeader } from "../OptionsHeader";
import { Link } from "react-router-dom";
import { UserHeader } from "../UserHeader";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: var(--Khaki);
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  justify-content: space-around;
  flex-grow: 0.1;
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
  return (
    <HeaderContainer>
      <Container>
        <Link to="/">
          <LogoHeader src={logo} alt="logo Kaolin" />
        </Link>
        <OpcaoHeader />
        <UserHeader />
        <Link to="/dashboard">
          <UserLogo src={userLogo} alt="USER-LOGO" />
        </Link>
      </Container>
    </HeaderContainer>
  );
};

export default Header;

import logo from "./assets/Logo.png";
import { OpcaoHeader } from "../OptionsHeader";
import { Link } from "react-router-dom";
import { UserHeader } from "../UserHeader";
import styled from "styled-components";

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

const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <Link to="/">
          <LogoHeader src={logo} alt="logo Kaolin" />
        </Link>
        <OpcaoHeader />
        <UserHeader />
      </Container>
    </HeaderContainer>
  );
};

export default Header;

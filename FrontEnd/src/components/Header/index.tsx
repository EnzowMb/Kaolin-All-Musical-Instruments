import logo from "./assets/Logo.png";
import { OpcaoHeader } from "../OptionsHeader";
import { Link } from "react-router-dom";
import "./header.css";
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

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <LogoHeader src={logo} alt="logo Kaolin" />
      </Link>
      <OpcaoHeader />
      <Link to="/dashboard">
        <UserHeader />
      </Link>
    </HeaderContainer>
  );
};

export default Header;

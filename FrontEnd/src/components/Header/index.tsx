import logo from "./assets/Logo.png";
import { OpcaoHeader } from "../OptionsHeader";
import { Link } from "react-router-dom";
import { UserHeader } from "../UserHeader";
import styled from "styled-components";

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

const Header = () => {
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
        <UserHeader />
      </Container>
    </HeaderContainer>
  );
};

export default Header;

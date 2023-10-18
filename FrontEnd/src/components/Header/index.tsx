import { LogoHeader } from "../LogoHeader";
import { OpcaoHeader } from "../OptionsHeader";
import "./header.css";

// const HeaderContainer = styled.header`
//   background-color: #fcdc7b;
//   display: flex;
//   justify-content: center;
// `;

const Header = () => {
  return (
    <header className="header">
      <LogoHeader />
      <OpcaoHeader />
    </header>
  );
};

export default Header;

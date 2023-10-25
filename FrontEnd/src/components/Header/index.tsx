import { LogoHeader } from "../LogoHeader";
import { OpcaoHeader } from "../OptionsHeader";
import { Link } from "react-router-dom";
import "./header.css";

// const HeaderContainer = styled.header`
//   background-color: #fcdc7b;
//   display: flex;
//   justify-content: center;
// `;

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <LogoHeader />
      </Link>
      <OpcaoHeader />
    </header>
  );
};

export default Header;

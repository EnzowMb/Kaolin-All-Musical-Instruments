import { LogoHeader } from "../LogoHeader";
import { OpcaoHeader } from "../OptionsHeader";
import { Link } from "react-router-dom";
import "./header.css";
import { UserHeader } from "../UserHeader";

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
      <Link to="/">
        <UserHeader />
      </Link>
    </header>
  );
};

export default Header;

import "./logoHeader.css";
import Logo from "../../Img/Logo.png";

// const Icones = styled.ul`
//     display: flex;
//     align-items: center;
// `

// const Icone = styled.img`
//     margin-right: 25px;
//     width: 80px;
//     border-radius: 30px;
// `

export const LogoHeader = () => {
  return (
    <div className="logo">
      <img className="img" src={Logo} alt="Logo Kaolin" />
    </div>
  );
};

import "./UserHeader.css";
import UserLogo from "../../Img/User-Logo.png";

export const UserHeader = () => {
  return (
    <div className="gif-container">
      <img className="userLogo" src={UserLogo} alt="USER-LOGO" />
    </div>
  );
};

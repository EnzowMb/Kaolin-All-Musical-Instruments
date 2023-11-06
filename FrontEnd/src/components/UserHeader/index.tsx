import "./UserHeader.css";
import UserLogo from "../../Img/User-Logo.png";
import { Link } from "react-router-dom";
import { useUserState } from "../../context/UserStore";

export const UserHeader = () => {
  const { user } = useUserState();

  console.log(user);

  return (
    <div className="flex flex-col justify-center">
      <div className="gif-container">
        <img className="userLogo" src={UserLogo} alt="USER-LOGO" />
      </div>
      <div>
        {user.name === undefined ? (
          <ul className="options">
            <Link to="/login">
              <li className="option">
                <p>Entrar</p>
              </li>
            </Link>
            <Link to="/register-user">
              <li className="option">
                <p>Cadastrar</p>
              </li>
            </Link>
          </ul>
        ) : (
          <>
            <p>{user.name}</p>
          </>
        )}
      </div>
    </div>
  );
};

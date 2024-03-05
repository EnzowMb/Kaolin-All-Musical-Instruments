import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { authenticStore } from "../stores/authentic.store";
import axios from "axios";

type AuthContextProps = {
  login: (data: ILogin) => Promise<void>;
  logout: () => void;
  user: IUsuario | null;
  loading: boolean;
};

const defaultValues: AuthContextProps = {
  login: async () => {},
  logout: () => {},
  user: null,
  loading: true,
};

const AuthContext = createContext(defaultValues);

type AuthProviderProps = {
  children: ReactNode;
};

interface ILogin {
  email: string;
  password: string;
}

interface IUsuario {
  id: string;
  name: string;
  email: string;
  password: string;
  acesstoken: string;
  instruments: any[];
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUsuario | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const login = async (data: ILogin) => {
    const { data: response, status } = await axios.post(
      "http://localhost:8000/login",
      data
    );
    if (status === 200) {
      const userString = JSON.stringify({ ...response, ...data });
      localStorage.setItem("user", userString);
      setUser({ ...response, ...data });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");

    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      setUser(user);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Instrument } from "../pages/type";

type AuthContextProps = {
  login: (data: ILogin) => Promise<void>;
  logout: () => void;
  user: IUsuario | null;
  loading: boolean;
  createInstrument: (data: Instrument) => Promise<void>;
  updateInstrument: (id: string, data: Instrument) => Promise<void>;
  deleteInstrument: (id: string) => Promise<void>;
  updateUser: (id: string, data: IUsuario) => Promise<void>;
};

const defaultValues: AuthContextProps = {
  login: async () => {},
  logout: () => {},
  user: null,
  loading: true,
  createInstrument: async () => {},
  updateInstrument: async () => {},
  deleteInstrument: async () => {},
  updateUser: async () => {},
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
  instruments: Instrument[];
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUsuario | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const login = async (data: ILogin) => {
    const { data: response, status } = await axios.post(
      "https://kaolin-all-instruments.uc.r.appspot.com/login",
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

  const createInstrument = async (data: Instrument) => {
    if (user) {
      const instruments = user?.instruments || [];
      const instrument = { ...data, userEmail: user.email };
      instruments?.push(instrument);
      setUser({ ...user, instruments });
      localStorage.setItem("user", JSON.stringify({ ...user, instruments }));
    }
  };

  const updateInstrument = async (id: string, data: Instrument) => {
    if (user) {
      const instruments = user?.instruments || [];
      const newArrayInstruments = instruments?.flatMap((item) => {
        if (item.id === id) {
          return { ...data, userEmail: user.email, id };
        }
        return item;
      });
      setUser({ ...user, instruments: newArrayInstruments });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, instruments: newArrayInstruments })
      );
    }
  };

  const deleteInstrument = async (id: string) => {
    if (user) {
      const instruments = user?.instruments || [];
      console.log(id);
      const newArrayInstruments = instruments?.filter((item) => item.id !== id);
      setUser({ ...user, instruments: newArrayInstruments });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, instruments: newArrayInstruments })
      );
    }
  };

  const updateUser = async (id: string, data: IUsuario) => {
    if (user) {
      setUser({ ...user, name: data.name, email: data.email });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, name: data.name, email: data.email })
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        loading,
        createInstrument,
        updateInstrument,
        deleteInstrument,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

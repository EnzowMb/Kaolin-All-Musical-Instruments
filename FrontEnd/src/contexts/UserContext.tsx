import { User } from "../pages/type";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
  user: {
    name: "",
    email: "",
    password: "",
  },
  setUser: (user: User) => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

type UserProvideProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProvideProps) {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

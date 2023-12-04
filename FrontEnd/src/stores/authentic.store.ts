import { action, makeObservable, observable } from "mobx";

interface IUsuario {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  instruments: Instrument[];
}

interface Instrument {
  id: string;
  name: string;
  family: string;
  date: string;
  userEmail: string;
}

class AuthenticStore {
  isAuthentic = false;
  user: IUsuario = {
    email: "",
    password: "",
    token: "",
    name: "",
    id: "",
    instruments: [],
  };

  constructor() {
    makeObservable(this, {
      isAuthentic: observable,
      user: observable,
      login: action,
      logout: action,
    });
  }

  login({ email, password, token, name, id, instruments }: IUsuario) {
    this.isAuthentic = true;
    this.user = { email, password, token, name, id, instruments };
  }

  logout() {
    this.isAuthentic = false;
    this.user = {
      email: "",
      password: "",
      token: "",
      name: "",
      id: "",
      instruments: [],
    };
  }
}

export const authenticStore = new AuthenticStore();

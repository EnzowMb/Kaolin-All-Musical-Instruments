import { action, makeObservable, observable } from "mobx";

interface IUsuario {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
}

class AuthenticStore {
  isAuthentic = false;
  user: IUsuario = { email: "", password: "", token: "", name: "", id: "" };

  constructor() {
    makeObservable(this, {
      isAuthentic: observable,
      user: observable,
      login: action,
      logout: action,
    });
  }

  login({ email, password, token, name, id }: IUsuario) {
    this.isAuthentic = true;
    this.user = { email, password, token, name, id };
  }

  logout() {
    this.isAuthentic = false;
    this.user = { email: "", password: "", token: "", name: "", id: "" };
  }
}

export const authenticStore = new AuthenticStore();

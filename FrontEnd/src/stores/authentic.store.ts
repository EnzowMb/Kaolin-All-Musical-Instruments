import { action, makeObservable, observable } from "mobx";

interface IUsuario {
  name: string;
  email: string;
  token: string;
}

class AuthenticStore {
  isAuthentic = false;
  user: IUsuario = { name: "", email: "", token: "" };

  constructor() {
    makeObservable(this, {
      isAuthentic: observable,
      user: observable,
      login: action,
      logout: action,
    });
  }

  login({ email, token, name }: IUsuario) {
    this.isAuthentic = true;
    this.user = { email, token, name };
  }

  logout() {
    this.isAuthentic = false;
    this.user = { name: "", email: "", token: "" };
  }
}

export const authenticStore = new AuthenticStore();

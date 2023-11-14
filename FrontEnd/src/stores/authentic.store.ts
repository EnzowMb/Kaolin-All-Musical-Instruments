import { action, makeObservable, observable } from "mobx";

interface IUsuario {
  email: string;
  token: string;
}

class AuthenticStore {
  isAuthentic = false;
  user: IUsuario = { email: "", token: "" };

  constructor() {
    makeObservable(this, {
      isAuthentic: observable,
      user: observable,
      login: action,
      logout: action,
    });
  }

  login({ email, token }: IUsuario) {
    this.isAuthentic = true;
    this.user = { email, token };
  }

  logout() {
    this.isAuthentic = false;
    this.user = { email: "", token: "" };
  }
}

export const authenticStore = new AuthenticStore();

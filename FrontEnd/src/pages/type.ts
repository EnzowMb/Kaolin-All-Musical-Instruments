export interface Instrument {
  id: string;
  name: string;
  family: string;
  date: string;
  userEmail: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

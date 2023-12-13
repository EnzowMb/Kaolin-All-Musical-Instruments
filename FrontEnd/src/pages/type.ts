export interface Instrument {
  id: string;
  name: string;
  family: string;
  date: string;
  description: string;
  userEmail: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

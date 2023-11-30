import { Instrument } from './InstrumentModel';

export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private id?: string,
    private instruments?: Instrument[]
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.instruments = instruments;
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getInstruments() {
    return this.instruments;
  }
}

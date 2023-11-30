import { EfamilyInstrument } from './EfamilyInstrument';

export class Instrument {
  constructor(
    private name: string,
    private family: EfamilyInstrument,
    private date: string,
    private userEmail: string,
    private id?: string
  ) {
    this.name = name;
    this.family = family;
    this.date = date;
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  getFamily(): EfamilyInstrument {
    return this.family;
  }

  getDate(): string {
    return this.date;
  }

  getUserEmail() {
    return this.userEmail;
  }
}

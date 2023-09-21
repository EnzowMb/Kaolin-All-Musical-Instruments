import { EfamilyInstrument } from './EfamilyInstrument';

export class Instrument {
  constructor(private name: string, private family: EfamilyInstrument) {
    this.name = name;
    this.family = family;
  }

  getName(): string {
    return this.name;
  }

  getFamily(): EfamilyInstrument {
    return this.family;
  }
}

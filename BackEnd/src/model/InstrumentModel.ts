import { EfamilyInstrument } from './EfamilyInstrument';

export class Instrument {
  constructor(
    private name: string,
    private family: EfamilyInstrument,
    private id?: string
  ) {
    this.name = name;
    this.family = family;
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  getFamily(): EfamilyInstrument {
    return this.family;
  }
}

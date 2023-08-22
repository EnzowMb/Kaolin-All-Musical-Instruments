import { EfamilyInstrument } from './EfamilyInstrument';

export class Instrument {
  constructor(private name: string, private familia: EfamilyInstrument) {
    this.name = name;
    this.familia = familia;
  }

  getName(): string {
    return this.name;
  }

  getFamilia(): EfamilyInstrument {
    return this.familia;
  }
}

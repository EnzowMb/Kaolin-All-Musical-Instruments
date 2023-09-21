import { Instrument } from '../model/InstrumentModel';
import { instrumentRepository } from '../repositories/InstrumentRepository';

export class InstrumentService {
  createInstrument = (instrument: Instrument) => {
    return instrumentRepository.create({
      data: {
        name: instrument.getName(),
        family: instrument.getFamily(),
      },
      select: {
        id: false,
        name: true,
        family: true,
      },
    });
  };

  getAllInstrument = () => {
    return instrumentRepository.findMany();
  };
}

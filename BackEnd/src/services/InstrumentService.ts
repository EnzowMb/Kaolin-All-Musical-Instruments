import { EfamilyInstrument } from '../model/EfamilyInstrument';
import { Instrument } from '../model/InstrumentModel';
import { instrumentRepository } from '../repositories/InstrumentRepository';

export class InstrumentService {
  createInstrument = async (instrument: Instrument) => {
    return await instrumentRepository.create({
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

  getInstrumentFilterString = async (string: EfamilyInstrument) => {
    return instrumentRepository.findMany({ where: { family: string } });
  };
}

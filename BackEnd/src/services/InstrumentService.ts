import { EfamilyInstrument } from '../model/EfamilyInstrument';
import { Instrument } from '../model/InstrumentModel';
import { instrumentRepository } from '../repositories/InstrumentRepository';

export class InstrumentService {
  createInstrument = async (instrument: Instrument) => {
    return await instrumentRepository.create({
      data: {
        name: instrument.getName(),
        family: instrument.getFamily(),
        date: instrument.getDate(),
      },
      select: {
        id: false,
        name: true,
        family: true,
        date: true,
      },
    });
  };

  updateInstrument = async (instrumentID: string, instrument: Instrument) => {};

  deleteInstrument = async (instrumentID: string) => {};

  getAllInstrument = async () => {
    return await instrumentRepository.findMany();
  };

  getInstrumentFilterString = async (
    string: EfamilyInstrument,
    limit: number,
    page: number
  ) => {
    return await instrumentRepository.findMany({
      where: { family: string },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        name: 'desc',
      },
    });
  };
}

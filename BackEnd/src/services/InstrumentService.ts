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
        user: {
          connect: {
            email: instrument.getUserEmail(),
          },
        },
      },
      select: {
        id: false,
        name: true,
        family: true,
        date: true,
        user: true,
      },
    });
  };

  updateInstrument = async (instrumentID: string, instrument: Instrument) => {
    return instrumentRepository.update({
      where: { id: instrumentID },
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

  deleteInstrument = async (instrumentID: string) => {
    return instrumentRepository.delete({
      where: { id: instrumentID },
    });
  };

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

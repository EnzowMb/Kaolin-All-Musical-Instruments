import { Request, Response } from 'express';
import { InstrumentType, Validation } from '../services/Validation';
import { Instrument } from '../model/InstrumentModel';
import { instrumentRepository } from '../repositories/InstrumentRepository';

export class InstrumentController {
  createInstrument = async (req: Request, res: Response) => {
    try {
      const { name, family } = req.body as InstrumentType;
      Validation.InstrumentSchema.parse({ name: name, family: family });
      const instrumentModel = new Instrument(name, family);
      const newInstrument = await instrumentRepository.create({
        data: {
          name: instrumentModel.getName(),
          family: instrumentModel.getFamily(),
        },
      });
      return res.status(201).json(newInstrument);
    } catch (error: any) {
      return res.json(error);
    }
  };
}

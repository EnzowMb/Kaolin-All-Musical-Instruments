import { Request, Response } from 'express';
import { InstrumentType, Validation } from '../services/Validation';
import { Instrument } from '../model/InstrumentModel';

export class InstrumentController {
  createInstrument = (req: Request, res: Response) => {
    try {
      const { name, family } = req.body as InstrumentType;
      Validation.InstrumentSchema.parse({ name: name, family: family });
      const instrumentModel = new Instrument(name, family);
      return res.json({ message: instrumentModel.getName() });
    } catch (error: any) {
      return res.json(error);
    }
  };
}

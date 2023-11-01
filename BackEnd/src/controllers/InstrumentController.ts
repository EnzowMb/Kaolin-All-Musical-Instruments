import { Request, Response, NextFunction } from 'express';
import { InstrumentType, Validation } from '../services/Validation';
import { Instrument } from '../model/InstrumentModel';
import { InstrumentService } from '../services/InstrumentService';
import { EfamilyInstrument } from '../model/EfamilyInstrument';
import { instrumentRepository } from '../repositories/InstrumentRepository';

export class InstrumentController {
  instrumentService: InstrumentService;

  constructor(instrumentService = new InstrumentService()) {
    this.instrumentService = instrumentService;
  }

  createInstrument = async (req: Request, res: Response) => {
    try {
      const { name, family } = req.body as InstrumentType;
      Validation.InstrumentSchema.parse({ name: name, family: family });
      const instrumentModel = new Instrument(name, family);
      const newInstrument = await this.instrumentService.createInstrument(
        instrumentModel
      );
      return res.status(201).json(newInstrument);
    } catch (error: any) {
      return res.json(error);
    }
  };

  getAllInstrument = async (req: Request, res: Response) => {
    try {
      const instruments = await this.instrumentService.getAllInstrument();
      res.status(200).json(instruments);
    } catch (error) {
      return res.json(error);
    }
  };

  getInstrumentFilterString = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { string } = req.query;

      EfamilyInstrument[string as keyof typeof EfamilyInstrument];

      if (!Object.keys(EfamilyInstrument).includes(string as EfamilyInstrument))
        throw new Error('category not found');

      if (string !== null) {
        const instrumentsResult =
          await this.instrumentService.getInstrumentFilterString(
            string as EfamilyInstrument
          );

        (req as any).result = instrumentsResult;
        (req as any).string = string;

        next();
        //res.status(200).json(instrumentsResult);
      }
    } catch (error) {
      return res.json(error);
    }
  };
}

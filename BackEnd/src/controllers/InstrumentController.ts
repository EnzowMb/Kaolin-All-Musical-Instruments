import { Request, Response, NextFunction } from 'express';
import { InstrumentType, Validation } from '../services/Validation';
import { Instrument } from '../model/InstrumentModel';
import { InstrumentService } from '../services/InstrumentService';

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

  getInstrumentFilter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const search = processSearch(req.query);
    } catch (error) {
      return res.json(error);
    }
  };
}

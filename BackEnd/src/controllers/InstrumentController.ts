import { Request, Response, NextFunction } from 'express';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import { InstrumentType, Validation } from '../services/Validation';
import { Instrument } from '../model/InstrumentModel';
import { InstrumentService } from '../services/InstrumentService';
import { EfamilyInstrument } from '../model/EfamilyInstrument';
import { storage } from '../config/firebase';

export class InstrumentController {
  instrumentService: InstrumentService;

  constructor(instrumentService = new InstrumentService()) {
    this.instrumentService = instrumentService;
  }

  createInstrument = async (req: Request, res: Response) => {
    try {
      const { name, family, date, userEmail, description } =
        req.body as InstrumentType;

      const dateTime = giveCurrentDateTime();

      const storageRef = ref(
        storage,
        `files/${req.file?.originalname + '  ' + dateTime}`
      );

      //Create file metadata including the content type
      const metadata = {
        contentType: req.file?.mimetype,
      };

      //Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file?.buffer as Buffer,
        metadata
      );
      //by using uploadBytesResumable we can control the progress of uploading like pause, resume, etc

      //Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log('File sucessfully uploaded');

      Validation.InstrumentSchema.parse({
        name: name,
        family: family,
        date: date,
        userEmail: userEmail,
        description: description,
        img: downloadURL,
      });

      const instrumentModel = new Instrument(
        name,
        family,
        date,
        userEmail,
        description,
        downloadURL
      );

      const newInstrument = await this.instrumentService.createInstrument(
        instrumentModel
      );
      return res.status(201).json(newInstrument);
    } catch (error: any) {
      return res.json(error);
    }
  };

  updateInstrument = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { name, family, date, userEmail, description } =
        req.body as InstrumentType;

      Validation.InstrumentSchema.parse({
        name: name,
        family: family,
        date: date,
        userEmail: userEmail,
        description: description,
      });

      const instrumentModel = new Instrument(
        name,
        family,
        date,
        userEmail,
        description
      );

      const updatedInstrument = await this.instrumentService.updateInstrument(
        id,
        instrumentModel
      );

      return res.status(202).json(updatedInstrument);
    } catch (error: any) {
      return res.json(error);
    }
  };

  deleteInstrument = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await this.instrumentService.deleteInstrument(id);

      res.status(204).send({ message: 'Instrumento deletado com sucesso!' });
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

      let { limit = 5, page = 1 } = req.query;

      limit = parseInt(limit as string, 10);
      page = parseInt(page as string, 10);

      EfamilyInstrument[string as keyof typeof EfamilyInstrument];

      if (
        !Object.keys(EfamilyInstrument).includes(string as EfamilyInstrument)
      ) {
        return res.status(401).send({ message: 'Category not found' });
      }

      if (string !== null) {
        const instrumentsResult =
          await this.instrumentService.getInstrumentFilterString(
            string as EfamilyInstrument,
            limit,
            page
          );

        return res.status(200).json(instrumentsResult);
      }
    } catch (error) {
      return res.json(error);
    }
  };
}

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

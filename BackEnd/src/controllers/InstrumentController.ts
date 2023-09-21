import { Request, Response } from 'express';

export class InstrumentController {
  createInstrument = (req: Request, res: Response) => {
    try {
      const { name, familia } = req.body as ExampleType;
      Validation.ExampleSchema.parse({ name: name });
      const exampleModel = new ExampleModel(name);
      return res.json({ message: exampleModel.sayHello() });
    } catch (error: any) {
      return res.json(error);
    }
  };
}

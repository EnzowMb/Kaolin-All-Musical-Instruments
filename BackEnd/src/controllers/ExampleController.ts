import { ExampleModel } from '../model/ExampleModel';
import { Request, Response } from 'express';
import { ExampleType, Validation } from '../services/Validation';

export const sayHello = (req: Request, res: Response) => {
  try {
    const { name } = req.body as ExampleType;
    Validation.ExampleSchema.parse({ name: name });
    const exampleModel = new ExampleModel(name);
    return res.json({ message: exampleModel.sayHello() });
  } catch (error: any) {
    return res.json(error);
  }
};

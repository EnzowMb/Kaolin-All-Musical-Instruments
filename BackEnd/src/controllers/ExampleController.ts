import { ExampleModel } from '../model/ExampleModel';
import { Request, Response } from 'express';
import { ExampleType, Validation } from '../services/Validation';
import { PrismaClient } from '@prisma/client';
import { instrumentRepository } from '../repositories/InstrumentRepository';

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

export const sayVasco = (req: Request, res: Response) => {
  try {
    const { name } = req.body as ExampleType;
    Validation.ExampleSchema.parse({ name: name });
    const exampleModel = new ExampleModel(name);
    return res.json({ message: exampleModel.sayVasco(name) });
  } catch (error: any) {
    return res.json(error);
  }
};

export const teste = async (req: Request, res: Response) => {
  // const instrumentos = await prisma.instrument.create({
  //   data: { name: 'teste2', family: 'prisma' },
  //   select: { id: false, name: true, family: true },
  // });

  const instrumentos = await instrumentRepository.findMany();
  res.json(instrumentos);
};

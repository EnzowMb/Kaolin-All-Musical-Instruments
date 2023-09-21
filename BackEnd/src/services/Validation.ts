import { z } from 'zod';
import { EfamilyInstrument } from '../model/EfamilyInstrument';

export type ExampleType = z.infer<typeof Validation.ExampleSchema>;

export type InstrumentType = z.infer<typeof Validation.InstrumentSchema>;

export class Validation {
  static ExampleSchema = z.object({
    name: z.string().min(3, { message: 'minimum 3 digits' }),
  });

  static UserSchema = z.object({
    email: z
      .string({ required_error: 'Necessita de email' })
      .email({ message: 'Email invalido' }),
  });

  static InstrumentSchema = z.object({
    name: z
      .string()
      .min(3, { message: 'minimum 2 digits' })
      .max(40, { message: 'maximum 40 digits' }),
    family: z.nativeEnum(EfamilyInstrument),
  });
}

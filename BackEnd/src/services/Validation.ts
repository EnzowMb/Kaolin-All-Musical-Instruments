import { z } from 'zod';
import { EfamilyInstrument } from '../model/EfamilyInstrument';

export type InstrumentType = z.infer<typeof Validation.InstrumentSchema>;

export type UserType = z.infer<typeof Validation.UserSchema>;

export type LoginType = z.infer<typeof Validation.LoginSchema>;

const isDateValid = (value: string) => {
  const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  return patternData.test(value);
};

export class Validation {
  static UserSchema = z.object({
    name: z
      .string()
      .min(3, { message: 'minimum 2 digits' })
      .max(40, { message: 'maximum 40 digits' }),
    email: z
      .string({ required_error: 'Necessita de email' })
      .email({ message: 'Email invalido' }),
    password: z.string().min(4, { message: 'minimum 4 digits' }),
  });

  static InstrumentSchema = z.object({
    name: z
      .string()
      .min(3, { message: 'minimum 2 digits' })
      .max(40, { message: 'maximum 40 digits' }),
    family: z.nativeEnum(EfamilyInstrument),
    date: z
      .string({ required_error: 'Necessita da data de criação' })
      .refine((value) => isDateValid(value), {
        message: 'Invalid date format. Must be in dd/mm/yyyy format.',
      }),
  });

  static LoginSchema = z.object({
    email: z
      .string({ required_error: 'Necessita de email' })
      .email({ message: 'Email invalido' }),
    password: z
      .string({ required_error: 'Necessita de senha' })
      .refine((value) => value.trim() !== '', {
        message: 'A senha não pode ser vazia',
      }),
  });
}

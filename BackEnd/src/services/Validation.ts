import { z } from 'zod';
import { EfamilyInstrument } from '../model/EfamilyInstrument';

export type InstrumentType = z.infer<typeof Validation.InstrumentSchema>;

export type UserType = z.infer<typeof Validation.UserSchema>;

export type LoginType = z.infer<typeof Validation.LoginSchema>;

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

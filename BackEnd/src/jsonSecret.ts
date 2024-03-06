import { config } from 'dotenv';
config();

export const jsonSecret = {
  secret: process.env.JSON_SECRET_KEY as string,
};

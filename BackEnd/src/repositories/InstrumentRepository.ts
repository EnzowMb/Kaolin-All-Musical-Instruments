import { prismaClient } from './PrismaClient';

export const instrumentRepository = prismaClient.instrument;

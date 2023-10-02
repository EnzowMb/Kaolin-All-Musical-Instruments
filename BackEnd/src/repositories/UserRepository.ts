import { prismaClient } from './PrismaClient';

export const userRepository = prismaClient.user;

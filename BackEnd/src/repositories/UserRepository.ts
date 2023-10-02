import { PrismaClient } from '@prisma/client';
import { prismaClient } from './PrismaClient';

export const userRepository = prismaClient.user;

client: PrismaClient;

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

export async function page(req: Request, res: Response, next: NextFunction) {
  try {
    let { limit = 5, page = 1 } = req.query;

    limit = parseInt(limit as string, 10);
    page = parseInt(page as string, 10);

    const result = (req as any).result as PrismaClient;

    console.log(result);

    if (limit > 0 && page > 0) {
      const resultadoPaginado = await result.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
          name: 'desc',
        },
      });

      res.status(200).json(resultadoPaginado);
    } else {
      next(new Error());
    }
  } catch (error: any) {
    next(error);
  }
}

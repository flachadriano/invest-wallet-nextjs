import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import UnprocessableEntity from '@/lib/errors/unprocessable-entity';

export function executeOperations(res: NextApiResponse, operations: (prisma: PrismaClient) => Promise<any | void>) {
  const prisma = new PrismaClient();

  const catchError = (e: any) => {
    if (e instanceof UnprocessableEntity) {
      res.status(422).json({ error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ message: 'failed' });
    }
  };

  try {
    operations(prisma)
      .catch(catchError)
      .finally(() => prisma.$disconnect());
  } catch(e) {
    catchError(e);
  }
}

export async function executeQueries<T>(fn: (prisma: PrismaClient) => Promise<T>) {
  const prisma = new PrismaClient();
  return fn(prisma).finally(async () => await prisma.$disconnect());
}

import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import UnprocessableEntity from '@/lib/errors/unprocessable-entity';

export function executeOperations(res: NextApiResponse, operations: (prisma: PrismaClient) => Promise<void>) {
  const prisma = new PrismaClient();

  operations(prisma)
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
      await prisma.$disconnect();

      if (e instanceof UnprocessableEntity) {
        res.status(422).json({ error: e.message });
      } else {
        console.error(e);
        res.status(500).json({ message: 'failed' });
      }
    });
}

export async function executeQueries<T>(fn: (prisma: PrismaClient) => Promise<T>) {
  const prisma = new PrismaClient();
  return fn(prisma).finally(async () => await prisma.$disconnect());
}

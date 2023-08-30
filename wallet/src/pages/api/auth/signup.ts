import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '@/middlewares/password';
import UnprocessableEntity from '@/lib/errors/unprocessable-entity';
import { executeDatabaseOperations } from '@/middlewares/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  executeDatabaseOperations(res, async (prisma: PrismaClient) => {
    const { name, email, password } = req.body;

    if (!name || name.length < 7) {
      throw new UnprocessableEntity('Nome deve ter pelo menos 7 caracteres.');
    }
    if (!email) {
      throw new UnprocessableEntity('E-mail inválido.');
    }
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    if (!isValidEmail) {
      throw new UnprocessableEntity('E-mail inválido.');
    }
    if (!password || password.length < 6) {
      throw new UnprocessableEntity('Senha deve ter pelo menos 6 caracteres.');
    }

    let user = await prisma.user.findFirst({ where: { email: email } });
    if (user) {
      throw new UnprocessableEntity('E-mail já utilizado.');
    }

    const passwordHash = encryptPassword(password);
    await prisma.user.create({
      data: { name, email, password: passwordHash }
    });

    res.status(201).json({ message: 'success' });
  });
}

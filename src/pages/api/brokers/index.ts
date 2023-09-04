import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]';
import { executeOperations } from '@/middlewares/db';
import UnprocessableEntity from '@/lib/errors/unprocessable-entity';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    console.log('req.method', req.method);
    
    if (req.method === 'POST') {
      executeOperations(res, async (prisma) => {
        const { name, acronym, cnpj } = req.body;
        
        if (!acronym || !acronym.length) {
          throw new UnprocessableEntity('Nome não pode ficar em branco.');
        }
        
        await prisma.broker.create({ data: { name, acronym, cnpj, userId: +session.user.id } });
        res.status(201).json({ message: 'Registro criado com sucesso.' });
      });
    } else {
      res.status(405).json({ message: 'Operação não permitida' });
    }
  } else {
    return res.status(401).json({ message: 'Necessário se autenticar' });
  }
};

export default handler;

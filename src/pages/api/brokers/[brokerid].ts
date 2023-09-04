import { NextApiRequest, NextApiResponse } from 'next';
import { Session, getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]';
import { executeOperations } from '@/middlewares/db';
import UnprocessableEntity from '@/lib/errors/unprocessable-entity';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  const executePut = (session: Session) => {
    executeOperations(res, async (prisma) => {
      const { name, acronym, cnpj } = req.body;
      
      if (!acronym || !acronym.length) {
        throw new UnprocessableEntity('Nome não pode ficar em branco.');
      }

      if (!req.query.brokerid) {
        throw new UnprocessableEntity('ID inválido.');
      }
      
      const broker = await prisma.broker.findFirst({
        where: { id: +req.query.brokerid, userId: +session.user.id}
      });
      if (!broker) {
        throw new UnprocessableEntity('Corretora não foi encontrada.');
      }

      await prisma.broker.update({
        where: { id: +req.query.brokerid },
        data: { name, acronym, cnpj, userId: +session.user.id }
      });

      res.status(200).json({ message: 'Corretora alterada com sucesso.' });
    });
  };

  const executeDelete = (session: Session) => {
    executeOperations(res, async (prisma) => {
      if (!req.query.brokerid) {
        throw new UnprocessableEntity('ID inválido.');
      }
      
      const broker = await prisma.broker.findFirst({
        where: { id: +req.query.brokerid, userId: +session.user.id}
      });
      if (!broker) {
        throw new UnprocessableEntity('Corretora não foi encontrada.');
      }

      await prisma.broker.delete({
        where: { id: +req.query.brokerid }
      });

      res.status(200).json({ redirect: false, message: 'Corretora deletada com sucesso.' });
    });
  };

  if (session) {
    if (req.method === 'PUT') {
      executePut(session);
    } else if (req.method === 'DELETE') {
      executeDelete(session);
    } else {
      res.status(405).json({ message: 'Operação não permitida' });
    }
  } else {
    return res.status(401).json({ message: 'Necessário se autenticar' });
  }
};

export default handler;

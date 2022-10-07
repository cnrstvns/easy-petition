import { unstable_getServerSession as getSession } from 'next-auth/next';
import db from '../../../shared/db';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (req.query.id) {
      const petition = await db.petition.findUnique({
        where: { id: req.query.id },
        include: { user: true, _count: { select: { signatures: true } } },
      });

      return res.status(200).json(petition);
    }

    const petitions = await db.petition.findMany({
      include: { user: true, _count: { select: { signatures: true } } },
    });

    res.status(200).json(petitions);
  }

  if (req.method === 'POST') {
    const session = await getSession(req, res, authOptions);
    if (!session) return res.status(401).end();

    const petition = await db.petition.create({ data: req.body });

    res.status(202).json(petition);
  }
}

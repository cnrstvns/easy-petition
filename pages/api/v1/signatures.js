import { unstable_getServerSession as getSession } from 'next-auth/next';
import db from '../../../shared/db';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const signatures = await db.signature.findMany({ include: { user: true }, orderBy: [{ created: 'desc' }] });

    res.status(200).json(signatures);
  }

  if (req.method === 'POST') {
    const session = await getSession(req, res, authOptions);
    if (!session) return res.status(401).end();

    let user = await db.user.findUnique({ where: { email: session.user.email } });
    if (!user) user = await db.user.create({
      data: {
        email: session.user.email,
        username: session.user.name,
        avatar: session.user.image,
      },
    });

    const signature = await db.signature.create({
      data: {
        ...req.body,
        userId: user.id,
        petitionId: req.body.petitionId,
      },
    });

    res.status(202).json(signature);
  }
}

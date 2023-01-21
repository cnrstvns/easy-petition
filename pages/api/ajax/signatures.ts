import { unstable_getServerSession as getSession } from 'next-auth/next';
import db from '~/lib/db';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (!req.query.petition) return res.status(400).end();

    const session = await getSession(req, res, authOptions);
    if (!session) return res.status(401).end();

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) return res.status(401).end();

    const signature = await db.signature.findUnique({
      where: {
        petitionUserSignature: {
          userId: user.id,
          petitionId: req.query.petition,
        },
      },
    });

    if (!signature) return res.status(404).end();

    res.status(200).json(signature);
  }
}

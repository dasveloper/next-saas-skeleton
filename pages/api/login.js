import nextConnect from 'next-connect';
import dbConnect from '@lib/dbConnect';
import Team from '@models/Team';
import { magic } from '@lib/magic';
import { withSessionRoute } from '@lib/session';

export const postHandler = async (req, res) => {
  try {
    // Connect database
    await dbConnect();

    // Get Magic Link metadata
    const didToken = req.headers.authorization.substr(7);
    const metadata = await magic.users.getMetadataByToken(didToken);

    // Create users default team if not exists
    const teamExists = await Team.exists({ owner: metadata.issuer });
    if (!teamExists) {
      await Team.create({
        owner: metadata.issuer,
      });
    }

    // Set user session
    req.session.user = metadata;
    await req.session.save();

    res.status(200).send({ done: true });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
};

const handler = nextConnect();
handler.post(withSessionRoute(postHandler));
export default handler;

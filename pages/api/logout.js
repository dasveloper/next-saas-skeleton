import nextConnect from 'next-connect';
import { magic } from '@lib/magic';
import { withSessionRoute } from '@lib/session';

const getHandler = async (req, res) => {
  try {
    // Get user from session
    const { user } = req.session;

    // Logout of Magic Link
    await magic.users.logoutByIssuer(user.issuer);

    // Destroy session
    req.session.destroy();
  } catch (error) {
    return res.status(500).send('Something went wrong');
  }
  res.writeHead(302, { Location: '/' });
  return res.end();
};

const handler = nextConnect();
handler.get(withSessionRoute(getHandler));
export default handler;

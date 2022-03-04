import nextConnect from 'next-connect';
import { withSessionRoute } from '@lib/session';

export const getHandler = async (req, res) => {
  // Get user from session
  const { user } = req.session;

  // Return user if found
  res.status(200).json({ user: user || null });
};

const handler = nextConnect();
handler.get(withSessionRoute(getHandler));
export default handler;

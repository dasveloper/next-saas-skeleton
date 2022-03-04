import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD, // Secret cookie must be 32 secure random characters
  cookieName: 'next-saas-skeleton_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

// Session handler for API routes
export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Session handler for SSR routes
export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

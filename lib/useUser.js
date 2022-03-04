import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

export default function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data } = useSWR('/api/user');
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
    // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser)
        // If redirectIfFound is also set, redirect if the user was found
        || (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return { user };
}

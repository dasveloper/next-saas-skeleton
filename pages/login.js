import { useState } from 'react';
import { Magic } from 'magic-sdk';
import Router from 'next/router';
import useUser from '@lib/useUser';
import LoginForm from '@components/LoginForm';
import Header from '@components/Header';

function Login() {
  useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    const body = {
      email: e.currentTarget.email.value,
    };

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email,
      });
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${didToken}`,
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  }

  return (
    <div>
      <Header />
      <div>
        <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Login;

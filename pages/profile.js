import Header from '@components/Header';
import useUser from '@lib/useUser';

function Profile() {
  // Get user, if not found redirect to login
  const { user } = useUser({
    redirectTo: '/login',
  });

  return (
    <div>
      <Header />
      <h1>Profile</h1>
      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default Profile;

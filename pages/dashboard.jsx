import { useSession, signIn, signOut } from 'next-auth/react';

const SessionComponent = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>
          Welcome, {session.user.first_name} {session.user.last_name}!
        </p>
        <p>Your Google ID: {session.user.googleId}</p>
        <p>Your Role: {session.user.role}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <p>You are not signed in</p>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
};

export default SessionComponent;

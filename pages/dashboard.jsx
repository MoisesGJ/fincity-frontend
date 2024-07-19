import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import API from '@/services/API';

const SessionComponent = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEmailVerification = async () => {
      if (status === 'loading') return;

      if (status === 'unauthenticated') {
        return router.push(
          '/login?error=Inicie%20sesi%C3%B3n%20para%20validar%20su%20cuenta'
        );
      }

      const isVerified = await API.validateAccountVerify(session.user.id);

      if (session && isVerified) {
        setLoading(false);
      } else {
        router.push('/auth/notValidate');
      }
    };

    checkEmailVerification();
  }, [session, status, router, loading]);

  if (loading || status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>
          Welcome, {session.user.first_name} {session.user.last_name}!
        </p>
        <p>Your Google ID: {session.emailVerified}</p>
        <p>Your Role: {session.user.role}</p>
        <button onClick={() => signOut({ callbackUrl: '/login' })}>
          Sign Out
        </button>
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

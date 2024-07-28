import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import API from '@/services/API';

export function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkEmailVerification = async () => {
        if (status === 'loading') return;

        if (status === 'unauthenticated') {
          return router.push('/login');
        }

        const role = await API.getRole(session.accessToken);

        if (role !== 'Profesor')
          return router.push('/login?error=Hubo%20un%20error');

        const isVerified = await API.validateAccountVerify(session.user.id);

        if (session && isVerified) {
          setLoading(false);
        } else {
          router.push('/authorization/validation');
        }
      };

      checkEmailVerification();
    }, [session, status, router, loading]);

    if (loading || status === 'loading') {
      return <p>Loading...</p>;
    }

    return (
      <Component
        {...props}
        session={session}
      />
    );
  };
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import API from '@/services/API';

const Game = dynamic(() => import('@/components/Game'), { ssr: false });

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleAsync = async () => {
      if (status === 'unauthenticated') {
        router.push('/login');
      }

      const role = await API.getRole(session.accessToken);

      if (role !== 'Estudiante')
        return router.push('/login?error=Hubo%20un%20error');
    };

    handleAsync();
  }, [status, router, session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated') {
    return (
      <div className="min-h-screen w-screen">
        <Game session={session.user} />
      </div>
    );
  }

  return null;
}

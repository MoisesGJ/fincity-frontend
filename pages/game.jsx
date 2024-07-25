'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import dynamic from 'next/dynamic';

const Game = dynamic(() => import('@/components/Game'), { ssr: false });

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (status === 'unauthenticated') {
    return router.push('/login');
  }

  return <Game session={session.user} />;
}

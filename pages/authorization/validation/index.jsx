import API from '@/services/API/account.api';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Email from '@/components/EmailVerify/';
import { toast, Bounce, ToastContainer } from 'react-toastify';

import { Chakra_Petch } from 'next/font/google';
import Link from 'next/link';
import Loading from '@/components/Globals/LoadingPage';

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
});

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [resendEmail, setResendEmail] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const checkEmailVerification = async () => {
      if (status === 'loading') return;

      if (status === 'unauthenticated') {
        router.push(
          '/login?error=Inicie%20sesi%C3%B3n%20para%20validar%20su%20cuenta'
        );
      }

      const isVerified = await API.validateAccountVerify(session.user.id);

      if (session && isVerified.error) {
        const token = window.localStorage.getItem('emailValidate');

        if (token && token.length > 1) {
          window.localStorage.removeItem('emailValidate');
          return router.push(`/authorization/verification/${token}`);
        }

        const response = await API.getAccountById(session.user.id);
        if (response.user) setEmail(response.user.email);
        setLoading(false);
      } else {
        router.push('/teacher/dashboard');
      }
    };

    checkEmailVerification();
  }, [status, session, router, email, resendEmail]);

  if (loading || status === 'loading') {
    return <p>Loading...</p>;
  }

  const handlerLogOut = () =>
    signOut({ callbackUrl: 'http://localhost:3000/login' });

  const handlerSendEmail = async () => {
    setLoader(true);

    const emailSended = await API.sendEmail(
      session.user.id,
      session.accessToken
    );

    if (!emailSended.error) {
      setLoader(false);
      toast.success('¡Te reenviamos el correo!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
    setLoader(false);
  };

  return (
    <div className={chakra.className}>
      {loader && <Loading />}
      <ToastContainer />
      <Email
        logOut={handlerLogOut}
        email={email}
        sendEmail={handlerSendEmail}
      />
      <h6 className="absolute text-center w-full bottom-5 start-1/2 transition -translate-x-1/2 text-xs text-purple-900 md:text-white">
        Si aún nececitas ayuda, envíanos un correo a{' '}
        <Link
          className="underline"
          href={'mailto:admin@fincity.com'}
        >
          admin@fincity.com
        </Link>
      </h6>
    </div>
  );
}

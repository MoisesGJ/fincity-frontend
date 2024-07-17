import API from '@/services/API';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Email from '@/components/EmailVerify/';
import { toast, Bounce, ToastContainer } from 'react-toastify';

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

      if (session && !isVerified) {
        const token = window.localStorage.getItem('emailValidate');

        if (token && token.length > 1) {
          window.localStorage.removeItem('emailValidate');
          return router.push(`/auth/verification/${token}`);
        }

        const response = await API.getAccountById(session.user.id);
        if (response.user) setEmail(response.user.email);
        setLoading(false);
      } else {
        router.push('/dashboard');
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
    console.log(session.accessToken);
    const emailSended = await API.sendEmail(
      session.user.id,
      session.accessToken
    );

    //if (emailSended['expire']) return signOut();
    if (emailSended) {
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
    <>
      {loader && (
        <div
          role="status"
          className="absolute top-0 start-0 z-50 backdrop-blur-sm bg-white/30 min-h-screen w-full flex justify-center items-center"
        >
          <svg
            aria-hidden="true"
            className=" w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <ToastContainer />
      <Email
        logOut={handlerLogOut}
        email={email}
        sendEmail={handlerSendEmail}
      />
    </>
  );
}

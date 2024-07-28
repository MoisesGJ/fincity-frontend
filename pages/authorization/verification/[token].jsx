import styles from '@/components/EmailVerify/styles.module.css';

import API from '@/services/API';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Chakra_Petch } from 'next/font/google';
import Link from 'next/link';

import { toast, Bounce, ToastContainer } from 'react-toastify';

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
});

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const token = router.query.token;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEmailVerification = async () => {
      if (status === 'loading') return;

      if (status === 'unauthenticated') {
        return router.push(
          `/login?error=Inicie%20sesi%C3%B3n%20para%20validar%20su%20cuenta&token=${token}`
        );
      }

      const isVerified = await API.validateAccountVerify(session.user.id);

      if (session && !isVerified) {
        setLoading(false);
      } else {
        router.push(
          '/login?Error=Inicia%20sesi%C3%B3n%20para%20poder%20continuar'
        );
      }
    };

    checkEmailVerification();
  }, [session, status, router, loading, token]);

  if (loading || status === 'loading') {
    return <p>Loading...</p>;
  }

  const handlerValidateAccount = async (tk, auth) => {
    const validate = await API.validateAccount(tk, auth);
    if (validate.ok) {
      return router.push('/teacher/dashboard');
    } else {
      toast.error('Validación prohibida', {
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
      setTimeout(() => {
        return router.push('/auth/notValidate');
      }, 2000);
    }
  };

  return (
    <>
      <ToastContainer />
      <main
        className={`${chakra.className} flex justify-center items-center w-screen min-h-screen bg-slate-50 ${styles.bgCircles}`}
      >
        <div className="bg-slate-50 rounded-xl flex flex-col items-center justify-around h-96 w-full md:w-1/2">
          <div className="relative px-2 md:px-5 text-base text-purple-900 text-center mt-10 w-full">
            <h1 className="text-4xl font-bold">Verificación de correo</h1>
            <p className="my-3 px-5 text-base">
              Da clic en el botón de <i>validar cuenta</i> para verificar tu
              correo electrónico.
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-3">
            <button
              className="transition ease-in-out delay-150 bg-[#7e4fd4] px-6 py-4 text-white rounded-xl hover:bg-orange-500 hover:text-white hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={() => handlerValidateAccount(token, session.user.token)}
            >
              Validar cuenta
            </button>
            <button
              className="transition ease-in-out delay-150 bg-[#7e4fd4]  px-5 py-3 text-white rounded-xl hover:bg-orange-500 hover:text-white hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={signOut}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </main>{' '}
    </>
  );
}

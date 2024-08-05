import styles from '@/styles/tutor.module.css';

import Loading from '@/components/Globals/LoadingPage';

import Pin from '@/components/Tutor/Pin';
import { useRouter } from 'next/router';

import { toast, Bounce, ToastContainer } from 'react-toastify';

import API from '@/services/API/tutor.api';
import { useState } from 'react';

export default function Tutor() {
  const router = useRouter();
  const token = router.query.token;

  const [loader, setLoader] = useState(false);

  const handleCreatePin = async (code) => {
    setLoader(true);
    const onlyDigits = code.join('');
    if (/^\d{4}$/.test(onlyDigits)) {
      const res = await API.createPIN(token, onlyDigits);

      if (res.ok)
        toast.success('¡Pin creado con éxito!', {
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
      else
        toast.error('Hubo un error :(', {
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
    } else {
      toast.error('Url inválida', {
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
    setTimeout(() => {
      router.push('/');
    }, 4000);
  };

  return (
    <>
      {loader && <Loading />}

      <main
        className={`${styles.bgPattern} h flex flex-col items-center justify-center px-5 text-white relative`}
      >
        <span className="font-bold text-sm absolute bottom-5 start-1/2 transition -translate-x-1/2">
          FinCity * 2024
        </span>
        <h1 className="text-4xl mb-4 font-bold">Crea un PIN</h1>
        <h2 className="mb-8 text-center px-5 max-w-4xl">
          Es crucial que guardes este PIN en un lugar seguro. Con él podrás
          validar que tus hijxs han hecho sus tareas del hogar. No compartas
          este PIN con ellxs; asegúrate de que solo tú lo tengas para mantener
          el control y la supervisión.
        </h2>
        <Pin createPin={handleCreatePin} />
        <ToastContainer />
      </main>
    </>
  );
}

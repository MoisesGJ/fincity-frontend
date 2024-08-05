import { signOut, useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';

import UserLogin from '@/components/Login/UserLogin';
import StudentsLogin from '@/components/Login/StudentsLogin';
import API from '@/services/API/account.api';

export default function Page() {
  const [user, setUser] = useState(null);

  const [key, setKey] = useState(0);

  const router = useRouter();
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();

  const error = searchParams.get('error');
  const success = searchParams.get('success');

  const notify = (msg, type) => {
    if (type && type.error)
      toast.error(msg, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Zoom,
      });
    else if (type && type.success)
      toast.success(msg, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Zoom,
      });
    else {
      toast.error(msg, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Zoom,
      });
    }
  };

  useEffect(() => {
    const stateLog = window.localStorage.getItem('Login');
    if (stateLog === 'Profesor') {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  useEffect(() => {
    const handleAsync = async () => {
      if (session && status === 'authenticated' && status !== 'loading') {
        const role = await API.getRole(session?.accessToken);

        if (role === 'Estudiante') {
          router.push('/student/game');
        } else if (role === 'Profesor') {
          router.push('/teacher/dashboard');
        } else {
          signOut();
        }
      }
    };

    if (status == 'authenticated' && status !== 'loading') {
      handleAsync();
    }
  }, [status, router, session]);

  useEffect(() => {
    if (error) setTimeout(() => notify(error, { error: true }), 1000);
    else if (success)
      setTimeout(() => notify(success, { success: true }), 1000);
  }, [error, success]);

  const handleChangeUser = (value) => {
    window.localStorage.setItem('Login', value ? 'Profesor' : 'Estudiante');
    setKey((prevKey) => prevKey + 1);
    setUser(value);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col xl:flex-row-reverse xl:min-h-[100dvh] w-screen">
      <div
        className="relative xl:w-1/2"
        key={key}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 430 171"
          fill="none"
          className="absolute xl:hidden animate-fadeInSlow"
        >
          <path
            d="M0 0H430V137.453C399.406 125.945 366.017 124.112 334.347 132.2L282.5 145.441L180.098 168.042C161.738 172.094 142.609 170.888 124.903 164.563L0 119.943V0Z"
            fill={`${user ? '#8B3FDE' : '#FD6A00'}`}
            fillOpacity="0.7"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 430 179"
          fill="none"
          className="xl:hidden animate-fadeIn"
        >
          <path
            d="M0 0H430V156.496H414.792C392.784 156.496 370.88 153.484 349.689 147.545C323.879 140.31 296.794 138.839 270.352 143.236L61.0452 178.037C32.8884 182.719 6.01818 164.462 0 136.56V0Z"
            fill={`${user ? '#8B3FDE' : '#FD6A00'}`}
            fillOpacity="0.5"
          />
        </svg>

        {/* DESKTOP */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 504 832"
          fill="none"
          className="hidden xl:block absolute h-full top-0 end-0 animate-fadeInSlow"
        >
          <path
            d="M504 0L504 832L100.107 832C132.969 774.469 138.14 705.189 114.183 643.417L76.635 546.605L5.82239 335.34C-2.99365 309.038 -0.488037 280.256 12.7404 255.873L151.558 0L504 0Z"
            fill={`${user ? '#8B3FDE' : '#FD6A00'}`}
            fillOpacity="0.7"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 428 832"
          fill="none"
          className="hidden xl:block absolute h-full top-0 end-0 animate-fadeIn"
        >
          <path
            d="M428 0L428 832L53.7185 832V803.503C53.7185 760.404 60.9219 717.608 75.0311 676.884C92.2891 627.072 95.7964 573.527 85.1837 521.889L2.94284 121.73C-8.41144 66.4834 28.1437 12.7828 83.7054 3.08729L101.398 0L428 0Z"
            fill={`${user ? '#8B3FDE' : '#FD6A00'}`}
            fillOpacity="0.5"
          />
        </svg>
      </div>
      {user !== null &&
        (user ? (
          <UserLogin
            changeUser={handleChangeUser}
            handleNotify={notify}
          />
        ) : (
          <StudentsLogin
            changeUser={handleChangeUser}
            handleNotify={notify}
          />
        ))}

      <ToastContainer />
    </div>
  );
}

import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ErrorMessage from '../ErrorMessage';
import Loading from '../LoadingPage';

export default function UserLogin({ changeUser, handleNotify }) {
  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async ({ user, password }) => {
    return new Promise(() => {
      setTimeout(async () => {
        const res = await signIn('students', {
          user,
          password,
          redirect: false,
        });

        if (res.ok) {
          return router.push('/game');
        } else {
          handleNotify(res.error.message || res.error.toString());
          reset();
        }
      }, 1000);
    });
  };

  return (
    <>
      {isSubmitting && <Loading />}
      <main
        className={`mt-5 p-5 md:p-9 xl:w-full flex flex-col justify-center items-center`}
      >
        <div className="xl:max-w-lg xl:w-full text-center xl:text-start">
          <h1 className="text-5xl font-bold xl:text-start animate-bounceOnce">
            ¡Juguemos!
          </h1>
          <h2 className="mt-3 text-base bounceOnce">Inicia sesión</h2>
        </div>
        <form
          className="flex flex-col items-center gap-6 mt-8 max-w-xl xl:px-6 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="input input-bordered flex items-center gap-2 w-full bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 text-[#FD6A00]"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Usuario"
              {...register('user', {
                required: 'El usuario es necesario.',
                minLength: {
                  value: 6,
                  message: 'Se nececitan mínimo 8 caracteres.',
                },
                /*pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                  message: 'Es necesario un correo válido.',
                },*/
              })}
            />
          </label>

          {errors?.user && <ErrorMessage msg={errors?.user.message} />}

          <label className="input input-bordered flex items-center gap-2 w-full bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 text-[#FD6A00]"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Contraseña"
              {...register('password', {
                required: 'La contraseña es necesaria.',
                minLength: {
                  value: 8,
                  message: 'Se nececitan mínimo 8 caracteres.',
                },
                /*pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message:
                    'Es necesario al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
                },*/
              })}
            />
          </label>

          {errors?.password && <ErrorMessage msg={errors?.password.message} />}

          <button
            className="btn w-40 bg-[#FD6A00] border-none uppercase text-white hover:bg-white hover:text-black"
            type="submit"
          >
            Inicia sesión
          </button>
        </form>

        <p className="text-center text-sm p-3 mt-5">
          <Link
            className="text-[#FD6A00] font-bold text-md btn shadow-none bg-white border-none  hover:bg-white hover:text-black"
            href={'#'}
            onClick={() => changeUser(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>{' '}
            Soy un profesor
          </Link>
        </p>
      </main>
    </>
  );
}

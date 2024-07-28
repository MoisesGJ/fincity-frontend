import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ErrorMessage from '../Globals/ErrorMessage';
import Loading from '../Globals/LoadingPage';

export default function UserLogin({ changeUser, handleNotify }) {
  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    return new Promise(() => {
      setTimeout(async () => {
        const res = await signIn('user', {
          email,
          password,
          redirect: false,
        });

        if (res.ok) return router.push('/teacher/dashboard');
        else {
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
            ¡Bienvenidx!
          </h1>
          <h2 className="mt-3 text-base">Inicia sesión</h2>
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
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Correo electrónico"
              {...register('email', {
                required: 'El correo electrónico es necesario.',
                minLength: {
                  value: 8,
                  message: 'Se nececitan mínimo 8 caracteres.',
                },
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                  message: 'Es necesario un correo válido.',
                },
              })}
            />
          </label>

          {errors?.email && <ErrorMessage msg={errors?.email.message} />}

          <label className="input input-bordered flex items-center gap-2 w-full bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
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
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message:
                    'Es necesario al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
                },
              })}
            />
          </label>

          {errors?.password && <ErrorMessage msg={errors?.password.message} />}

          <button
            className="btn w-40 bg-purple-600 uppercase text-white"
            type="submit"
          >
            Inicia sesión
          </button>
        </form>
        <div className="inline-flex items-center justify-center w-full max-w-xl relative ">
          <hr className="w-64 h-px my-6 bg-gray-600 border-0 " />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 bg-white ">
            o
          </span>
        </div>
        <button
          type="button"
          className="mb-3 py-2 px-4 flex justify-center items-center relative *:hover:absolute *:hover:start-1/2 *:hover:transform *:hover:-translate-x-1/2  *:hover:ease-in *:hover:duration-200 hover:bg-purple-600 hover:text-purple-600 transition ease-in duration-200 text-center text-purple-600 text-base font-semibold border border-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl border-3 w-80"
          onClick={() =>
            signIn('google', { callbackUrl: '/teacher/dashboard' })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            data-name="Layer 1"
            className="me-2"
          >
            <path
              d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"
              fill="#00ac47"
            />
            <path
              d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"
              fill="#4285f4"
            />
            <path
              d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"
              fill="#ffba00"
            />
            <polygon
              fill="#2ab2db"
              points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"
            />
            <path
              d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"
              fill="#ea4435"
            />
            <polygon
              fill="#2ab2db"
              points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"
            />
            <path
              d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z"
              fill="#4285f4"
            />
          </svg>
          Inicia sesión con Google
        </button>
        <p className="text-center text-sm p-3 flex flex-col">
          <span>
            ¿No tienes una cuenta?{' '}
            <Link
              className="text-purple-300"
              href={'/registro'}
            >
              Crea una
            </Link>
          </span>
          <Link
            className="text-purple-600 font-bold text-md btn shadow-none bg-white border-none  hover:bg-white hover:text-black"
            href={'#'}
            onClick={() => changeUser(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            Soy un alumno
          </Link>
        </p>
      </main>
    </>
  );
}

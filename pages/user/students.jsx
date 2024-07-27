/*import { withAuth } from '@/services/withAuth';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';

import { RandomAvatar } from '@/services/avatars';
import CharacterWidomer from '@/assets/characters/Widomer.webp';
import CharacterBeaveron from '@/assets/characters/Beaveron.webp';
import CharacterHoodina from '@/assets/characters/Hoodina.webp';
import CharacterSkeleton from '@/assets/characters/Skeleton.webp';
import CharacterSkullcrasher from '@/assets/characters/Skullcrasher.webp';

function Students({ session }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const watchName = watch();

  const onSubmit = async (data) => {
    reset();
    alert('Enviado');
  };

  return (
    <main className="bg-purple-600 min-h-screen grid xl:grid-cols-2">
      <section className="flex flex-col justify-center items-center gap-3">
        <Image
          alt="Character"
          src={CharacterWidomer}
          width={230}
          height={230}
          className={`transition ease-in ${
            watchName?.firstname || watchName?.lastname || watchName?.surname
              ? 'scale-100 xl:scale-150'
              : 'scale-150 xl:scale-[2] xl:-translate-y-14'
          }`}
        />
        {(watchName?.firstname ||
          watchName?.lastname ||
          watchName?.surname) && (
          <h1 className="mt-5 xl:mt-12 text-4xl font-bold text-white">
            {watchName?.firstname
              ? watchName?.firstname.slice(0, 10).toUpperCase()
              : ''}{' '}
            {watchName?.lastname
              ? watchName.lastname[0].toUpperCase() + '.'
              : ''}{' '}
            {watchName?.surname ? watchName.surname[0].toUpperCase() + '.' : ''}
          </h1>
        )}
      </section>
      <section className="flex flex-col justify-start xl:justify-center items-center xl:items-start gap-3">
        {(errors?.firstname || errors?.lastname || errors?.parent) && (
          <div className="w-96 mt-5 xl:mt-0">
            <ErrorMessage
              msg={
                'Revise que los datos ingresados sean correctos: no contengan espacios y sean mayores a 8 caracteres y menores a 15.'
              }
            />
          </div>
        )}
        <form
          className="form-control w-96 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="input bg-white input-bordered border-4 flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Nombre"
              {...register('firstname', {
                required: true,
                maxLength: 15,
                minLength: {
                  value: 2,
                },
                pattern: {
                  value: /^[a-z ,.'-]\S+$/i,
                  message: 'Es necesario un nombre válido.',
                },
              })}
            />
          </label>
          <label className="input bg-white input-bordered border-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Apellido Materno"
              {...register('lastname', {
                required: true,
                maxLength: 15,
                minLength: {
                  value: 2,
                },
                pattern: {
                  value: /^[a-z ,.'-]\S+$/i,
                },
              })}
            />
          </label>
          <label className="input bg-white input-bordered border-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Apellido materno"
              {...register('surname', {
                required: true,
                maxLength: 15,
                minLength: {
                  value: 2,
                },
                pattern: {
                  value: /^[a-z ,.'-]\S+$/i,
                },
              })}
            />
          </label>
          <label className="input bg-white input-bordered border-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M12 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zM4.5 14.5c.83 0 1.5-.67 1.5-1.5S5.33 11.5 4.5 11.5 3 12.17 3 13s.67 1.5 1.5 1.5zm15 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5 .67-1.5 1.5.67 1.5 1.5 1.5zm0 1c-1.1 0-2.21.34-3.1.93C15.79 15.12 13.94 14.5 12 14.5s-3.79.62-4.9 1.43C6.71 15.84 5.6 15.5 4.5 15.5c-1.38 0-2.74.46-4 1.29V20h20v-3.21c-1.26-.83-2.62-1.29-4-1.29z" />
            </svg>

            <input
              type="text"
              className="grow"
              placeholder="Nombre del padre, madre o tutor"
              {...register('parent', {
                required: true,
                maxLength: 30,
                minLength: {
                  value: 2,
                },
                pattern: {
                  value: /^[a-z ,.'-]+$/i,
                },
              })}
            />
          </label>
          <button
            className="btn w-40 bg-purple-600 hover:bg-white hover:border-white hover:text-black uppercase border-white text-white mx-auto mt-5"
            type="submit"
          >
            Crear alumno
          </button>
        </form>
      </section>
    </main>
  );
}

export default withAuth(Students);*/

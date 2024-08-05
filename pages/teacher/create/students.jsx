import { withAuth } from '@/services/Auth/withAuth';
import Image from 'next/image';

import Loading from '@/components/Globals/LoadingPage';

import { useForm } from 'react-hook-form';
import ErrorMessage from '@/components/Globals/ErrorMessage';
import { useState } from 'react';

import API from '@/services/API/teacher.api';
import { useRouter } from 'next/router';

function Students({ session }) {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const [students, setStudents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [bounce, setBounce] = useState(false);

  const watchName = watch();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setBounce(true);

    const newStudents = [
      ...students,
      {
        first_name: data.firstname,
        last_name: data.lastname,
        tutor_full_name: data.parent,
        tutor_email: data.emailParent,
      },
    ];

    setStudents(newStudents);

    reset();

    setTimeout(() => {
      setBounce(false);
    }, 2000);
  };

  const handlerCreateStudents = async (data) => {
    setLoader(true);

    const createStudnets = await API.createStudents(session.accessToken, data);

    if (createStudnets.error) {
      alert('Error');
    } else {
      alert('¡éxito!');
    }

    setLoader(false);
  };

  return (
    <>
      {loader && <Loading />}

      <main className="pb-5 min-h-screen grid xl:grid-cols-2 gap-12 relative">
        {bounce && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="52px"
              viewBox="0 -960 960 960"
              width="52px"
              fill="#FD6A00"
              className="animate-bounce"
            >
              <path d="m480-453-95-95q-11-11-27.5-11T329-548q-12 12-12 28.5t12 28.5l123 123q12 12 28 12t28-12l124-124q12-12 11.5-28T631-548q-12-11-28-11.5T575-548l-95 95Zm0 373q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
            </svg>
          </div>
        )}
        <section className="flex flex-col justify-center items-center gap-3">
          <Image
            alt="Character"
            src={'/assets/characters/Widomer.webp'}
            width={230}
            height={230}
            className={`scale-[1.3] xl:scale-150 transition ease-in ${
              watchName?.firstname || watchName?.lastname
                ? 'scale-100 xl:scale-150'
                : 'scale-150 xl:scale-[2] xl:-translate-y-14'
            }`}
          />
          {(watchName?.firstname || watchName?.lastname) && (
            <div className="mt-5 xl:mt-12 text-3xl xl:text-4xl font-bold ">
              <span>
                {watchName?.firstname
                  ? watchName?.firstname.slice(0, 10).toUpperCase()
                  : ''}{' '}
              </span>
              <span>
                {watchName?.lastname
                  ? watchName.lastname.slice(0, 10).toUpperCase()
                  : ''}{' '}
              </span>
            </div>
          )}
        </section>
        <section className="flex flex-col justify-start xl:justify-center items-center xl:items-start gap-3 ">
          {(errors?.firstname ||
            errors?.lastname ||
            errors?.parent ||
            errors?.emailParent) &&
            (watchName?.firstname.length > 0 || watchName.lastname.length > 0) >
              0 && (
              <div className="w-96 mt-5 xl:mt-0">
                <ErrorMessage
                  msg={
                    'Verifique que los datos sean correctos: correo válido, nombres requeridos, entre 8 y 15 caracteres, y números menores a 50.'
                  }
                />
              </div>
            )}
          <form
            className="form-control w-full md:w-96 gap-3 bg-purple-600 p-10 rounded-3xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-bold text-white text-4xl">Estudiante</h1>
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
                  maxLength: 50,
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
                placeholder="Apellido"
                {...register('lastname', {
                  required: true,
                  maxLength: 50,
                  minLength: {
                    value: 2,
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
                  maxLength: 100,
                  minLength: {
                    value: 2,
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
                type="email"
                className="grow"
                placeholder="Correo del padre, madre o tutor"
                {...register('emailParent', {
                  required: true,
                  maxLength: 30,
                  minLength: {
                    value: 2,
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                  },
                })}
              />
            </label>
            <button
              className="btn w-48 bg-purple-600 hover:bg-white hover:border-white hover:text-black uppercase border-white text-white mx-auto mt-5 shadow-[5px_5px_0px_0px_rgba(109,40,217)] flex"
              type="submit"
            >
              Crear alumno
            </button>
          </form>
        </section>
      </main>
      {students.length > 0 && (
        <section className="py-5 mx-5">
          <div className="mb-5 flex justify-center flex-wrap-reverse items-center xl:justify-between gap-10">
            <div className="flex space-x-10 items-center">
              <h2 className="rounded-md text-xl md:text-3xl font-bold  bg-[#FD6A00] w-fit p-5 text-white shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
                Mis estudiantes:
              </h2>
              <button
                className="text-xl font-bold border-2 text-[#666666]  border-none w-auto h-fit p-3  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-xl hover:bg-[#FD6A00] hover:text-white [&>svg]:hover:fill-white"
                onClick={() => handlerCreateStudents(students)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#666666"
                  className="inline me-2"
                >
                  <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                </svg>
                Guardar
              </button>
            </div>
            <button
              className="text-xl font-bold border-2 decoration-[#666666] underline text-[#666666]  border-none w-auto h-fit p-3  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-xl hover:bg-[#FD6A00] hover:text-white [&>svg]:hover:fill-white hover:decoration-transparent"
              onClick={() => router.push('/teacher/dashboard')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#666666"
                className="inline me-3"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h240v-560H200v560Zm320 0h240v-280H520v280Zm0-360h240v-200H520v200Z" />
              </svg>
              Regresar al dashboard
            </button>
          </div>
          <ul className="flex flex-wrap justify-center xl:justify-start gap-5">
            {students?.map(({ first_name, last_name }, index) => {
              return (
                <li
                  key={index}
                  className="rounded-md italic text-xl bg-[#FD6A00] text-white w-full md:w-48 p-3 truncate text-center flex items-center gap-1 shadow-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="inline h-4 w-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  {`${first_name} ${last_name}`}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}

export default withAuth(Students);

import API from '@/services/API/teacher.api';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Loading from '../Globals/LoadingPage';

export default function CreateGroup({ session, update, group }) {
  const [groupModal, setGroupModal] = useState(true);
  const [loader, setLoader] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setGroupModal(false);
    setLoader(true);

    const newgroup = await API.createGroup(session.accessToken, {
      status: true,
      ...data,
    });

    setLoader(false);

    if (!group) {
      setGroupModal(true);
      return update({ group: null });
    }

    reset();

    group(newgroup);
    return update({ group: true });
  };

  return (
    <>
      {loader && <Loading />}
      {groupModal && (
        <dialog
          id="create_group"
          className="modal"
        >
          <div className="bg-white modal-box w-11/12 md:w-8/12 max-w-5xl">
            <h2 className="font-bold text-3xl text-purple-900 text-center">
              ¡Vamos a crear un grupo!
            </h2>
            <form
              className="mx-auto mt-3 form-control w-10/12 gap-5 py-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="input bg-white input-bordered border-4 flex items-center gap-2 relative">
                {errors?.school && (
                  <span className="text-red-400 font-bold text-xs absolute start-0 -top-5">
                    {errors.school.message}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-purple-600"
                >
                  <path d="M12 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zM4.5 14.5c.83 0 1.5-.67 1.5-1.5S5.33 11.5 4.5 11.5 3 12.17 3 13s.67 1.5 1.5 1.5zm15 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5 .67-1.5 1.5.67 1.5 1.5 1.5zm0 1c-1.1 0-2.21.34-3.1.93C15.79 15.12 13.94 14.5 12 14.5s-3.79.62-4.9 1.43C6.71 15.84 5.6 15.5 4.5 15.5c-1.38 0-2.74.46-4 1.29V20h20v-3.21c-1.26-.83-2.62-1.29-4-1.29z" />
                </svg>

                <input
                  type="text"
                  className="grow"
                  placeholder="Nombre de la escuela"
                  {...register('school', {
                    required: {
                      value: true,
                      message: 'Necesitas llenar este campo',
                    },
                    maxLength: {
                      value: 15,
                      message: 'Es necesario máximo 15 caracteres.',
                    },
                    minLength: {
                      value: 2,
                      message: 'Es necesario mínimo dos caracteres.',
                    },
                    pattern: {
                      value: /^[a-z ,.'-]+$/i,
                      message: 'Es necesario un nombre válido.',
                    },
                  })}
                />
              </label>
              <label className="input bg-white input-bordered border-4 flex items-center gap-2 relative">
                {errors?.school_grade && (
                  <span className="text-red-400 font-bold text-xs absolute start-0 -top-5">
                    {errors.school_grade.message}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-purple-600"
                >
                  <path d="M12 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zM4.5 14.5c.83 0 1.5-.67 1.5-1.5S5.33 11.5 4.5 11.5 3 12.17 3 13s.67 1.5 1.5 1.5zm15 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5 .67-1.5 1.5.67 1.5 1.5 1.5zm0 1c-1.1 0-2.21.34-3.1.93C15.79 15.12 13.94 14.5 12 14.5s-3.79.62-4.9 1.43C6.71 15.84 5.6 15.5 4.5 15.5c-1.38 0-2.74.46-4 1.29V20h20v-3.21c-1.26-.83-2.62-1.29-4-1.29z" />
                </svg>

                <input
                  type="text"
                  className="grow"
                  placeholder="Grado escolar"
                  {...register('school_grade', {
                    required: {
                      value: true,
                      message: 'Necesitas llenar este campo',
                    },
                    maxLength: {
                      value: 15,
                      message: 'Es necesario máximo 15 caracteres.',
                    },
                    minLength: {
                      value: 2,
                      message: 'Es necesario mínimo dos caracteres.',
                    },
                    pattern: {
                      value: /^[a-z ,.'-]+$/i,
                      message: 'Es necesario un nombre válido.',
                    },
                  })}
                />
              </label>
              <label className="input bg-white input-bordered border-4 flex items-center gap-2 relative">
                {errors?.description && (
                  <span className="text-red-400 font-bold text-xs absolute start-0 -top-5">
                    {errors.description.message}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-purple-600"
                >
                  <path d="M12 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zM4.5 14.5c.83 0 1.5-.67 1.5-1.5S5.33 11.5 4.5 11.5 3 12.17 3 13s.67 1.5 1.5 1.5zm15 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5 .67-1.5 1.5.67 1.5 1.5 1.5zm0 1c-1.1 0-2.21.34-3.1.93C15.79 15.12 13.94 14.5 12 14.5s-3.79.62-4.9 1.43C6.71 15.84 5.6 15.5 4.5 15.5c-1.38 0-2.74.46-4 1.29V20h20v-3.21c-1.26-.83-2.62-1.29-4-1.29z" />
                </svg>

                <input
                  type="text"
                  className="grow"
                  placeholder="Descripción del grupo"
                  {...register('description', {
                    required: {
                      value: true,
                      message: 'Necesitas llenar este campo',
                    },
                    maxLength: {
                      value: 15,
                      message: 'Es necesario máximo 15 caracteres.',
                    },
                    minLength: {
                      value: 2,
                      message: 'Es necesario mínimo dos caracteres.',
                    },
                    pattern: {
                      value: /^[a-z ,.'-]+$/i,
                      message: 'Es necesario un nombre válido.',
                    },
                  })}
                />
              </label>

              <button className="btn bg-purple-600 text-white border-white text-xl my-5">
                Crear
              </button>
            </form>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
          >
            <button>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}

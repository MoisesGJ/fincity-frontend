import API from '@/services/API';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Bounce, ToastContainer } from 'react-toastify';

export default function CreateGroup({ session, update }) {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [groupModal, setGroupModal] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    const group = await API.createGroup(session.accessToken, {
      status: true,
      ...data,
    });

    if (group) {
      setLoader(false);
      setGroupModal(false);
      toast.success('¡Se ha creado el grupo!', {
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
      update(true);
    } else {
      setLoader(false);
      setGroupModal(false);
      toast.error('Hubo un error', {
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
    reset();
  };

  return (
    <>
      {loader && (
        <div
          role="status"
          className="absolute top-0 start-0 z-50 backdrop-blur-sm bg-white/30 min-h-[100dvh] w-full flex justify-center items-center"
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
      <ToastContainer />
    </>
  );
}

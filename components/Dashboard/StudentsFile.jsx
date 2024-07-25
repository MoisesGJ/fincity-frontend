import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function StudentsFile() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    reset();
    alert('Enviado');
    router.reload();
  };

  return (
    <>
      <dialog
        id="create_students"
        className="modal"
      >
        <div className="bg-white modal-box w-11/12 md:w-8/12 max-w-5xl">
          <h2 className="font-bold text-3xl text-purple-900 text-center">
            Añadamos un par de alumnos...
          </h2>
          <div className="flex justify-center items-center my-5">
            <button className="btn"></button>
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

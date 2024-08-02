import API from '@/services/API/teacher.api';

import Link from 'next/link';
import { useState } from 'react';

import DragDrop from './DragAndDrop';
import Loading from '../Globals/LoadingPage';

export default function StudentsFile({ session, update, students }) {
  const [dragDrop, setDragDrop] = useState(false);
  const [loader, setLoader] = useState(false);
  const [studentsModal, setStudentsModal] = useState(true);

  const handlerCreateStudents = async (data) => {
    setStudentsModal(false);
    setLoader(true);

    const newstudents = await API.createStudents(session.accessToken, data);

    if (newstudents.error) {
      console.log('ERROR', newstudents);
      setStudentsModal(true);
      setLoader(false);
      return update({ students: false, message: newstudents.error });
    } else {
      console.log('URL', newstudents);
      setStudentsModal(true);
      setLoader(false);
      students(newstudents);
      return update({ students: true });
    }
  };

  return (
    <>
      {loader && <Loading />}

      {studentsModal && (
        <dialog
          id="create_students"
          className="modal"
        >
          <div className="bg-white modal-box w-11/12 md:w-8/12 max-w-5xl flex flex-col justify-center items-center">
            <h2 className="font-bold text-3xl text-purple-900 text-center">
              Añadamos un par de alumnos...
            </h2>
            <div className="flex flex-col justify-center items-center my-10">
              <button
                onClick={() => setDragDrop(!dragDrop)}
                className="hover:border-2 hover:border-[#5D269A] hover:text-[#2F0F53] hover:bg-white border-2 border-[#5D269A] bg-[#5D269A] text-white  rounded-lg p-2 m-5 text-center my-auto w-full md:w-96"
              >
                Desde un archivo
              </button>
              <DragDrop
                status={dragDrop}
                create={handlerCreateStudents}
              />
              <div className="inline-flex items-center justify-center w-full max-w-xl relative ">
                <hr className="w-full md:w-96 h-px my-6 bg-gray-600 border-0 " />
                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 bg-white ">
                  o
                </span>
              </div>

              <Link
                href={'/'}
                className="underline text-purple-600 font-medium"
              >
                Añadir uno por uno
              </Link>
            </div>
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

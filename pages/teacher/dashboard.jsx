import API from '@/services/API/teacher.api';
import { withAuth } from '@/services/Auth/withAuth';

import Link from 'next/link';

import CreateGroup from '@/components/Dashboard/CreateGroup';
import StudentsFile from '@/components/Dashboard/StudentsFile';
import Drawer from '@/components/Globals/Drawer';

import { useEffect, useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { toast, Bounce, ToastContainer } from 'react-toastify';

function Dashboard({ session }) {
  const [group, setGroup] = useState(false);
  const [students, setStudents] = useState([]);
  const [update, setUpdate] = useState(null);
  const [updateStds, setUpdateStds] = useState(false);

  const notify = (msg, boolean) => {
    if (!boolean)
      return toast.error(msg, {
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

    return toast.success(msg, {
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
  };

  const addStudents = (url) => {
    setUpdateStds(true);
  };

  useEffect(() => {
    const handleAsync = async () => {
      const group = await API.getGroup(session.accessToken);

      if (group) setGroup(group);

      const newStudents = await API.getStudents(session.accessToken);
      if (newStudents) setStudents(newStudents);
    };

    handleAsync();
  }, [session, updateStds]);

  useEffect(() => {
    if (!update) return;

    if (update.group) {
      notify('¡Grupo creado exitosamente!', true);
    } else if (update.students) {
      notify('¡Los alumnos se añadieron!', true);
    } else if (!update.group || !update.students) {
      notify(update.message, false);
    }

    return () => {
      setUpdate(null);
    };
  }, [update]);

  return (
    <main className="bg-[#E4E4E7] min-h-screen min-w-screen">
      <CreateGroup
        session={session}
        update={setUpdate}
        group={setGroup}
      />
      <StudentsFile
        session={session}
        update={setUpdate}
        students={addStudents}
      />
      <nav className="flex flex-col md:py-0 md:flex-row p-4 justify-center items-center gap-4 h-20 xl:h-32 bg-[#FAFAFA] shadow-md relative">
        <Link
          href={'/'}
          className="xl:absolute xl:start-12 font-bold text-3xl text-purple-600"
        >
          Fincity
        </Link>
      </nav>
      <Drawer session={session} />
      <div className="flex flex-row w-full h-full py-5">
        <div className="flex flex-col gap-5 place-content-between lg:mx-16 w-full xl:px-10">
          <div className="bg-[#FAFAFA] rounded-3xl grow h-36 lg:h-72 shadow-xl">
            <section>
              <div className="flex flex-row place-content-between items-center m-5 mt-8">
                <p className="ps-5 text-2xl text-gray-600 italic">Grupo</p>
                <button
                  onClick={() =>
                    document.getElementById('create_group').showModal()
                  }
                  className={`${
                    group ? 'hidden' : 'block'
                  } hover:border-2 hover:border-[#5D269A] hover:text-[#2F0F53] hover:bg-white border-2 border-[#5D269A] bg-[#5D269A] text-white rounded-lg p-2 m-3`}
                >
                  Crear grupo
                </button>
              </div>
              <div className="m-5 text-5xl xl:text-8xl flex justify-center items-center">
                {group ? (
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-700">
                    {group.description.length < 14
                      ? group.description
                      : group.description.slice(0, 13) + '...'}
                  </span>
                ) : (
                  <span className="italic text-xl">
                    No tienes ningún grupo creado
                  </span>
                )}
              </div>
            </section>
          </div>
          <div className="bg-[#FAFAFA] rounded-3xl grow shadow-xl">
            <section>
              <div className="flex flex-row place-content-between items-center m-5 mt-8">
                <p className="ps-5 text-2xl text-gray-600 italic">Alumnos</p>
                {group && (
                  <button
                    onClick={() =>
                      document.getElementById('create_students').showModal()
                    }
                    className="hover:border-2 hover:border-[#5D269A] hover:text-[#2F0F53] hover:bg-white border-2 border-[#5D269A] bg-[#5D269A] text-white  rounded-lg p-2 m-4 end"
                  >
                    Agregar
                  </button>
                )}
              </div>
              {group ? (
                students.length > 0 ? (
                  <ul className="w-full px-5 md:w-[35rem] xl:w-[55rem] md:mx-auto my-3 xl:my-12">
                    <div className="grid grid-cols-5 gap-6">
                      <span className="col-span-3 font-bold my-3 text-xl text-purple-600">
                        Nombre del alumno
                      </span>
                      <span className="col-span-2  font-bold my-3 text-xl text-purple-600">
                        Tareas
                      </span>
                    </div>
                    {students?.map(
                      (
                        { _id, first_name, last_name, user },
                        indexMain,
                        arrMain
                      ) => {
                        return (
                          <li
                            key={_id}
                            className="grid grid-cols-5 gap-6 items-center"
                          >
                            <div className="col-span-3 w-full grid grid-cols-3">
                              <p className="col-span-2 xl:col-span-1">
                                <span className="text-xs italic me-3">
                                  {indexMain + 1}.-{' '}
                                </span>
                                <span className="xl:hidden">
                                  {`${first_name} ${last_name}`.length < 12
                                    ? `${first_name} ${last_name}`
                                    : `${first_name} ${last_name}`.slice(0, 8) +
                                      '...'}
                                </span>
                                <span className="hidden xl:block">
                                  {`${first_name} ${last_name}`.length < 17
                                    ? `${first_name} ${last_name}`
                                    : `${first_name} ${last_name}`.slice(
                                        0,
                                        13
                                      ) + '...'}
                                </span>
                              </p>
                              <span className="text-md italic hidden xl:block">
                                @{user}
                              </span>
                              <div className="col-span-1 flex xl:space-x-3 justify-end text-end">
                                <button onClick={() => handleEditOne(_id)}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#434343"
                                    className="hover:fill-purple-800"
                                  >
                                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                  </svg>
                                </button>
                                <button onClick={() => handleRemoveOne(_id)}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#434343"
                                    className="hidden xl:block hover:fill-purple-800"
                                  >
                                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                  </svg>
                                </button>
                                <button onClick={() => handleViewOne(_id)}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#434343"
                                    className="hidden xl:block hover:fill-purple-800"
                                  >
                                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="col-span-2 flex">
                              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(
                                (value, index, arr) => {
                                  return (
                                    <span
                                      key={index}
                                      className={`${
                                        index === 0 && 'border-s-[1px]'
                                      }  ${
                                        indexMain === 0 && 'border-t-[1px]'
                                      } ${
                                        index === 0 &&
                                        indexMain === 0 &&
                                        'rounded-tl-md'
                                      } ${
                                        index === arr.length - 1 &&
                                        indexMain === 0 &&
                                        'rounded-tr-md'
                                      } ${
                                        index === 0 &&
                                        indexMain === arrMain.length - 1 &&
                                        'rounded-bl-md'
                                      } ${
                                        index === arr.length - 1 &&
                                        indexMain === arrMain.length - 1 &&
                                        'rounded-br-md'
                                      } bg-gray-400 xl:w-12 p-1 border-gray-600 border-e-[1px] border-b-[1px]  text-center`}
                                    >
                                      {value}
                                    </span>
                                  );
                                }
                              )}
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                ) : (
                  <p className="m-5 italic text-base">
                    Crea alumnos desde un archivo o añadiendo uno por uno...
                  </p>
                )
              ) : (
                <p className="m-5 italic text-base">
                  Crea un grupo para añadir alumnos
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}

export default withAuth(Dashboard);

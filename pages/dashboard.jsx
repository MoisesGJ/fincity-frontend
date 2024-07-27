import { withAuth } from '@/services/withAuth';

import Link from 'next/link';

import CreateGroup from '@/components/Dashboard/CreateGroup';
import StudentsFile from '@/components/Dashboard/StudentsFile';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import API from '@/services/API';

import 'react-toastify/dist/ReactToastify.css';

function Dashboard({ session }) {
  const [group, setGroup] = useState(false);
  const [students, setStudents] = useState([]);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    const handleAsync = async () => {
      const group = await API.getGroup(session.accessToken);

      if (group) setGroup(group);

      const newStudents = await API.getStudents(session.accessToken);
      if (newStudents) setStudents(newStudents);
    };

    handleAsync();
  }, [session, update]);

  return (
    <main className="bg-[#E4E4E7] min-h-screen min-w-screen">
      <CreateGroup
        session={session}
        update={setUpdate}
      />
      <StudentsFile
        session={session}
        update={setStudents}
        updatePage={setUpdate}
      />
      <nav className="flex flex-col py-16 md:py-0 md:flex-row p-4 justify-center items-center gap-4 h-20 bg-[#FAFAFA] shadow-md relative">
        <Link
          href={'/'}
          className="xl:absolute xl:start-12 font-bold text-3xl text-purple-600"
        >
          Fincity
        </Link>
        <div className="border-2 border-[#5D269A] rounded-xl flex justify-between px-3 w-full max-w-96">
          <input
            type="text"
            className="rounded-xl bg-[#FAFAFA] p-2"
            placeholder="Buscar"
          />
          <button className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5D269A"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </div>
      </nav>
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="bg-[#5D269A] drawer-button fixed w-9 h-12 md:h-2/3 top-1/2 transition -translate-y-1/2 rounded-r-md md:rounded-r-xl flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
              className="animate-pulse"
            >
              <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
            </svg>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-[#5D269A] min-h-full w-80 p-4 text-white">
            {/* Sidebar content here */}
            <li>
              <Link
                href={'/dashboard'}
                className="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="24px"
                  width="24px"
                  className="opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <span className="text-xl">
                  ¡Hola, {session.user.first_name}!
                </span>
              </Link>
            </li>
            <hr class="h-px my-3 bg-slate-50 border-0" />
            <li>
              <Link href={'mailto:help@fincity.com'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#D4D4D8"
                >
                  <path d="m480-80-10-120h-10q-142 0-241-99t-99-241q0-142 99-241t241-99q71 0 132.5 26.5t108 73q46.5 46.5 73 108T800-540q0 75-24.5 144t-67 128q-42.5 59-101 107T480-80Zm80-146q71-60 115.5-140.5T720-540q0-109-75.5-184.5T460-800q-109 0-184.5 75.5T200-540q0 109 75.5 184.5T460-280h100v54Zm-101-95q17 0 29-12t12-29q0-17-12-29t-29-12q-17 0-29 12t-12 29q0 17 12 29t29 12Zm-29-127h60q0-30 6-42t38-44q18-18 30-39t12-45q0-51-34.5-76.5T460-720q-44 0-74 24.5T344-636l56 22q5-17 19-33.5t41-16.5q27 0 40.5 15t13.5 33q0 17-10 30.5T480-558q-35 30-42.5 47.5T430-448Zm30-65Z" />
                </svg>
                Ayuda
              </Link>
            </li>
            <li>
              <Link
                href={'/'}
                onClick={() => signOut()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#D4D4D8"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
                Cerrar sesión
              </Link>
            </li>
          </div>
        </div>
      </div>
      <label htmlFor="drawer-"></label>
      <div className="flex flex-row  w-full h-full mt-5">
        <div className="flex flex-col gap-5 place-content-between lg:mx-16 w-full px-10">
          <div className="bg-[#FAFAFA] rounded-3xl grow h-36 lg:h-72 shadow-xl">
            <section>
              <div className="flex flex-row place-content-between">
                <p className="m-5">Grupo</p>
                <Link
                  href={'#Crear-Grupo'}
                  onClick={() =>
                    document.getElementById('create_group').showModal()
                  }
                  className={`${
                    group !== null && (group ? 'hidden' : 'block')
                  } hover:border-2 hover:border-[#5D269A] hover:text-[#2F0F53] hover:bg-white border-2 border-[#5D269A] bg-[#5D269A] text-white rounded-lg p-2 m-3`}
                >
                  Crear grupo
                </Link>
              </div>

              {group ? (
                <p className="m-5 text-xl font-bold">{group.description}</p>
              ) : (
                <p className="m-5 italic text-base">
                  No tienes ningún grupo creado
                </p>
              )}
            </section>
          </div>
          <div className="bg-[#FAFAFA] rounded-3xl grow h-60 lg:h-72 shadow-xl">
            <section>
              <div className="flex flex-row place-content-between">
                <p className="m-5">Alumnos</p>
                {group && (
                  <Link
                    href={'#Agregar-Alumnos'}
                    onClick={() =>
                      document.getElementById('create_students').showModal()
                    }
                    className="hover:border-2 hover:border-[#5D269A] hover:text-[#2F0F53] hover:bg-white border-2 border-[#5D269A] bg-[#5D269A] text-white  rounded-lg p-2 m-4 end"
                  >
                    Agregar
                  </Link>
                )}
              </div>
              {group ? (
                students.length >= 1 ? (
                  <p className="m-5">
                    {students?.map(({ _id, first_name, last_name }) => {
                      return (
                        <span
                          key={_id}
                          className="italic mx-3"
                        >
                          {`${first_name} ${last_name}`}
                        </span>
                      );
                    })}
                  </p>
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
          <div className="bg-[#FAFAFA] rounded-3xl  grow h-40 lg:h-72 shadow-xl">
            <section>
              <div className="flex flex-col">
                <p className="m-5">Recursos</p>
                <Link
                  href={'/'}
                  className="hover:border-2 hover:border-[#5D269A] hover:text-[#2F0F53] hover:bg-white border-2 border-[#5D269A] bg-[#5D269A] text-white  rounded-lg p-2 m-5 text-center my-auto"
                >
                  Carga un archivo aqui
                </Link>
              </div>
            </section>
          </div>
        </div>
        {/*<sidebar>
          <div className="bg-[#FAFAFA] rounded-3xl w-40 h-60 lg:w-96 lg:m-5 lg:h-96 shadow-lg mr-6 md:w-[250px]">
            <p className="p-4">Still figuring out</p>
          </div>
        </sidebar>*/}
      </div>
    </main>
  );
}

export default withAuth(Dashboard);

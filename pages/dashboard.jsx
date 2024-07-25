import { withAuth } from '@/services/withAuth';

import Link from 'next/link';

import CreateGroup from '@/components/Dashboard/CreateGroup';
import StudentsFile from '@/components/Dashboard/StudentsFile';
import { signOut } from 'next-auth/react';

function Dashboard() {
  return (
    <main className="bg-[#E4E4E7] min-h-fit min-w-fit">
      <CreateGroup />
      <StudentsFile />
      <nav className="flex p-4 justify-center items-center gap-4 h-20 bg-[#FAFAFA] shadow-md">
        <Link
          href={'/'}
          className=""
        >
          Fincity
        </Link>
        <div className="border-2 border-[#5D269A] rounded-xl flex content-center">
          <input
            type="text"
            className="rounded-xl bg-[#FAFAFA] p-2 w-96"
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
            className="btn bg-[#5D269A] drawer-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
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
          <div className="menu bg-[#5D269A] text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link href={'/'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#D4D4D8"
                >
                  <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#D4D4D8"
                >
                  <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                </svg>
                Shop
              </Link>
            </li>
            <li>
              <Link href={'/'}>
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
              <Link
                href={'#'}
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
      <div className="flex flex-row">
        <div className="flex flex-col place-content-between lg:mx-16">
          <div className="bg-[#FAFAFA] rounded-3xl w-[250px] h-[200px] lg:w-[800px] lg:h-72 lg:m-5 shadow-xl mx-10 md:w-[600px]">
            <section>
              <div className="flex flex-row place-content-between">
                <p className="m-5">Grupos</p>
                <Link
                  href={'#Crear-Grupo'}
                  onClick={() =>
                    document.getElementById('create_group').showModal()
                  }
                  className="hover:border-2 hover:border-[#5D269A] hover:text-[#2F0F53] hover:bg-white border-2 border-[#5D269A] bg-[#5D269A] text-white rounded-lg p-2 m-3"
                >
                  Crear grupo
                </Link>
              </div>

              <p className="m-5">No tienes ningún grupo creado</p>
            </section>
          </div>
          <div className="bg-[#FAFAFA] rounded-3xl w-[250px] h-[200px] lg:w-[800px] lg:h-72 lg:m-5 shadow-xl mx-10 mt-6 md:w-[600px]">
            <section>
              <div className="flex flex-row place-content-between">
                <p className="m-5">Alumnos</p>
                <Link
                  href={'#Agregar-Alumnos'}
                  onClick={() =>
                    document.getElementById('create_students').showModal()
                  }
                  className="hover:border-2 hover:border-[#5D269A] hover:text-[#2F0F53] hover:bg-white border-2 border-[#5D269A] bg-[#5D269A] text-white  rounded-lg p-2 m-4 end"
                >
                  Agregar
                </Link>
              </div>
              <p className="m-5">
                El archivo debe tener la siguiente estructura
              </p>
            </section>
          </div>
          <div className="bg-[#FAFAFA] rounded-3xl  w-[250px] h-[200px] lg:w-[800px] lg:h-72 lg:m-5 shadow-xl md:w-[600px] mx-10 mt-6">
            <section>
              <div className="flex flex-col">
                <p className="m-5">Recursos</p>
                <Link
                  href={'/'}
                  className="hover:border-2 hover:border-[#5D269A] hover:text-[#2F0F53] hover:bg-white border-2 border-[#5D269A] bg-[#5D269A] text-white  rounded-lg p-2 m-5 text-center"
                >
                  Carga un archivo aqui
                </Link>
              </div>
            </section>
          </div>
        </div>
        <sidebar>
          <div className="bg-[#FAFAFA] rounded-3xl w-40 h-60 lg:w-96 lg:m-5 lg:h-96 shadow-lg mr-6 md:w-[250px]">
            <p className="p-4">Still figuring out</p>
          </div>
        </sidebar>
      </div>
    </main>
  );
}

export default withAuth(Dashboard);

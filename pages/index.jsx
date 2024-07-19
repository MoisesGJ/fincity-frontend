'use client';

import { Chakra_Petch } from 'next/font/google';
import Image from 'next/image';
import skullCrasher from '../assets/characters/Skullcrasher.webp';
import listIcon from '../assets/icons/list-icon.webp';
import pigIcon from '../assets/icons/pig-icon.webp';
import cartIcon from '../assets/icons/cart-icon.webp';
import tasksIcon from '../assets/icons/tasks-icon.webp';
import logo from '../assets/Fincity_Logo.webp'; // Importa el logo
import LandingPageCard from '../components/LandingPageCard';
import Link from 'next/link';

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
});

export default function Home() {
  return (
    <>
      <header className="flex justify-between items-center py-4 px-8">
        <Image src={logo} alt="FinCity Logo" width={100} height={50} />
        <nav className="flex space-x-4">
          <Link href="/login" legacyBehavior>
            <a className="bg-purple-700 text-white px-4 py-2 rounded-3xl hover:bg-purple-500">Login</a>
          </Link>
          <Link href="/registro" legacyBehavior>
            <a className="bg-purple-700 text-white px-4 py-2 rounded-3xl hover:bg-purple-500">Regístrate</a>
          </Link>
        </nav>
      </header>
      <main className={chakra.className}>
        <section className="bg-zinc-50">
          <div className="relative bg-none">
            <div className="container mx-auto px-4 text-center py-24">
              <h1 className="text-gray-900 font-chakra text-4xl font-normal leading-9 mt-24">
                Ampliando los horizontes financieros de tus hijos
              </h1>
              <p className="text-gray-1000 font-chakra text-xl font-normal leading-10 opacity-100 mt-4">
                Creamos contenido y actividades para que tus hijos aprendan a
                tener independencia financiera desde temprana edad de una manera
                didáctica y divertida
              </p>
            </div>
            <div className="absolute top-0 right-0  h-full w-1/2 rounded-2xl bg-gradient-to-r from-transparent to-purple-700"></div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-8 flex flex-wrap justify-between">
          <div className="rounded-3xl bg-purple-200 bg-opacity-20 flex flex-col items-center justify-center mb-6 w-full md:w-5/12 h-72 p-4">
            <h2 className="text-center text-black font-chakra text-lg font-medium mb-3">
              Para los maestros
            </h2>
            <p className="text-center text-gray-700 font-chakra text-base font-normal leading-6">
              Ofrecemos a los educadores una variedad de recursos y
              herramientas para apoyar su enseñanza de educación financiera en
              el aula. Nos esforzamos por ser un recurso integral para
              educadores que desean enseñar educación financiera de manera
              efectiva y emocionante.
            </p>
          </div>
          <div className="rounded-3xl bg-purple-200 bg-opacity-20 flex flex-col items-center justify-center w-full md:w-5/12 h-72 p-4">
            <h2 className="text-center text-black font-chakra text-lg font-medium mb-3">
              Para los estudiantes
            </h2>
            <p className="text-center text-gray-700 font-chakra text-base font-normal leading-6">
              Los niños pueden aprender sobre el mundo de las finanzas de una
              manera divertida y accesible. Desde entender el valor del dinero
              hasta aprender a ahorrar y gastar de manera inteligente, el
              programa de FinCity hace que el aprendizaje sobre finanzas sea
              fácil y entretenido.
            </p>
          </div>
        </section>
        <section className="bg-zinc-50 flex flex-col ">
          <div className="bg-purple-700 bg-opacity-20 rounded-3xl  mx-auto w-11/12 md:w-7/12 p-6 mb-6">
          <div className="text-center justify-center align-middle">
          
        
      <h3 className="text-[#09090b] font-semibold text-lg leading-[15px] p-3">
        ¿Qué nos hace diferentes?
      </h3>
      <p className="text-[#09090b] text-base leading-[15px] p-3">
        Nos esforzamos por ofrecer una experiencia en línea que sea
        tanto educativa como divertida para los niños. Creemos en
        empoderar a los niños con el conocimiento necesario para tomar
        decisiones financieras inteligentes, desde ahorrar dinero para
        alcanzar metas hasta entender la importancia de un balance entre
        diversión y obligación.
      </p>
    </div>
  </div>
  <div className="text-center justify-center align-middle mt-8 md:mt-0 md:ml-8">
            
            <Image
              src={skullCrasher}
              className="hidden md:block md:justify-center md:align-middle md:m-auto"
              alt="Skullcrasher"
            />
          </div>
          <div className="bg-purple-200">
            <div className="text-center justify-center align-middle p-6 flex flex-col gap-8">
              <div>
                <h3 className="text-[#09090b] font-semibold text-lg leading-[15px] p-1">
                  ¿Cómo funciona?
                </h3>
                <p className="text-[#09090b] text-base leading-[15px] p-1">
                  ¡Es simple!
                </p>
              </div>
              <div className="md:hidden">
                <div className="carousel w-full">
                  <div id="item1" className="carousel-item w-full">
                    <LandingPageCard
                      icon={tasksIcon}
                      title="Seguimiento de Tareas y Ganancias"
                      content="Los padres pueden marcar las tareas completadas a medida que las realizan. Cada tarea completada les otorga una cantidad específica de dinero virtual, que se acumula en su cuenta."
                    />
                  </div>
                  <div id="item2" className="carousel-item w-full">
                    <LandingPageCard
                      icon={listIcon}
                      title="Asignación de Tareas: "
                      content="El maestro en conjunto con los padres pueden asignar tareas domésticas a sus hijos directamente a través de la aplicación. Desde hacer la cama hasta ayudar con la limpieza, las tareas se pueden personalizar según las necesidades y la edad del niño."
                    />
                  </div>
                  <div id="item3" className="carousel-item w-full">
                    <LandingPageCard
                      icon={cartIcon}
                      title="Canje de Recompensas:"
                      content="Cuando los niños hayan alcanzado suficiente dinero, ¡pueden canjearlo por recompensas emocionantes! Las opciones de recompensas son personalizables y están diseñadas para motivar y reforzar el comportamiento positivo."
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full py-2 gap-2">
                  <a href="#item1" className="btn btn-xs bg-[#5D269A]">
                    1
                  </a>
                  <a href="#item2" className="btn btn-xs bg-[#5D269A]">
                    2
                  </a>
                  <a href="#item3" className="btn btn-xs bg-[#5D269A]">
                    3
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex flex-row gap-2 h-96">
                  <div className="w-2/6 h-80">
                    <LandingPageCard
                      icon={pigIcon}
                      title="Seguimiento de Tareas y Ganancias"
                      content="Los padres pueden marcar las tareas completadas a medida que las realizan. Cada tarea completada les otorga una cantidad específica de dinero virtual, que se acumula en su cuenta."
                    />
                  </div>
                  <div className="w-2/6 h-80">
                    <LandingPageCard
                      icon={listIcon}
                      title="Asignación de Tareas: "
                      content="El maestro en conjunto con los padres pueden asignar tareas domésticas a sus hijos directamente a través de la aplicación. Desde hacer la cama hasta ayudar con la limpieza, las tareas se pueden personalizar según las necesidades y la edad del niño."
                    />
                  </div>
                  <div className="w-2/6 h-80">
                    <LandingPageCard
                      icon={cartIcon}
                      title="Canje de Recompensas:"
                      content="Cuando los niños hayan alcanzado suficiente dinero, ¡pueden canjearlo por recompensas emocionantes! Las opciones de recompensas son personalizables y están diseñadas para motivar y reforzar el comportamiento positivo."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center justify-center align-middle p-6 flex flex-col gap-8 pb-36">
              <p className="text-[#09090b] text-base leading-[15px] p-1">
                A través de esta experiencia, los niños aprenden sobre la
                importancia del trabajo duro, la responsabilidad y la gestión
                del dinero de una manera práctica y divertida. Además, pueden
                desarrollar habilidades de planificación y toma de decisiones
                mientras administran sus ganancias y eligen cómo gastarlas.
              </p>
            </div>
            <div className="bg-[#5D269A]">
              {/* Aquí se supone van unas ondas*/}
            </div>
          </div>
        </section>
        <section className="text-[#09090b] relative min-h-96 flex flex-col justify-center items-center gap-6 text-center p-8 bg-[#5D269A]">
          <div className="absolute inset-0 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 360 558"
              fill="none"
              className="absolute bottom-0 w-full"
            >
              <g filter="url(#filter0_d_756_384)">
                <path
                  d="M-26.3587 481.424C-55.352 478.348 -61.512 458.78 -60.9679 449.38L-60.9679 0L435.968 0V449.38C436.512 458.78 430.352 478.348 401.359 481.424C365.117 485.27 366.096 498.729 360.546 509.624C354.995 520.519 346.18 531.414 315.162 522.762C284.145 514.11 253.78 511.226 230.598 531.735C212.053 548.141 194.101 550 187.5 550C180.899 550 162.947 548.141 144.402 531.735C121.22 511.226 90.8554 514.11 59.8378 522.762C28.8201 531.414 20.0045 520.519 14.454 509.624C8.90346 498.729 9.88303 485.27 -26.3587 481.424Z"
                  fill="#1D1534"
                />
                <path
                  d="M-26.3587 481.424C-55.352 478.348 -61.512 458.78 -60.9679 449.38L-60.9679 0L435.968 0V449.38C436.512 458.78 430.352 478.348 401.359 481.424C365.117 485.27 366.096 498.729 360.546 509.624C354.995 520.519 346.18 531.414 315.162 522.762C284.145 514.11 253.78 511.226 230.598 531.735C212.053 548.141 194.101 550 187.5 550C180.899 550 162.947 548.141 144.402 531.735C121.22 511.226 90.8554 514.11 59.8378 522.762C28.8201 531.414 20.0045 520.519 14.454 509.624C8.90346 498.729 9.88303 485.27 -26.3587 481.424Z"
                  fill="url(#paint0_linear_756_384)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_756_384"
                  x="-65"
                  y="0"
                  width="505"
                  height="558"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_756_384"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_756_384"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_756_384"
                  x1="-61"
                  y1="21.9458"
                  x2="599.661"
                  y2="119.883"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#9855E9" />
                  <stop offset="0.505208" stop-color="#B381F2" />
                  <stop offset="1" stop-color="#F0E6FE" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="relative font-bold text-lg">
            ¿Listo para transformar la forma en que tus hijos aprenden sobre el
            dinero y la responsabilidad? ¡Únete a nosotros!
          </p>
          <p className="relative text-base">
            ¡Regístrate ahora para empezar a construir un futuro financiero
            brillante para tus hijos y hacer que el aprendizaje sea una
            experiencia emocionante para toda la familia!
          </p>
          <Link href={'/registro'} legacyBehavior>
            <a className="relative font-bold bg-white text-gray-950 px-5 py-2 rounded-3xl mb-10">Regístrate</a>
          </Link>
        </section>
      </main>

      <footer className={`${chakra.className} bg-[#5D269A] relative`}>
        <section className="p-5 pb-10 flex flex-col gap-3 text-xs">
          <h3 className="font-bold">Explora</h3>
          <Link href="/">Home</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/nosotros">Nosotros</Link>
        </section>
        <span className="font-bold text-base absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
          FinCity
        </span>
        <span className="text-xs text-center absolute bottom-3 left-1/2 transform -translate-x-1/2">
          Todos los derechos reservados
        </span>
      </footer>
    </>
  );
}

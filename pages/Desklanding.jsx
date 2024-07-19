import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/Fincity_Logo.webp'; // Asegúrate de que la ruta sea correcta
import useWindowSize from '../components/useWindowSize';

const DesktopView = () => {
  return (
    <>
      <header className="desktop-header flex justify-between items-center p-4 bg-white shadow-lg">
        <div className="logo">
          <Image src={logo} alt="FinCity Logo" width={120} height={50} />
        </div>
        <nav className="nav-links flex gap-4">
          <Link href="/login">
            <a className="text-gray-800 no-underline">Login</a>
          </Link>
          <Link href="/registro">
            <a className="bg-purple-700 text-white rounded-full px-4 py-2 no-underline">
              Regístrate
            </a>
          </Link>
        </nav>
      </header>
      <main className="font-chakra">
        <section className="relative hero-bg bg-zinc-50 py-24">
          <div className="container mx-auto px-4 text-left">
            <h1 className="hero-title text-gray-900 font-chakra text-4xl font-bold leading-tight">
              Ampliando los horizontes financieros de tus hijos
            </h1>
            <p className="hero-text text-gray-900 font-chakra text-lg font-normal leading-6 opacity-60 mt-4 max-w-xl">
              Creamos contenido y actividades para que tus hijos aprendan a tener independencia financiera desde temprana edad de una manera didáctica y divertida.
            </p>
          </div>
          {/* Wave SVGs */}
          <div className="wave">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="275"
              height="250"
              viewBox="0 0 90 276"
              fill="none"
            >
              <path
                d="M10.0528 -44.4337C-0.574153 -68.4854 12.1983 -82.2733 19.9129 -86.1607L132.69 -151.273L356.73 236.775L323.886 271.913C316.662 276.65 298.335 280.817 282.819 259.588C263.424 233.052 253.171 239.991 242.011 240.655C230.851 241.319 153.033 259.449 131.177 239.22C109.841 219.472 112.67 187.994 85.9223 179.3C64.524 172.346 54.9535 159.18 51.9776 154.026C49.0017 148.871 42.385 134 47.0612 111.991C52.9066 84.4801 36.9252 62.092 16.066 41.8402C-4.79326 21.5885 -0.110119 9.7061 6.04504 0.373335C12.2002 -8.95942 23.3365 -14.3691 10.0528 -44.4337Z"
                fill="black"
              />
              <path
                d="M10.0528 -44.4337C-0.574153 -68.4854 12.1983 -82.2733 19.9129 -86.1607L132.69 -151.273L356.73 236.775L323.886 271.913C316.662 276.65 298.335 280.817 282.819 259.588C263.424 233.052 253.171 239.991 242.011 240.655C230.851 241.319 153.033 259.449 131.177 239.22C109.841 219.472 112.67 187.994 85.9223 179.3C64.524 172.346 54.9535 159.18 51.9776 154.026C49.0017 148.871 42.385 134 47.0612 111.991C52.9066 84.4801 36.9252 62.092 16.066 41.8402C-4.79326 21.5885 -0.110119 9.7061 6.04504 0.373335C12.2002 -8.95942 23.3365 -14.3691 10.0528 -44.4337Z"
                fill="url(#paint0_linear_756_378)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_756_378"
                  x1="122.785"
                  y1="-145.587"
                  x2="179.964"
                  y2="397.619"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6B28BB" stop-opacity="0.6" />
                  <stop offset="0.505208" stop-color="#9855E9" />
                  <stop offset="0.676897" stop-color="#CFB0F8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>
      </main>
    </>
  );
};

export default DesktopView;

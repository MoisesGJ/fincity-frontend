import Link from 'next/link';
import styles from './styles.module.css';

export default function Page({ logOut, email, sendEmail }) {
  const handlerChildrenLogOut = () => {
    logOut();
  };

  const handlerChildrenSendEmail = async () => {
    sendEmail();
  };

  return (
    <main
      className={`flex justify-center items-center w-full h bg-slate-50 ${styles.bgPattern}`}
    >
      <div className="bg-slate-50 rounded-xl flex flex-col items-center justify-around h-96 w-screen md:w-1/2">
        <div className="relative -top-16 md:-top-8">
          <div className={`${styles.letterImage}`}>
            <div className={`${styles.animatedMail}`}>
              <div className={`${styles.backFold}`}></div>
              <div className={`${styles.letter}`}>
                <div className={`${styles.letterBorder}`}></div>
                <div className={`${styles.letterTitle}`}></div>
                <div className={`${styles.letterContext}`}></div>
                <div className={`${styles.letterStamp}`}>
                  <div className={`${styles.letterStampinner}`}></div>
                </div>
              </div>
              <div className={`${styles.topFold}`}></div>
              <div className={`${styles.body}`}></div>
              <div className={`${styles.leftFold}`}></div>
            </div>
          </div>
        </div>
        <div className="relative px-2 md:px-5 text-base text-purple-900 text-center mt-10">
          <h1 className="text-4xl font-bold">Revisa tu correo</h1>
          <p className="my-3">
            Te hemos enviado un correo a <i className="font-bold">{email}</i>{' '}
            para que puedas validar tu cuenta.
          </p>
          <p className="my-2">
            Si no lo encuentras puedes buscar en la carpeta de spam o si tuviste
            un error...
          </p>
          <p>
            <Link
              href="#"
              className="underline"
              onClick={handlerChildrenSendEmail}
            >
              Da clic aquí
            </Link>{' '}
            para que te enviemos otro.
          </p>
        </div>

        <button
          className="transition ease-in-out delay-150 bg-[#7e4fd4] px-5 py-3 text-white rounded-xl hover:bg-orange-500 hover:text-white hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={handlerChildrenLogOut}
        >
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}

import { useEffect, useState } from 'react';
import API from '@/services/API/account.api';
import { signOut } from 'next-auth/react';
import Router from 'next/router';

export default function Page() {
  const router = Router.useRouter();
  const token = router.query.token;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlerValidateAccount = async (tk) => {
      const validate = await API.validateAccount(tk);

      signOut({ redirect: false });

      if (!validate.error) {
        Router.push({
          pathname: '/login',
          query: {
            success: 'Cuenta validada',
          },
        });
      } else {
        Router.push({
          pathname: '/login',
          query: {
            error: '¡Error! Solicite un nuevo correo',
          },
        });
      }
    };

    if (token) handlerValidateAccount(token);
  }, [token]);

  return null;
}

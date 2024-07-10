import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import MyAdapter from '@/services/db/adapter';

export const authOptions = {
  adapter: MyAdapter(),
  providers: [
    // Proveedor de Google para iniciar sesión
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.sub,
          email: profile.email,
          first_name: profile.given_name,
          last_name: profile.family_name,
          googleId: profile.sub,
        };
      },
    }),
    // Proveedor de Credenciales para iniciar sesión con correo y contraseña
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          // Aquí debes autenticar al usuario. Asegúrate de definir `API` correctamente.
          const user = await API.authenticateUser({ email, password });

          if (user) {
            return { id: user._id, token: user.token };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  // Configura las páginas personalizadas de NextAuth
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/registro',
  },
  callbacks: {
    // Callback para agregar el token JWT a la sesión
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    // Callback para agregar el token de sesión
    async session({ session, token }) {
      if (session) {
        session.accessToken = token.accessToken;
        console.log(session.accessToken); // Esto puede ser eliminado en producción
      }
      return session;
    },
    // Callback para manejar el inicio de sesión
    async signIn({ profile, account }) {
      if (account.provider === 'google') {
        try {
          const user = await authOptions.adapter.createUser({
            first_name: profile.given_name,
            last_name: profile.family_name,
            email: profile.email,
            role: '6676ee2f23f3b664bbf5f50c',
            googleToken: account.access_token,
          });

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (e) {
          console.log(e);
          return null;
        }
        /*  // Verifica si el usuario ya existe en la base de datos usando Prisma
          let existingUser = await prisma.user.findUnique({
            where: { googleId: profile.id },
          });

          if (!existingUser) {
            // Crea un nuevo usuario si no existe usando Prisma
            await prisma.user.create({
              data: {
                first_name: profile.given_name,
                last_name: profile.family_name,
                email: profile.email,
                role: '6676ee2f23f3b664bbf5f50c',
                googleId: profile.id,
                googleToken: account.access_token,
              },
            });
          } else {
            // Actualiza la información del usuario si ya existe usando Prisma
            await prisma.user.update({
              where: { googleId: profile.id },
              data: {
                googleToken: account.access_token,
                updatedAt: new Date(),
              },
            });
          }

          return true;
        } catch (e) {
          console.error('Error handling Google sign-in:', e);
          return false;
        }
      }
    }*/
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

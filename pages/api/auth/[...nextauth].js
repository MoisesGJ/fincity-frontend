import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import MyAdapter from '@/services/db/adapter';
import API from '@/services/API';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.sub,
          email: profile.email,
          first_name: profile.given_name,
          last_name: profile.family_name,
          role: '6676ee2f23f3b664bbf5f50c',
          password: 'gr3at@3wdsG',
        };
      },
    }),

    CredentialsProvider({
      id: 'user',
      name: 'user',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        firstName: { label: 'First Name', type: 'text', optional: true },
        lastName: { label: 'Last Name', type: 'text', optional: true },
        role: { label: 'Role', type: 'text', optional: true },
      },
      async authorize(credentials, req) {
        const userExists = await API.getAccountByEmail(credentials.email);

        if (userExists) {
          const user = await API.authenticateUser(
            credentials.email,
            credentials.password
          );

          if (user) {
            return user;
          } else {
            throw new Error('Ya existe un cuenta con ese correo');
          }
        } else {
          const { email, password, firstName, lastName, role } = credentials;
          const userCreated = await authOptions.adapter.createUser({
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            role,
          });

          return userCreated;
        }
      },
    }),

    CredentialsProvider({
      id: 'students',
      name: 'students',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const userExists = await API.getAccountByEmail(credentials.email);

        if (!userExists) throw new Error('La cuenta no existe');

        const user = await API.authenticateUser(
          credentials.email,
          credentials.password
        );

        if (!user)
          throw new Error('Tu usuario y/o contraseña parecen no ser correctos');

        return user;
      },
    }),
  ],
  jwt: {
    encryption: true,
  },
  pages: {
    signIn: '/login',
    //error: '/registro',
    //signOut: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.role = user.role;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.emailVerified = token.emailVerified;

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'user') {
        await API.sendEmail(user.id, user.token);

        return true;
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MyAdapter(),
};

export default NextAuth(authOptions);

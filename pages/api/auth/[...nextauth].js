import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import MyAdapter from '@/services/db/adapter';
import API from '@/services/API/account.api';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.sub,
          email: profile.email,
          first_name: profile.given_name,
          last_name: profile.family_name,
          role: '667653a1d8f008e63c6b6a0b',
          password: 'gr3at@3wdsG',
        };
      },
    }),

    CredentialsProvider({
      id: 'usercreate',
      name: 'usercreate',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        firstName: { label: 'First Name', type: 'text', optional: true },
        lastName: { label: 'Last Name', type: 'text', optional: true },
      },
      async authorize(credentials, req) {
        const userExists = await API.getAccountByEmail(credentials.email);

        if (!userExists.error) {
          const user = await API.authenticateUser(
            credentials.email,
            credentials.password
          );

          if (!user.error) {
            return user;
          } else {
            throw new Error('Ya existe un cuenta con ese correo');
          }
        } else {
          const { email, password, firstName, lastName } = credentials;
          const userCreated = await authOptions.adapter.createUser({
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            role: '667653a1d8f008e63c6b6a0b',
          });

          console.log(userCreated);

          await API.sendEmail(userCreated.id, userCreated.token);

          return userCreated;
        }
      },
    }),

    CredentialsProvider({
      id: 'user',
      name: 'user',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const userExists = await API.getAccountByEmail(credentials.email);

        if (userExists.error) throw new Error('Credenciales inválidas');

        const user = await API.authenticateUser(
          credentials.email,
          credentials.password
        );

        if (user.error) throw new Error('Credenciales inválidas');

        return user;
      },
    }),

    CredentialsProvider({
      id: 'students',
      name: 'students',
      type: 'credentials',
      credentials: {
        user: { label: 'User', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await API.authenticateStudent(
          credentials.user,
          credentials.password
        );

        if (user.error)
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
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MyAdapter(),
};

export default NextAuth(authOptions);

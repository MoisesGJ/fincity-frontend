import db from '@/services/db/mongo';

export default function MyAdapter(client, options = {}) {
  return {
    async createUser(user) {
      const usersCollection = await db.collection('users');

      // Verificar si el usuario ya existe por email
      const existingUser = await usersCollection.findOne({ email: user.email });

      if (existingUser) {
        // Si el usuario ya existe, devolver el usuario existente
        return existingUser;
      }

      // Si el usuario no existe, crear uno nuevo
      const newUser = await usersCollection.insertOne(user);
      return newUser.data;
    },
    async getUser(id) {
      return;
    },
    async getUserByEmail(email) {
      return;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      return;
    },
    async updateUser(user) {
      return;
    },
    async deleteUser(userId) {
      return;
    },
    async linkAccount(account) {
      return;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      return;
    },
    async getSessionAndUser(sessionToken) {
      return;
    },
    async updateSession({ sessionToken }) {
      return;
    },
    async deleteSession(sessionToken) {
      return;
    },
    async createVerificationToken({ identifier, expires, token }) {
      return;
    },
    async useVerificationToken({ identifier, token }) {
      return;
    },
  };
}

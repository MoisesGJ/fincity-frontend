import API from '@/services/API';

export default function MyAdapter() {
  return {
    async createUser(user) {
      const existsUser = await API.getAccountByEmail(user.email);

      if (existsUser) throw new Error('El usuario ya existe');

      const response = await API.createNewUser(user);

      console.log(response);

      await API.sendEmail(response._doc._id, response.token);

      return {
        id: response._doc._id,
        email: response._doc.email,
        emailVerified: response._doc.emailVerified,
        first_name: response._doc.first_name,
        last_name: response._doc.last_name,
        role: response._doc.role,
        //token: response._doc.token,
      };
    },
    async getUser(id) {
      const user = await API.getAccountById(email);
      return user;
    },
    async getUserByEmail(email) {
      const user = await API.getAccountByEmail(email);
      return user;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      return null;
    },
    async updateUser(user) {
      return null;
    },
    async deleteUser(userId) {
      return null;
    },
    async linkAccount(account) {
      const { userId, access_token } = account;

      const accountUpdated = await API.updatedUser(userId, access_token);

      return { accountUpdated, ...account };
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return null;
    },
    async createVerificationToken({ identifier, expires, token }) {
      return null;
    },
    async useVerificationToken({ identifier, token }) {
      return null;
    },
  };
}

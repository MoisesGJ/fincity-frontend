import API from '@/services/API/account.api';

export default function MyAdapter() {
  return {
    async createUser(user) {
      const existsUser = await API.getAccountByEmail(user.email);

      if (!existsUser.error) throw new Error(existsUser.error);

      const response = await API.createNewUser(user);

      return {
        id: response._doc._id,
        email: response._doc.email,
        emailVerified: response._doc.emailVerified,
        first_name: response._doc.first_name,
        last_name: response._doc.last_name,
        role: response._doc.role,
        token: response.token,
      };
    },
    async getUser(id) {
      const user = await API.getAccountById(id);

      if (user.error) return null;

      return user;
    },
    async getUserByEmail(email) {
      const user = await API.getAccountByEmail(email);

      if (user.error) return null;

      return user;
    },
    async getUserByAccount(account) {
      const { providerAccountId } = account;

      const user = await API.findByAccessToken(providerAccountId);

      if (user.error) return null;

      return user;
    },
    async updateUser(user) {
      return null;
    },
    async deleteUser(userId) {
      return null;
    },
    async linkAccount(account) {
      const { userId, providerAccountId } = account;

      const accountUpdated = await API.updatedUser(userId, providerAccountId);

      if (accountUpdated.error) return null;

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

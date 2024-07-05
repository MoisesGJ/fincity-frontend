const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL;

const API = {
  async authenticateUser({ email, password }) {
    const r = await fetch(`${BASE_URI}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const response = await r.json();

    if (!response.data) throw new Error('Authentication failed');

    return await response.data;
  },

  async createNewUser(data) {
    const r = await fetch(`${BASE_URI}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await r.json();

    if (!response.ok) throw new Error('Failed to create user');

    return response;
  },

  findUserByGoogleId: async (googleId) => {
    const response = await fetch(`${BASE_URI}/users/auth/google/${googleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) return null;
    return response.json();
  },
};

export default API;

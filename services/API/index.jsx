const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL;

const API = {
  async createNewUser(data) {
    const r = await fetch(`${BASE_URI}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await r.json();

    if (!response.ok) throw new Error('Failed to create user', response.error);

    return response.data.user;
  },

  async updatedUser(id, partialData) {
    const r = await fetch(`${BASE_URI}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleId: partialData,
      }),
    });

    const response = await r.json();

    if (!response.ok) throw new Error('User not found', response.error);

    return response.data;
  },

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

  async getAccountById(id) {
    const r = await fetch(`${BASE_URI}/users/${id}`, {});

    const response = await r.json();

    if (!response.ok) throw new Error('User not found', response.error);

    return response.data;
  },

  async getAccountByEmail(email) {
    const r = await fetch(`${BASE_URI}/users/${email}`, {});

    const response = await r.json();

    if (!response.ok) return null;

    return response.data;
  },
};

export default API;

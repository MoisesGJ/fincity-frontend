const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL;

function AUTH_HEADER(auth) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth}`,
  };
}

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

    if (!response.ok) throw new Error(response.error.message);

    console.log(response.data.user);

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

    if (!response.ok) throw new Error(response.error.message);

    return response.data;
  },

  async authenticateUser(email, password) {
    const r = await fetch(`${BASE_URI}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const response = await r.json();

    if (!response.data) throw new Error(response.error.message);

    return await response.data.userResponse;
  },

  async getAccountById(id, auth) {
    const r = await fetch(`${BASE_URI}/users/${id}`, {
      headers: AUTH_HEADER(auth),
    });

    const response = await r.json();

    if (!response.ok) throw new Error(response.error.message);

    return response.data;
  },

  async getAccountByEmail(email) {
    const r = await fetch(`${BASE_URI}/users/email/${email}`, {});

    const response = await r.json();

    if (!response.ok) return null;

    return response.data;
  },

  async validateAccount(encoded, auth) {
    const decoded = atob(encoded);
    const r = await fetch(`${BASE_URI}/users/validate-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`,
        Authentication: `Basic ${decoded}`,
      },
    });

    const response = await r.json();

    if (!response.ok) throw new Error(response.error.message);

    return response.ok;
  },

  async validateAccountVerify(id) {
    const r = await fetch(`${BASE_URI}/users/validate/verify/${id}`, {});

    const response = await r.json();

    return response.ok;
  },

  async sendEmail(id, auth) {
    console.log(`${BASE_URI}/users/send-email`);

    const r = await fetch(`${BASE_URI}/users/send-email`, {
      method: 'POST',
      headers: AUTH_HEADER(auth),
      body: JSON.stringify({
        baseUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
      }),
    });

    const response = await r.json();

    //if (response.expireSess) return { expire: true };
    if (!response.ok) throw new Error(response.error.message);

    return response.data.emailId;
  },
};

export default API;

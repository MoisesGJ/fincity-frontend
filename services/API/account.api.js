import BASE_URI from './baseUrl';

function AUTH_HEADER(auth) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth}`,
  };
}

const API = {
  //AUTHS

  async authenticateUser(email, password) {
    try {
      const r = await fetch(`${BASE_URI}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const response = await r.json();

      if (response.error) return { error: response.error };

      return response.data.userResponse;
    } catch (error) {
      return { error };
    }
  },

  async authenticateStudent(user, password) {
    try {
      const r = await fetch(`${BASE_URI}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user, password: password }),
      });

      const response = await r.json();

      if (response.error) return { error: response.error };

      return response.data.userResponse;
    } catch (error) {
      return { error };
    }
  },

  //FINDS

  async findByAccessToken(accessToken) {
    try {
      const r = await fetch(`${BASE_URI}/users/access-token/${accessToken}`);

      const response = await r.json();

      if (!response.ok) return { error: response.error };

      return response.data.user;
    } catch (error) {
      return { error };
    }
  },

  //CREATE ACCOUNT
  async createNewUser(data) {
    try {
      const r = await fetch(`${BASE_URI}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await r.json();

      if (!response.ok) throw new Error(response.error);

      return response.data.user;
    } catch (error) {
      return { error };
    }
  },

  async sendEmail(id, auth) {
    try {
      const r = await fetch(`${BASE_URI}/users/send-email`, {
        method: 'POST',
        headers: AUTH_HEADER(auth),
        body: JSON.stringify({
          baseUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
        }),
      });

      const response = await r.json();

      if (!response.ok) return { error: response.error };

      return response.data.emailId;
    } catch (error) {
      return { error };
    }
  },

  //FINDS

  async findByAccessToken(accessToken) {
    try {
      const r = await fetch(`${BASE_URI}/users/access-token/${accessToken}`);

      const response = await r.json();

      if (!response.ok) return { error: response.error };

      return response.data.user;
    } catch (error) {
      return { error };
    }
  },

  //GETS

  async getAccountById(id) {
    try {
      const r = await fetch(`${BASE_URI}/users/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await r.json();

      if (!response.ok) return { error: response.error };

      return response.data;
    } catch (error) {
      return { error };
    }
  },

  async getAccountByEmail(email) {
    try {
      const r = await fetch(`${BASE_URI}/users/email/${email}`, {});

      const response = await r.json();

      if (!response.ok) return { error: response.error };

      return response.data;
    } catch (error) {
      return { error };
    }
  },

  async getRole(auth) {
    try {
      const r = await fetch(`${BASE_URI}/users/role/users`, {
        headers: AUTH_HEADER(auth),
      });

      const response = await r.json();

      if (!response.ok) return { error: response.error };

      return response.role;
    } catch (error) {
      return { error };
    }
  },

  //UPDATES

  async updatedUser(id, partialData) {
    try {
      const r = await fetch(`${BASE_URI}/users/google/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleId: partialData,
          emailVerified: true,
        }),
      });

      const response = await r.json();

      if (!response.ok) return { error: response.error };

      return response.data;
    } catch (error) {
      return { error };
    }
  },

  //VALIDATES

  async validateAccount(encoded, auth) {
    try {
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

      return response;
    } catch (error) {
      return { error };
    }
  },

  async validateAccountVerify(id) {
    try {
      const r = await fetch(`${BASE_URI}/users/validate/verify/${id}`, {});

      const response = await r.json();

      if (!response.ok) return { error: response.error };

      return response.ok;
    } catch (error) {
      return { error };
    }
  },
};

export default API;

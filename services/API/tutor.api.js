import BASE_URI from './baseUrl';

const API = {
  async createPIN(encoded, pin) {
    try {
      const decoded = atob(encoded);

      const r = await fetch(`${BASE_URI}/tutor/create-pin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${decoded}`,
        },
        body: JSON.stringify({ pin }),
      });

      const response = await r.json();

      return response;
    } catch (error) {
      return { error };
    }
  },
};

export default API;

import BASE_URI from './baseUrl';

function AUTH_HEADER(auth) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth}`,
  };
}

const API = {
  //GETS
  async getGroup(auth) {
    try {
      const r = await fetch(`${BASE_URI}/groups`, {
        method: 'GET',
        headers: AUTH_HEADER(auth),
      });

      const response = await r.json();

      if (!response.ok) return false;

      return response.data.group;
    } catch (e) {}
  },

  async getStudents(auth) {
    try {
      const r = await fetch(`${BASE_URI}/students`, {
        method: 'GET',
        headers: AUTH_HEADER(auth),
      });

      const response = await r.text();

      const students = JSON.parse(response);

      if (!students) return false;

      return students;
    } catch (e) {
      console.log(e);
    }
  },

  //POSTS

  async createGroup(auth, data) {
    try {
      const r = await fetch(`${BASE_URI}/groups`, {
        method: 'POST',
        headers: AUTH_HEADER(auth),
        body: JSON.stringify(data),
      });

      const response = await r.json();

      if (!response.ok) return { error: response.error };

      return response.data.group;
    } catch (e) {
      return { error: e };
    }
  },

  async createStudents(auth, data) {
    try {
      const r = await fetch(`${BASE_URI}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${auth}`,
        },

        body: JSON.stringify(data),
      });

      if (!r.ok) {
        return { error: r.error || 'Hubo un error' };
      }

      const text = await r.text();

      const blob = new Blob(['\ufeff', text]);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'my_students.csv');

      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (e) {
      return { error: e };
    }
  },
};

export default API;

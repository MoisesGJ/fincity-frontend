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
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/groups`, {
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
      const r = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/students`,
        {
          method: 'GET',
          headers: AUTH_HEADER(auth),
        }
      );

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
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/groups`, {
        method: 'POST',
        headers: AUTH_HEADER(auth),
        body: JSON.stringify(data),
      });

      const response = await r.json();

      if (!response.ok) return { error: response.error };

      return response.data.group;
    } catch (e) {
      return { error: response.error };
    }
  },

  async createStudents(auth, data) {
    try {
      const r = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/students`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
            Authorization: `Bearer ${auth}`,
          },

          body: JSON.stringify(data),
        }
      );

      const response = await r.json();

      console.log(response);

      if (!response.ok) return { error: response.error };

      return response.data.class;
    } catch (e) {
      return { error: response.error };
    }
  },
};

export default API;

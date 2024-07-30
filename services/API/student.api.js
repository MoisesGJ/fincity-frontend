import BASE_URI from './baseUrl';

function AUTH_HEADER(auth) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth}`,
  };
}

const API = {
  //GETS
};

export default API;

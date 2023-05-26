// api.js

const BASE_URL = 'http://127.0.0.1:3000/api/v1/';

export async function fetchData(endpoint, options = {}) {
  const url = BASE_URL + endpoint;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

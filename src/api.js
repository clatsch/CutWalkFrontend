// api.js

const BASE_URL = 'http://127.0.0.1:3000/api/v1/';

export async function fetchData(endpoint, options = {}) {
  const url = BASE_URL + endpoint;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return null; // Return null for non-JSON responses
    }
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

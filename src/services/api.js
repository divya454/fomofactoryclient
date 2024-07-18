const API_URL = 'http://localhost:3000';

export const getItems = async () => {
  const response = await fetch(`${API_URL}/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};
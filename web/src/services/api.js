const API_URL = 'https://apifakedelivery.vercel.app';

export const API = {
  listUsers: async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) throw new Error('Erro ao buscar usuários');
      return await res.json();
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getUser: async (id) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`);
      if (!res.ok) throw new Error('Erro ao buscar usuário');
      return await res.json();
    } catch (err) {
      throw new Error(err.message);
    }
  },

  listRestaurants: async () => {
    try {
      const response = await fetch(`${API_URL}/restaurants`);
      if (!response.ok) throw new Error('Erro ao buscar restaurantes');
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  listFoods: async () => {
    try {
      const response = await fetch(`${API_URL}/foods`);
      if (!response.ok) throw new Error('Erro ao buscar comidas');
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

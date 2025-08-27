import axios from 'axios'
const api = axios.create({ baseURL: '/api' })
const unwrap = (p) => p.then(r => r.data)

export const API = {
  listUsers: () => unwrap(api.get('/users')),
  getUser: (id) => unwrap(api.get(`/users/${id}`)),

  listRestaurants: () => unwrap(api.get('/restaurants')),
  getRestaurant: (id) => unwrap(api.get(`/restaurants/${id}`)),

  listFoods: () => unwrap(api.get('/foods')),
  getFood: (id) => unwrap(api.get(`/foods/${id}`)),
}

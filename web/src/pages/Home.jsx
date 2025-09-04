import { useEffect, useState } from 'react';
import { API } from '../services/api';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([API.listRestaurants(), API.listFoods()])
      .then(([restRes, foodRes]) => {
        setRestaurants(restRes);
        setFoods(foodRes);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-fluid">
      {/* Banner principal */}
      <div className="banner-container">
        <div className="banner-bg"></div>
      </div>
      <div className="container">
        <div className="row">
          {/* Os melhores restaurantes */}
          <h2 className="mb-3">Os melhores restaurantes</h2>
          {loading && <Skeleton rows={2} />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && !error && restaurants.length === 0 && (
            <EmptyState title="Nenhum restaurante encontrado" />
          )}
          {!loading && !error && restaurants.length > 0 && (
            <div className="row">
              {restaurants.map(r => (
                <div className="col-md-3 col-sm-6 col-xs-12 mb-4" key={r.id}>
                  <RestaurantCard r={r} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comidas mais pedidas */}
        <h2 className="mt-5 mb-3">Comidas mais pedidas</h2>
        {loading && <Skeleton rows={2} />}
        {!loading && !error && foods.length === 0 && (
          <EmptyState title="Nenhuma comida encontrada" />
        )}
        {!loading && !error && foods.length > 0 && (
          <div className="row">
            {foods.map(f => (
              <div className="col-md-4 col-sm-6 col-xs-12 mb-4" key={f.id}>
                <FoodCard f={f} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

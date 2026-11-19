import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import RestaurantList from './components/RestaurantList';
import RestaurantDetailModal from './components/RestaurantDetailModal';
import AddRestaurantModal from './components/AddRestaurantModal';
import CustomPointer from './components/CustomPointer';
import { useRestaurantStore } from './store/useRestaurantStore';

function App() {
  const fetchRestaurants = useRestaurantStore((s) => s.fetchRestaurants);
  const selectedRestaurant = useRestaurantStore((s) => s.selectedRestaurant);
  const clearSelectedRestaurant = useRestaurantStore(
    (s) => s.clearSelectedRestaurant,
  );
  const isAddModalOpen = useRestaurantStore((s) => s.isAddModalOpen);

  // 화면이 처음 그려졌을 때 한 번 목록을 가져온다
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return (
    <>
      <CustomPointer />
      <Header />
      <main>
        <CategoryFilter />
        <RestaurantList />
      </main>
      <aside>
        {selectedRestaurant && (
          <RestaurantDetailModal
            restaurant={selectedRestaurant}
            onClose={clearSelectedRestaurant}
          />
        )}
        {isAddModalOpen && <AddRestaurantModal />}
      </aside>
    </>
  );
}

export default App;

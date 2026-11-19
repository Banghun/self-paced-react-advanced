import { useEffect, useState } from 'react';
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
  const addRestaurant = useRestaurantStore((s) => s.addRestaurant);
  const selectedRestaurant = useRestaurantStore((s) => s.selectedRestaurant);
  const clearSelectedRestaurant = useRestaurantStore(
    (s) => s.clearSelectedRestaurant,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 화면이 처음 그려졌을 때 한 번 목록을 가져온다
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return (
    <>
      <CustomPointer />
      <Header onClickAddButton={() => setIsAddModalOpen(true)} />
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
        {isAddModalOpen && (
          <AddRestaurantModal
            onAddRestaurant={addRestaurant}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </aside>
    </>
  );
}

export default App;

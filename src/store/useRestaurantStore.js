import { create } from 'zustand';
import { ALL_CATEGORY } from '../constants/categories';
import { getRestaurants, postRestaurant } from '../api/restaurants';

export const useRestaurantStore = create((set, get) => ({
  restaurants: [],
  filterCategory: ALL_CATEGORY,
  selectedRestaurant: null,
  isAddModalOpen: false,

  fetchRestaurants: async () => {
    try {
      const data = await getRestaurants();
      set({ restaurants: data });
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  },

  addRestaurant: async (newRestaurant) => {
    await postRestaurant(newRestaurant);
    await get().fetchRestaurants();
  },

  setFilterCategory: (filterCategory) => set({ filterCategory }),
  selectRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
  clearSelectedRestaurant: () => set({ selectedRestaurant: null }),
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
}));

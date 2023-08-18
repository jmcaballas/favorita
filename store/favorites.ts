import { ref } from "vue";
import { defineStore } from "pinia";

type Favorites = {
  id: number;
  name: string;
  description?: string;
  tags?: string[];
  photo?: string;
  location?: string;
};

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<Favorites[]>([{ id: 0, name: "Banana" }]);

  function addFavorite(newFavorite: Favorites) {
    favorites.value.push(newFavorite);
  }

  function editFavorite(index: number, newFavorite: Favorites) {
    favorites.value[index] = newFavorite;
  }

  function deleteFavorite(index: number) {
    favorites.value.splice(index, 1);
  }

  return { favorites, addFavorite, editFavorite, deleteFavorite };
});

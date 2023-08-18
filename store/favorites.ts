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
  const favorites = ref<Favorites[]>([
    {
      id: 0,
      name: "Banana",
      description:
        "This is my favorite fruit! This is my favorite fruit! This is my favorite fruit! This is my favorite fruit! This is my favorite fruit!",
      photo: "/_nuxt/assets/img/banana.jpg",
      tags: ["fruit", "yellow", "yummy"],
      location: "Anywhere",
    },
    {
      id: 1,
      name: "Apple",
      description: "This is a red fruit!",
      photo: "/_nuxt/assets/img/apple.jpg",
      tags: ["fruit", "red", "delicious"],
      location: "Everywhere",
    },
    {
      id: 2,
      name: "Mango",
      description: "This is a good fruit!",
      photo: "/_nuxt/assets/img/mango.jpg",
      tags: ["fruit", "fresh"],
      location: "Elsewhere",
    },
    {
      id: 3,
      name: "Dragonfruit",
      description: "This is a yummy fruit!",
      photo: "/_nuxt/assets/img/dragonfruit.jpg",
    },
    {
      id: 4,
      name: "Watermelon",
      description: "This is a big fruit!",
      photo: "/_nuxt/assets/img/watermelon.jpg",
    },
    {
      id: 5,
      name: "Orange",
      description: "This is an orange fruit!",
      photo: "/_nuxt/assets/img/orange.jpg",
      tags: ["fruit", "orange", "citrus"],
      location: "Nowhere",
    },
  ]);

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

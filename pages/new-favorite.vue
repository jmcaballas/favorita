<template>
  <div class="container mx-auto p-4 h-screen">
    <form
      @submit.prevent="handleAdd"
      class="form-control flex justify-center w-full"
    >
      <NewFavoriteText v-model:name="name" v-model:description="description" />
      <NewFavoriteTags />
      <NewFavoritePhoto />
      <NewFavoriteLocation />
      <button class="btn btn-secondary mt-9">SUBMIT</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/store/favorites";
import { Favorites } from "@/types/types";

const store = useFavoritesStore();
const { addFavorite } = store;

const name = ref("");
const description = ref("");
const tags = ref([]);
const photo = ref("");
const location = ref("");

const handleAdd = () => {
  const newFavorite: Favorites = {
    id: 6,
    name: name.value,
    description: description.value,
    photo: "/_nuxt/assets/img/apple.jpg",
    tags: ["fruit", "red", "delicious"],
    location: "Everywhere",
  };

  addFavorite(newFavorite);
};
</script>

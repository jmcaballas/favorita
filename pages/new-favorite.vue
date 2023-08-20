<template>
  <div class="container mx-auto p-4 h-screen">
    <form
      @submit.prevent="handleAdd"
      class="form-control flex justify-center w-full"
    >
      <NewFavoriteText v-model:name="name" v-model:description="description" />
      <NewFavoriteTags :tags="tags" @add-tag="addTag" @remove-tag="removeTag" />
      <NewFavoritePhoto />
      <NewFavoriteLocation v-model:location="location" />
      <button class="btn btn-secondary mt-9">SUBMIT</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/store/favorites";
import { Favorites } from "@/types/types";

const store = useFavoritesStore();
const { addFavorite } = store;
const router = useRouter();

const name = ref("");
const description = ref("");
const tags = ref([] as string[]);
const photo = ref("");
const location = ref("");

const addTag = (tag: string) => {
  tags.value.push(tag);
};

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item) => item !== tag);
};

const handleAdd = () => {
  const newFavorite: Favorites = {
    id: 6,
    name: name.value,
    description: description.value,
    photo: "/_nuxt/assets/img/banana.jpg",
    tags: tags.value,
    location: location.value,
  };

  addFavorite(newFavorite);
  router.push({ path: "/" });
};
</script>

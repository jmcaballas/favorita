<template>
  <div class="container mx-auto p-4 h-screen">
    <form
      @submit.prevent="handleAdd"
      class="form-control flex justify-center w-full"
    >
      <NewFavoriteText v-model:name="name" v-model:description="description" />
      <NewFavoriteTags :tags="tags" @add-tag="addTag" @remove-tag="removeTag" />
      <NewFavoritePhoto @file-added="captureFile($event)" />
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

const name = useState("newName", () => "");
const description = useState("newDescription", () => "");
const tags = useState<string[]>("newTags", () => []);
const photo = useState<File | null>("newPhoto", () => null);
const location = useState("newLocation", () => "");

onMounted(() => {
  photo.value = null;
});

const addTag = (tag: string) => {
  tags.value.push(tag);
};

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item) => item !== tag);
};

const captureFile = (file: File) => {
  photo.value = file;
};

const handleAdd = async () => {
  const newFavorite: Favorites = {
    id: "0",
    name: name.value,
    description: description.value,
    tags: tags.value,
    location: location.value,
  };

  addFavorite(newFavorite, photo.value);

  name.value = "";
  description.value = "";
  tags.value = [];
  photo.value = null;
  location.value = "";

  await navigateTo({ path: "/" });
};
</script>

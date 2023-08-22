<template>
  <div class="container mx-auto p-4 h-screen">
    <form
      @submit.prevent="handleAdd"
      class="form-control flex justify-center w-full"
    >
      <EditFavoriteText v-model:name="name" v-model:description="description" />
      <EditFavoriteTags
        :tags="tags"
        @add-tag="addTag"
        @remove-tag="removeTag"
      />
      <EditFavoritePhoto />
      <EditFavoriteLocation v-model:location="location" />
      <button class="btn btn-secondary mt-9">SUBMIT</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/store/favorites";
import { Favorites } from "@/types/types";

const store = useFavoritesStore();
const { addFavorite } = store;

const name = useState("EditName", () => "");
const description = useState("EditDescription", () => "");
const tags = useState<string[]>("EditTags", () => []);
const photo = useState("EditPhoto", () => "");
const location = useState("EditLocation", () => "");

const addTag = (tag: string) => {
  tags.value.push(tag);
};

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item) => item !== tag);
};

const handleAdd = async () => {
  const EditFavorite: Favorites = {
    id: 6,
    name: name.value,
    description: description.value,
    photo: "/_nuxt/assets/img/banana.jpg",
    tags: tags.value,
    location: location.value,
  };

  addFavorite(EditFavorite);
  await navigateTo({ path: "/" });
};
</script>

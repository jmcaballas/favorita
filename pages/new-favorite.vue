<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between">
      <div class="flex items-center" @click="navigateHome">
        <div class="btn btn-xs btn-outline btn-secondary">
          <Icon name="ci:arrow-left-lg" size="1.5em" />
          BACK TO HOME
        </div>
      </div>

      <div class="flex items-center" @click="clearForm">
        <div class="btn btn-xs btn-outline btn-secondary">
          <Icon name="ci:undo" size="1.5em" />
          CLEAR FORM
        </div>
      </div>
    </div>

    <form
      @submit.prevent="handleAdd"
      class="form-control flex justify-center w-full"
    >
      <NewFavoriteText v-model:name="name" v-model:description="description" />
      <NewFavoriteTags :tags="tags" @add-tag="addTag" @remove-tag="removeTag" />
      <NewFavoritePhoto
        @file-added="captureFile($event)"
        @file-removed="removeImage"
        @toggle-disabled-new-button="toggleDisabledNewButton"
        :is-new-form-cleared="isNewFormCleared"
      />
      <NewFavoriteLocation v-model:location="location" />
      <button
        :class="{ 'btn-disabled': disabledNewButton }"
        class="btn btn-secondary mt-9"
      >
        SUBMIT
      </button>
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
const newPhotoUploadWarning = useState<boolean>("newPhotoUploadWarning");
const disabledNewButton = useState<boolean>("disableNewButton");
const isNewFormCleared = useState<boolean>("isNewFormCleared", () => false);

onMounted(() => {
  photo.value = null;
  newPhotoUploadWarning.value = false;
  disabledNewButton.value = false;
  isNewFormCleared.value = false;
});

const navigateHome = async () => {
  await navigateTo({ path: "/" });
};

const clearForm = () => {
  name.value = "";
  description.value = "";
  tags.value = [];
  photo.value = null;
  location.value = "";

  isNewFormCleared.value = true;

  setTimeout(() => {
    isNewFormCleared.value = false;
  }, 0);
};

const addTag = (tag: string) => {
  tags.value.push(tag);
};

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item) => item !== tag);
};

const captureFile = (file: File) => {
  photo.value = file;
};

const removeImage = () => {
  photo.value = null;
};

const toggleDisabledNewButton = (boolean: boolean) => {
  disabledNewButton.value = boolean;
};

const handleAdd = async () => {
  if (newPhotoUploadWarning.value === true) return;

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

  await navigateHome();
};

useHead({
  title: "Favorita - Add New Favorite",
});
</script>

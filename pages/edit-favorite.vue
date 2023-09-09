<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between">
      <div class="flex items-center" @click="goBack">
        <div class="btn btn-xs btn-outline btn-secondary">
          <Icon name="ci:arrow-left-lg" size="1.5em" />
          BACK TO FAVORITE
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
      @submit.prevent="handleEdit"
      class="form-control flex justify-center w-full"
    >
      <EditFavoriteText v-model:name="name" v-model:description="description" />
      <EditFavoriteTags
        :tags="tags"
        @add-tag="addTag"
        @remove-tag="removeTag"
      />
      <EditFavoritePhoto
        @file-updated="captureFile($event)"
        @file-removed="removeImage"
        @toggle-disabled-edit-button="toggleDisabledEditButton"
        :isEditFormCleared="isEditFormCleared"
      />
      <EditFavoriteLocation v-model:location="location" />
      <button
        :class="{ 'btn-disabled': disabledEditButton }"
        class="btn btn-secondary mt-9"
      >
        SUBMIT
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFavoritesStore } from "@/store/favorites";
import { Favorites } from "@/types/types";

const store = useFavoritesStore();
const { favorites } = storeToRefs(store);
const { editFavorite } = store;

const route = useRoute();
const router = useRouter();
const id = useState("EditId", () => "");

const favorite = computed(() =>
  favorites.value.find((item) => item.id === id.value)
);

const name = useState("EditName", () => "");
const description = useState("EditDescription", () => "");
const tags = useState<string[]>("EditTags", () => []);
const photo = useState<File | null>("newPhoto", () => null);
const location = useState("EditLocation", () => "");
const editPhotoUploadWarning = useState<boolean>("editPhotoUploadWarning");
const disabledEditButton = useState<boolean>("disabledEditButton");
const isEditFormCleared = useState<boolean>("isEditFormCleared", () => false);

onMounted(() => {
  id.value = route.query.id?.toString() ?? "";
  name.value = favorite.value?.name ?? "";
  description.value = favorite.value?.description ?? "";
  tags.value = favorite.value?.tags ?? [];
  location.value = favorite.value?.location ?? "";
  photo.value = null;
  editPhotoUploadWarning.value = false;
  disabledEditButton.value = false;
  isEditFormCleared.value = false;
});

const goBack = () => {
  router.back();
};

const clearForm = () => {
  name.value = "";
  description.value = "";
  tags.value = [];
  photo.value = null;
  location.value = "";

  isEditFormCleared.value = true;

  setTimeout(() => {
    isEditFormCleared.value = false;
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

const toggleDisabledEditButton = (boolean: boolean) => {
  disabledEditButton.value = boolean;
};

const handleEdit = async () => {
  if (editPhotoUploadWarning.value === true) return;

  const UpdatedFavorite: Favorites = {
    id: id.value,
    name: name.value,
    description: description.value,
    tags: tags.value,
    location: location.value,
  };

  editFavorite(id.value, UpdatedFavorite, photo.value);
  photo.value = null;
  await navigateTo({ path: "/" });
};

useHead({
  title: "Favorita - Edit Favorite",
});
</script>

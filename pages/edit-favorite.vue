<template>
  <div class="container mx-auto p-4 h-screen">
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
      <EditFavoritePhoto @file-updated="captureFile($event)" />
      <EditFavoriteLocation v-model:location="location" />
      <button class="btn btn-secondary mt-9">SUBMIT</button>
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
const id = useState("EditId", () => "");

const favorite = computed(() =>
  favorites.value.find((item) => item.id === id.value)
);

const name = useState("EditName", () => "");
const description = useState("EditDescription", () => "");
const tags = useState<string[]>("EditTags", () => []);
const photo = useState<File | null>("newPhoto", () => null);
const location = useState("EditLocation", () => "");
const photoUploadWarning = useState<Boolean>("photoUploadWarning");

onMounted(() => {
  id.value = route.query.id?.toString() ?? "";
  name.value = favorite.value?.name ?? "";
  description.value = favorite.value?.description ?? "";
  tags.value = favorite.value?.tags ?? [];
  location.value = favorite.value?.location ?? "";
  photo.value = null;
  photoUploadWarning.value = false;
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

const handleEdit = async () => {
  if (photoUploadWarning.value === true) return;

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
</script>

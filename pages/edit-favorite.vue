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
      <EditFavoritePhoto />
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
const id = route.query.id ? route.query.id.toString() : "";

const favorite = computed(() => favorites.value.find((item) => item.id === id));

const name = useState("EditName", () => favorite.value?.name ?? "");
const description = useState(
  "EditDescription",
  () => favorite.value?.description ?? ""
);
const tags = useState<string[]>("EditTags", () => favorite.value?.tags ?? []);
const photo = useState("EditPhoto", () => "");
const location = useState("EditLocation", () => favorite.value?.location ?? "");

const addTag = (tag: string) => {
  tags.value.push(tag);
};

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item) => item !== tag);
};

const handleEdit = async () => {
  const UpdatedFavorite: Favorites = {
    id: id,
    name: name.value,
    description: description.value,
    photo: "/_nuxt/assets/img/banana.jpg",
    tags: tags.value,
    location: location.value,
  };

  editFavorite(id, UpdatedFavorite);
  await navigateTo({ path: "/" });
};
</script>

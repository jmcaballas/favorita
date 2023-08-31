<template>
  <div class="container mx-auto p-4 flex flex-col items-center h-screen">
    <div>
      <NuxtLink to="/new-favorite" class="btn btn-secondary">
        <Icon name="ci:plus-circle-outline" size="2em" />
        ADD NEW FAVORITE
      </NuxtLink>
    </div>

    <HomeTagFilter
      :allTags="allTags"
      :selectedFilter="selectedFilter"
      @select-filter="selectFilter"
      @remove-filter="removeFilter"
    />

    <div class="mt-4 flex flex-wrap">
      <HomeFavoriteCard
        v-for="favorite in filteredFavorites"
        :key="favorite.id"
        :favorite="favorite"
        class="w-full md:w-1/3 lg:w-1/4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFavoritesStore } from "@/store/favorites";
import { Favorites } from "types/types";

const store = useFavoritesStore();
const { favorites, allTags } = storeToRefs(store);

const selectedFilter = useState("selectedFilter", () => "");

const selectFilter = (filter: string) => {
  selectedFilter.value = filter;
};

const removeFilter = async (filter: string) => {
  selectedFilter.value = "";
};

const filteredFavorites = computed(() => {
  const originalFavorites: Favorites[] = favorites.value;

  if (!selectedFilter.value) {
    return originalFavorites;
  }

  return originalFavorites.filter((fav) => {
    return fav.tags?.includes(selectedFilter.value);
  });
});
</script>

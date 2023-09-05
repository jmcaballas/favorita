<template>
  <ClientOnly>
    <div tabindex="0" class="container mx-auto p-4 flex flex-col items-center">
      <div>
        <NuxtLink to="/new-favorite" class="btn btn-secondary">
          <Icon name="ci:plus-circle-outline" size="2em" />
          ADD NEW FAVORITE
        </NuxtLink>
      </div>

      <HomeTagFilter
        :allTags="allTags"
        :selectedFilters="selectedFilters"
        @select-filter="selectFilter"
        @remove-filter="removeFilter"
      />

      <div v-if="loading">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <div v-else class="w-full">
        <div class="mt-4 flex flex-wrap" v-if="!isFilteredEmpty">
          <HomeFavoriteCard
            v-for="favorite in filteredFavorites"
            :key="favorite.id"
            :favorite="favorite"
            class="w-full md:w-1/3 lg:w-1/4"
          />
        </div>

        <div v-else class="text-center">
          No Favorites
          <Icon name="ci:sad" size="1.5em" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFavoritesStore } from "@/store/favorites";

const store = useFavoritesStore();
const { favorites, loading, allTags } = storeToRefs(store);

const selectedFilters = useState<string[]>("selectedFilter", () => []);
const isFilteredEmpty = useState<boolean>("isFilteredEmpty", () => false);

const selectFilter = (filter: string) => {
  if (!selectedFilters.value.includes(filter)) {
    selectedFilters.value.push(filter);
  }
};

const removeFilter = (filter: string) => {
  selectedFilters.value = selectedFilters.value.filter(
    (item) => item !== filter
  );

  isFilteredEmpty.value = false;
};

const filteredFavorites = computed(() => {
  if (selectedFilters.value.length === 0) {
    return favorites.value;
  }

  const filtered = favorites.value.filter((fav) =>
    selectedFilters.value.every((filter) => fav.tags?.includes(filter))
  );

  if (filtered.length === 0) isFilteredEmpty.value = true;

  return filtered;
});
</script>

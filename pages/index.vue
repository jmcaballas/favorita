<template>
  <div class="container mx-auto p-4 flex flex-col items-center h-screen">
    <div>
      <NuxtLink to="/new-favorite" class="btn btn-secondary">
        <Icon name="ci:plus-circle-outline" size="2em" />
        ADD NEW FAVORITE
      </NuxtLink>
    </div>

    <div class="mt-4 flex flex-wrap">
      <HomeFavoriteCard
        v-for="favorite in favorites"
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

const store = useFavoritesStore();
const { favorites } = storeToRefs(store);
</script>

<template>
  <header>
    <div
      class="card card-compact bg-base-200 m-4 shadow-md cursor-pointer md:h-[350px] lg:h-[380px]"
      @click="handleNavigate(favorite.id)"
    >
      <figure>
        <img
          v-if="favorite.photo"
          :src="favorite.photo"
          alt=""
          class="object-cover h-48 lg:h-60 w-full"
        />
        <Icon
          v-else
          name="ci:heart-outline"
          class="object-cover h-48 lg:h-60 w-full"
        />
      </figure>

      <div class="card-body flex-col">
        <h2 class="card-title">{{ favorite.name }}</h2>
        <div class="flex flex-wrap">
          <div
            v-for="tag in slicedTags"
            :key="tag"
            class="mr-1 mb-1 btn btn-xs btn-accent no-animation w-min"
          >
            {{ tag.length > 20 ? tag.slice(0, 20) + "..." : tag }}
          </div>
        </div>
        <div v-show="favorite?.location">
          <p class="location-text">
            <Icon name="ci:location-outline" size="1.5em" />
            {{
              favorite.location
                ? favorite.location.length > 30
                  ? favorite.location?.slice(0, 30) + "..."
                  : favorite.location
                : ""
            }}
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Favorites } from "@/types/types";

const props = defineProps<{
  favorite: Favorites;
}>();

const slicedTags = computed(() => props.favorite.tags?.slice(0, 4));

const handleNavigate = async (id: string) => {
  await navigateTo({ path: `/favorites-${id}` });
};
</script>

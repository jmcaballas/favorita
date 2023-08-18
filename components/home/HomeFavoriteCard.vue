<template>
  <header>
    <div class="card xl:card-side bg-base-200 m-4 shadow-md">
      <figure>
        <img :src="favorite.photo" alt="" class="object-cover h-48 w-full" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ favorite.name }}</h2>
        <p>{{ favorite.tags }}</p>
        <p>{{ favorite.location }}</p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  favorite: {
    id: number;
    name: string;
    description?: string;
    tags?: string[];
    photo?: string;
    location?: string;
  };
}>();
</script>

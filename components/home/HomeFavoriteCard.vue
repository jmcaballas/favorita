<template>
  <header>
    <div class="card lg:card-side bg-base-200">
      <figure>
        <img :src="favorite.photo" alt="" class="object-cover h-48 w-80" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ favorite.name }}</h2>
        <p>{{ favorite.description }}</p>
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

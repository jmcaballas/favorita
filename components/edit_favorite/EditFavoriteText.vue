<template>
  <label class="label">
    <span class="label-text">Edit Favorite Food</span>
  </label>
  <input
    type="text"
    placeholder="Type here"
    :value="name"
    @input="$emit('update:name', ($event.target as HTMLInputElement)?.value)"
    class="input input-bordered w-full input-secondary"
    required
  />
  <label class="label">
    <span class="label-text">Description</span>
  </label>
  <textarea
    type="text"
    placeholder="Type here"
    :value="description"
    @input="
      $emit('update:description', ($event.target as HTMLInputElement)?.value)
    "
    class="textarea textarea-bordered w-full textarea-secondary"
  />
</template>

<script setup lang="ts">
defineProps({
  name: String,
  description: String,
});
defineEmits(["update:name", "update:description"]);
</script>

<template>
  <label class="label">
    <span class="label-text">Add Location</span>
  </label>
  <input
    type="text"
    placeholder="Type here"
    :value="location"
    @input="
      $emit('update:location', ($event.target as HTMLInputElement)?.value)
    "
    class="input input-bordered w-full input-secondary"
  />
</template>

<script setup lang="ts">
defineProps({
  location: String,
});
defineEmits(["update:location"]);
</script>

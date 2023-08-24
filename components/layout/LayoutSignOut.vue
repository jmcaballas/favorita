<template>
  <div
    class="flex items-center hover:bg-secondary-focus"
    @click="handleSignOut"
  >
    <Icon name="ci:log-out" size="1.5em" />
    <p>Sign out</p>
  </div>
</template>

<script setup lang="ts">
const handleSignOut = async () => {
  try {
    const result = await signOutUser();
  } catch (error) {}
};
</script>

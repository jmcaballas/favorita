<template>
  <div class="flex items-center hover:bg-secondary-focus" @click="handleSignIn">
    <Icon name="ci:google" size="1.5em" />
    <p>Sign in</p>
  </div>
</template>

<script setup lang="ts">
const handleSignIn = async () => {
  try {
    const result = await signInUser("meow@meow.com", "meowmeow");
  } catch (error) {}
};
</script>

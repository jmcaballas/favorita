<template>
  <div class="flex items-center hover:bg-secondary-focus" @click="handleSignIn">
    <Icon name="ci:log-out" size="1.5em" />
    <p>Sign in</p>
  </div>
</template>

<script setup lang="ts">
const handleSignIn = async () => {
  try {
    const result = await signInUser("meow@meow.com", "meowmeow");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
</script>

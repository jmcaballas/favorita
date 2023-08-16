<template>
  <div>
    <header>
      <nav class="flex bg-red-200">
        <button @click="toggleDropdownMenu">
          <div>Icon</div>
        </button>
        <NuxtLink to="/">Mi Comida Favorita</NuxtLink>
      </nav>

      <ul :class="{ hidden: !showDropdownMenu }">
        <li>User</li>
        <li>Tags</li>
        <li>Theme</li>
        <li>Logout</li>
      </ul>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const showDropdownMenu = useState("showDropdownMenu", () => false);

const toggleDropdownMenu = () => {
  showDropdownMenu.value = !showDropdownMenu.value;
};

watch(route, () => {
  showDropdownMenu.value = false;
});
</script>

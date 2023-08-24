<template>
  <div class="dropdown dropdown-end" @focusout="handleDropdownFocusLost">
    <label tabindex="0" @click="handleDropdownClick">
      <Icon name="ci:chevron-down" size="1.5em" class="cursor-pointer" />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu z-[1] bg-base-200 rounded-box w-52"
      v-show="isDropdownOpen"
    >
      <li>
        <NuxtLink
          to="/new-favorite"
          onclick="document.activeElement.blur()"
          class="flex items-center hover:bg-secondary-focus"
        >
          <Icon name="ci:user" size="1.5em" />
          User
        </NuxtLink>
      </li>
      <li>
        <div
          class="flex items-center hover:bg-secondary-focus"
          @click="toggleTheme"
        >
          <Icon name="ci:bulb" size="1.5em" />
          <p>Theme</p>
        </div>
      </li>
      <li v-if="!firebaseUser">
        <LayoutSignIn />
      </li>
      <li v-else>
        <LayoutSignOut />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useFirebaseUserStore } from "@/store/firebaseUser";
import { storeToRefs } from "pinia";

const store = useFirebaseUserStore();
const { firebaseUser } = storeToRefs(store);

const isDropdownOpen = useState("isDropdownOpen", () => false);
const theme = useState("theme", () => "cupcake");

const handleDropdownClick = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleDropdownFocusLost = (event: FocusEvent) => {
  const { relatedTarget, currentTarget } = event;

  if (
    currentTarget instanceof HTMLElement &&
    relatedTarget instanceof HTMLElement
  ) {
    if (currentTarget.contains(relatedTarget)) {
      return;
    }
  }

  isDropdownOpen.value = false;
};

const toggleTheme = () => {
  theme.value = theme.value === "cupcake" ? "dracula" : "cupcake";
};

onMounted(() => {
  if (!localStorage.getItem("favorita-theme")) {
    localStorage.setItem("favorita-theme", "cupcake");
  }
  theme.value = localStorage.getItem("favorita-theme") || "cupcake";
  document.querySelector("html")?.setAttribute("data-theme", theme.value);
});

watch(theme, (newTheme) => {
  document.querySelector("html")?.setAttribute("data-theme", newTheme);
  localStorage.setItem("favorita-theme", newTheme);
});
</script>

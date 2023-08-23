<template>
  <header>
    <div class="bg-secondary">
      <div class="container mx-auto p-4">
        <nav class="flex justify-between">
          <NuxtLink to="/">
            <h1>Favorita</h1>
          </NuxtLink>

          <div
            class="dropdown dropdown-end"
            @focusout="handleDropdownFocusLost"
          >
            <label tabindex="0" @click="handleDropdownClick">
              <Icon
                name="ci:chevron-down"
                size="1.5em"
                class="cursor-pointer"
              />
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
              <li>
                <div class="flex items-center hover:bg-secondary-focus">
                  <Icon name="ci:log-out" size="1.5em" />
                  <p>Logout</p>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
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
  document.querySelector("html")?.setAttribute("data-theme", theme.value);
});

watch(theme, (newTheme) => {
  document.querySelector("html")?.setAttribute("data-theme", newTheme);
});
</script>

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
                  class="hover:bg-secondary-focus"
                >
                  User
                </NuxtLink>
              </li>
              <li><a class="hover:bg-secondary-focus">Theme</a></li>
              <li><a class="hover:bg-secondary-focus">Logout</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isDropdownOpen = useState("isDropdownOpen", () => false);

const handleDropdownClick = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleDropdownFocusLost = ({ relatedTarget, currentTarget }) => {
  if (
    relatedTarget instanceof HTMLElement &&
    currentTarget.contains(relatedTarget)
  )
    return;
  isDropdownOpen.value = false;
};
</script>

<template>
  <header>
    <div class="bg-secondary">
      <div class="container mx-auto p-4">
        <nav class="flex justify-between">
          <NuxtLink to="/">
            <h1>Favorita</h1>
          </NuxtLink>

          <div class="dropdown dropdown-end">
            <label tabindex="0">
              <Icon name="ci:chevron-down" size="1.5em" />
            </label>
            <ul
              tabindex="0"
              class="dropdown-content menu z-[1] bg-base-200 rounded-box w-52"
            >
              <li><a class="hover:bg-secondary-focus">User</a></li>
              <li><a class="hover:bg-secondary-focus">Tags</a></li>
              <li><a class="hover:bg-secondary-focus">Theme</a></li>
              <li><a class="hover:bg-secondary-focus">Logout</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

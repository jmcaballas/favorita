<template>
  <header>
    <div class="bg-primary">
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
              class="dropdown-content menu z-[1] bg-secondary rounded-box w-52"
            >
              <li><a>User</a></li>
              <li><a>Tags</a></li>
              <li><a>Theme</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

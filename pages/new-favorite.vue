<template>
  <div class="container mx-auto p-4 h-screen">
    <form
      @submit.prevent="console.log('Add New Favorite')"
      class="form-control flex justify-center w-full"
    >
      <NewFavoriteText />
      <NewFavoritePhoto />
      <NewFavoriteLocation />
    </form>
  </div>
</template>

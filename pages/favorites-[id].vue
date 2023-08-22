<template>
  <div class="container mx-auto p-4">
    <div class="card card-compact bg-base-200 m-4 shadow-md">
      <figure>
        <img :src="favorite?.photo" alt="" />
      </figure>

      <div class="card-body">
        <h2 class="card-title">{{ favorite?.name }}</h2>
        <div class="flex flex-wrap">
          <div
            v-for="tag in favorite?.tags"
            :key="tag"
            class="mr-1 mb-1 btn btn-xs btn-accent no-animation w-min"
          >
            {{ tag.length > 20 ? tag.slice(0, 20) + "..." : tag }}
          </div>
        </div>
        <div v-show="favorite?.location" class="flex items-center">
          <Icon name="ci:location-outline" />
          <p>{{ favorite?.location }}</p>
        </div>
        <p>{{ favorite?.description }}</p>
      </div>

      <div class="flex justify-around m-4">
        <div class="btn w-6/12" @click="handleEdit">
          <Icon name="ci:edit-pencil-01" size="2em" />
          EDIT
        </div>

        <button class="btn w-6/12" onclick="modal.showModal()">
          <Icon name="ci:trash-full" size="2em" />
          DELETE
        </button>
        <dialog id="modal" class="modal">
          <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">Are you sure?</h3>
            <p class="py-4">This will delete your Favorite permanently.</p>
            <div class="modal-action">
              <button class="btn" onclick="modal.close()">CANCEL</button>
              <button class="btn btn-secondary" @click="handleDelete">
                DELETE
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFavoritesStore } from "@/store/favorites";

const store = useFavoritesStore();
const { favorites } = storeToRefs(store);
const { deleteFavorite } = store;
const route = useRoute();

const favorite = computed(() =>
  favorites.value.find((item) => item.id === Number(route.params.id))
);

const handleEdit = async () => {
  await navigateTo({ path: "/edit-favorite" });
};

const handleDelete = async () => {
  deleteFavorite(Number(route.params.id));
  await navigateTo({ path: "/" });
};
</script>

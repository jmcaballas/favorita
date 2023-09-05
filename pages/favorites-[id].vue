<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center" @click="navigateHome">
      <div class="btn btn-xs btn-outline btn-secondary">
        <Icon name="ci:arrow-left-lg" size="1.5em" />
        BACK TO HOME
      </div>
    </div>

    <div class="card card-compact md:card-side bg-base-200 mt-4 shadow-md">
      <figure class="md:w-1/2">
        <img
          v-if="favorite?.photo"
          :src="favorite?.photo"
          alt=""
          class="max-h-[calc(100vh-144px)] object-contain"
        />
        <Icon v-else name="ci:heart-outline" size="16em" />
      </figure>

      <div class="card-body md:w-1/2">
        <h2 class="card-title">{{ favorite?.name }}</h2>
        <div class="flex flex-wrap">
          <div
            v-for="tag in favorite?.tags"
            :key="tag"
            class="mr-1 mb-1 btn btn-xs btn-accent no-animation"
          >
            {{ tag.length > 20 ? tag.slice(0, 20) + "..." : tag }}
          </div>
        </div>
        <div v-show="favorite?.location">
          <p class="location-text">
            <Icon name="ci:location-outline" size="1.5em" />
            {{ favorite?.location }}
          </p>
        </div>
        <p>{{ favorite?.description }}</p>

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
                <button
                  class="btn btn-secondary"
                  @click="handleDelete"
                  type="button"
                >
                  DELETE
                </button>
              </div>
            </form>
          </dialog>
        </div>
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
const id = route.params.id ? route.params.id.toString() : "";

const favorite = computed(() =>
  favorites.value.find((item) => item.id === route.params.id)
);

const navigateHome = async () => {
  await navigateTo({ path: "/" });
};

const handleEdit = async () => {
  await navigateTo({
    path: "/edit-favorite",
    query: {
      id: route.params.id,
    },
  });
};

const handleDelete = async () => {
  deleteFavorite(id);
  await navigateTo({ path: "/" });
};
</script>

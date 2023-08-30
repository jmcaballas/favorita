<template>
  <div class="flex items-end">
    <div class="grow">
      <label class="label">
        <span class="label-text">Tags</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full input-secondary"
        v-model="tempTag"
        @keydown.enter.prevent="addTag"
      />
    </div>
    <div class="ml-2">
      <button
        class="btn btn-secondary"
        @click.prevent="addTag"
        :disabled="disableButton"
      >
        ADD TAG
      </button>
    </div>
  </div>

  <div v-if="tags.length" class="flex flex-wrap mt-3">
    <div
      v-for="tag in tags"
      :key="tag"
      class="mr-3 mb-3 btn btn-xs btn-accent"
      @click="removeTag(tag)"
    >
      {{ tag.length > 20 ? tag.slice(0, 20) + "..." : tag }}
      <Icon name="ci:close-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
const tempTag = useState("tempTag", () => "");

const props = defineProps({
  tags: {
    type: Array as () => string[],
    required: true,
  },
});
const emit = defineEmits(["addTag", "removeTag"]);

const addTag = () => {
  if (tempTag.value.trim() !== "") {
    if (!props.tags.includes(tempTag.value)) {
      emit("addTag", tempTag.value.trim());
    }
    tempTag.value = "";
  }
};

const removeTag = (tag: string) => {
  emit("removeTag", tag);
};

const disableButton = computed(
  () => tempTag.value === "" || props.tags.some((t) => t === tempTag.value)
);
</script>

<template>
  <label class="label">
    <span class="label-text">Tags</span>
  </label>
  <input
    type="text"
    placeholder="Type here"
    class="input input-bordered w-full input-secondary"
    v-model="tempTag"
    @keyup="addTag"
  />
  <div class="flex flex-wrap my-3">
    <div
      v-for="tag in tags"
      :key="tag"
      class="mr-3 mb-3 btn btn-xs btn-accent"
      @click="removeTag(tag)"
    >
      {{ tag.length > 20 ? tag.slice(0, 20) + "..." : tag }}
      <Icon name="ci:close-lg" class="ml-1" />
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

const addTag = (e: KeyboardEvent) => {
  if (e.key === "Enter" && tempTag.value) {
    if (!props.tags.includes(tempTag.value)) {
      emit("addTag", tempTag.value);
    }
    tempTag.value = "";
  }
};

const removeTag = (tag: string) => {
  emit("removeTag", tag);
};
</script>

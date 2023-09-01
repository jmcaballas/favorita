<template>
  <select
    @change="handleselectFilter"
    class="select select-secondary w-full max-w-xs mt-5"
  >
    <option disabled selected>SORT BY TAG</option>
    <option v-for="tag in allTags" :key="tag" :value="tag">
      {{ tag.toUpperCase() }}
    </option>
  </select>

  <div v-if="selectedFilter" class="flex flex-wrap mt-3">
    <div class="mr-3 mb-3 btn btn-sm btn-accent" @click="handleRemoveFilter">
      {{
        selectedFilter.length > 20
          ? selectedFilter.toUpperCase().slice(0, 20) + "..."
          : selectedFilter.toUpperCase()
      }}
      <Icon name="ci:close-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  allTags: string[];
  selectedFilter: string;
}>();

const emit = defineEmits(["selectFilter", "removeFilter"]);

const handleselectFilter = (event: Event) => {
  const eventSelectedFilter = (event.target as HTMLSelectElement).value;
  emit("selectFilter", eventSelectedFilter);
};

const handleRemoveFilter = () => {
  emit("removeFilter", props.selectedFilter);
};
</script>

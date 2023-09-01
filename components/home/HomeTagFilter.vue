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

  <div class="flex flex-wrap mt-3">
    <div
      v-for="filter in selectedFilters"
      :key="filter"
      @click="handleRemoveFilter(filter)"
      class="mr-3 mb-3 btn btn-sm btn-accent"
    >
      {{
        filter.length > 20
          ? filter.toUpperCase().slice(0, 20) + "..."
          : filter.toUpperCase()
      }}
      <Icon name="ci:close-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  allTags: string[];
  selectedFilters: string[];
}>();

const emit = defineEmits(["selectFilter", "removeFilter"]);

const handleselectFilter = (event: Event) => {
  const eventSelectedFilter = (event.target as HTMLSelectElement).value;
  emit("selectFilter", eventSelectedFilter);
};

const handleRemoveFilter = (filter: string) => {
  emit("removeFilter", filter);
};
</script>

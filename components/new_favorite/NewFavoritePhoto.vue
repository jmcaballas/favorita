<template>
  <label class="label">
    <span class="label-text">Upload Photo</span>
  </label>
  <label v-if="photoUploadWarning" class="label">
    <span class="label-text text-error"
      >Only images are allowed to be uploaded.</span
    >
  </label>
  <input
    type="file"
    accept="image/*"
    class="file-input file-input-bordered w-full file-input-secondary"
    @change="onFileChange($event)"
  />
</template>

<script setup lang="ts">
const photoUploadWarning = useState("photoUploadWarning");

const emit = defineEmits(["file-added"]);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) {
    return;
  }

  const file = target.files[0];

  if (!file.type.startsWith("image/")) {
    photoUploadWarning.value = true;
  }

  emit("file-added", file);
};
</script>

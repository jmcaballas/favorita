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

const emit = defineEmits(["file-updated"]);

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) {
    return;
  }

  const file = target.files[0];

  if (!file.type.startsWith("image/")) {
    photoUploadWarning.value = true;
    return;
  } else {
    photoUploadWarning.value = false;
  }

  const compressedFile = await compressImage(file, {
    quality: 0.75,
    type: "image/webp",
  });

  emit("file-updated", compressedFile);
};
</script>

<template>
  <label class="label">
    <span class="label-text">Upload Photo</span>
  </label>
  <label v-if="newPhotoUploadWarning" class="label">
    <span class="label-text text-error"
      >Only images are allowed to be uploaded.</span
    >
  </label>
  <input
    type="file"
    accept="image/*"
    class="file-input file-input-bordered w-full file-input-secondary"
    @change="onFileChange($event)"
    ref="newFileInputRef"
  />

  <div v-if="newPhotoThumbnailUrl" class="flex items-center mt-3">
    <div class="avatar">
      <div class="w-10 mask mask-squircle mr-3">
        <img
          :src="newPhotoThumbnailUrl"
          :alt="newPhotoThumbnailName"
          width="50"
          height="50"
        />
      </div>
    </div>
    <div @click="handleRemoveImage" class="btn btn-xs btn-accent">
      {{ newPhotoThumbnailName }}
      <Icon name="ci:close-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
const newPhotoUploadWarning = useState("newPhotoUploadWarning");
const newPhotoThumbnailName = useState("newPhotoThumbnailName", () => "");
const newPhotoThumbnailUrl = useState("newPhotoThumbnailUrl", () => "");
const newFileInputRef = useState<HTMLInputElement | null>(
  "newFileInputRef",
  () => null
);

const props = defineProps<{
  isNewFormCleared: boolean;
}>();

const emit = defineEmits([
  "file-added",
  "file-removed",
  "toggleDisabledNewButton",
]);

onMounted(() => {
  newPhotoThumbnailName.value = "";
  newPhotoThumbnailUrl.value = "";
});

const handleRemoveImage = () => {
  emit("file-removed");
  newPhotoThumbnailName.value = "";
  newPhotoThumbnailUrl.value = "";

  if (newFileInputRef.value) {
    newFileInputRef.value.value = "";
  }
};

watch(
  () => props.isNewFormCleared,
  () => {
    if (props.isNewFormCleared) {
      newPhotoThumbnailName.value = "";
      newPhotoThumbnailUrl.value = "";

      if (newFileInputRef.value) {
        newFileInputRef.value.value = "";
      }
    }
  }
);

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) {
    return;
  }

  const file = target.files[0];

  if (!file.type.startsWith("image/")) {
    newPhotoUploadWarning.value = true;
    return;
  } else {
    newPhotoUploadWarning.value = false;
  }

  emit("toggleDisabledNewButton", true);

  const compressedFile = await compressImage(file, {
    quality: 0.75,
    type: "image/webp",
  });
  newPhotoThumbnailName.value = compressedFile.name;
  newPhotoThumbnailUrl.value = URL.createObjectURL(compressedFile);

  emit("file-added", compressedFile);
  emit("toggleDisabledNewButton", false);
};
</script>

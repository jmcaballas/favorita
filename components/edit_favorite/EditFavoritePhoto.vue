<template>
  <label class="label">
    <span class="label-text">Upload Photo</span>
  </label>
  <label v-if="editPhotoUploadWarning" class="label">
    <span class="label-text text-error"
      >Only images are allowed to be uploaded.</span
    >
  </label>
  <input
    type="file"
    accept="image/*"
    class="file-input file-input-bordered w-full file-input-secondary"
    @change="onFileChange($event)"
    ref="editFileInputRef"
  />

  <div v-if="editPhotoThumbnailUrl" class="flex items-center mt-3">
    <div class="avatar">
      <div class="w-10 mask mask-squircle mr-3">
        <img :src="editPhotoThumbnailUrl" alt="" width="50" height="50" />
      </div>
    </div>
    <div @click="handleRemoveImage" class="btn btn-xs btn-accent">
      {{ editPhotoThumbnailName }}
      <Icon name="ci:close-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
const editPhotoUploadWarning = useState("editPhotoUploadWarning");
const editPhotoThumbnailName = useState("editPhotoThumbnailName", () => "");
const editPhotoThumbnailUrl = useState("editPhotoThumbnailUrl", () => "");
const editFileInputRef = useState<HTMLInputElement | null>(
  "editFileInputRef",
  () => null
);

const emit = defineEmits([
  "file-updated",
  "file-removed",
  "toggleDisabledEditButton",
]);

onMounted(() => {
  editPhotoThumbnailName.value = "";
  editPhotoThumbnailUrl.value = "";
});

const handleRemoveImage = () => {
  emit("file-removed");
  editPhotoThumbnailName.value = "";
  editPhotoThumbnailUrl.value = "";

  if (editFileInputRef.value) {
    editFileInputRef.value.value = "";
  }
};

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) {
    return;
  }

  const file = target.files[0];

  if (!file.type.startsWith("image/")) {
    editPhotoUploadWarning.value = true;
    return;
  } else {
    editPhotoUploadWarning.value = false;
  }

  emit("toggleDisabledEditButton", true);

  const compressedFile = await compressImage(file, {
    quality: 0.75,
    type: "image/webp",
  });
  editPhotoThumbnailName.value = compressedFile.name;
  editPhotoThumbnailUrl.value = URL.createObjectURL(compressedFile);

  emit("file-updated", compressedFile);
  emit("toggleDisabledEditButton", false);
};
</script>

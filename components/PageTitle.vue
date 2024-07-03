<template>
  <div class="page-title">
    <h2 class="text-xl font-extrabold pt-4">{{ props.value }}</h2>
    <div class="divider"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  }
});
</script>
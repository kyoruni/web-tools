<template>
  <div class="image-generator">
    <PageTitle :value="'指定した大きさの画像を作るやつ'" />
    <div class="flex">
      <div class="form-control">
        <div class="label">
          <span class="label-text">幅(px)</span>
        </div>
        <input
          type="number"
          class="input input-bordered input-primary block w-full max-w-40 rounded ml-2"
          v-model="width"/>
      </div>
      <div class="form-control">
        <div class="label">
          <span class="label-text">高さ(px)</span>
        </div>
        <input
          type="number"
          class="input input-bordered input-primary block w-full max-w-40 rounded ml-2"
          v-model="height"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const width = ref(300);
const height = ref(300);
</script>
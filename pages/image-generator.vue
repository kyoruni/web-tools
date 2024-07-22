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
    <button class="btn btn-primary mr-2" :class="buttonClass" @click="execute">実行</button>
    <button class="btn btn-accent" :class="buttonClass" @click="clear">クリア</button>
    <div class="mt-4" v-if="imageUrl">
      <img :src="imageUrl" :alt="`${width}x${height}`"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const width = ref(300);
const height = ref(300);
const imageUrl = ref('');

const buttonClass = 'w-40 mt-4';

const execute = () => {
  generateImage();
}

const clear = () => {
  alert('clear');
}

const generateImage = () => {
  const canvas = document.createElement('canvas');
  canvas.width = width.value;
  canvas.height = height.value;
  const context = canvas.getContext('2d');

  context.fillStyle = '#ff99cc';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = '20px Arial';
  context.fillStyle = '#0000ff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(`${width.value} × ${height.value}`, canvas.width / 2, canvas.height / 2);

  imageUrl.value = canvas.toDataURL('image/png');
}
</script>
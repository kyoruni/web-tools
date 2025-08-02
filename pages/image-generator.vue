<template>
  <div class="image-generator">
    <PageTitle :value="'指定した大きさの画像を作るやつ'" />
    <div class="flex">
      <div class="form-control pr-2">
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
      <p>{{ currentBackgroundColor.hex }}</p>
    </div>
    <!-- 2段目 -->
    <div class="flex mt-2">
      <!-- 背景色 -->
      <div class="form-control">
        <div class="label mb-2">
          <span class="label-text">背景色</span>
        </div>
        <Twitter v-model="currentBackgroundColor"/>
      </div>
      <!-- 文字色 -->
      <div class="form-control ml-4">
        <div class="label mb-2">
          <span class="label-text">文字色</span>
        </div>
        <Twitter v-model="currentFontColor"/>
      </div>
    </div>
    <button class="btn btn-primary mr-2" :class="buttonClass" @click="execute">実行</button>
    <button class="btn btn-accent" :class="buttonClass" @click="clearButton">クリア</button>
    <div class="mt-4" v-if="imageUrl">
      <img :src="imageUrl" :alt="`${width}x${height}`"/>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Twitter } from '@ckpack/vue-color';

const width = ref(300);
const height = ref(300);
const imageUrl = ref('');
const currentBackgroundColor = ref({hex: '#0000FF'});
const currentFontColor = ref({hex: '#FFA500'});

const buttonClass = 'w-40 mt-4';

const execute = () => {
  clear();
  generateImage();
}

const clear = () => {
  width.value = 300;
  height.value = 300;
  imageUrl.value = '';
}

const clearButton = () => {
  if (window.confirm('クリアしますか？')) {
    clear();
  }
}

const generateImage = () => {
  const canvas = document.createElement('canvas');
  canvas.width = width.value;
  canvas.height = height.value;
  const context = canvas.getContext('2d');

  context.fillStyle = currentBackgroundColor.value.hex;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = '20px Arial';
  context.fillStyle = currentFontColor.value.hex;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(`${width.value} × ${height.value}`, canvas.width / 2, canvas.height / 2);

  imageUrl.value = canvas.toDataURL('image/png');
}
</script>
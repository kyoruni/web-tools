<template>
  <div class="image-generator">
    <PageTitle :value="'指定した大きさの画像を作るやつ'" />
    <!-- 1段目 -->
    <div class="flex">
      <!-- 幅 -->
      <div class="form-control pr-2">
        <div class="label">
          <span class="label-text">幅(px)</span>
        </div>
        <input
          type="number"
          class="input input-bordered input-primary block w-full max-w-40 rounded ml-2"
          v-model="width"/>
      </div>
      <!-- 高さ -->
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
    <!-- 2段目 -->
    <div class="flex flex-col md:flex-row mt-2">
      <!-- 背景色 -->
      <div class="form-control">
        <div class="label mb-2">
          <span class="label-text">背景色</span>
        </div>
        <ClientOnly>
          <Twitter v-model="currentBackgroundColor"/>
        </ClientOnly>
      </div>
      <!-- 文字色 -->
      <div class="form-control md:ml-4 mt-4 md:mt-0">
        <div class="label mb-2">
          <span class="label-text">文字色</span>
        </div>
        <Twitter v-model="currentFontColor"/>
      </div>
    </div>
    <!-- ダウンロードボタン -->
    <a :href="imageUrl" :download="fileName" class="btn btn-primary mt-4 mr-2 w-40">画像を保存</a>
    <button class="btn btn-accent w-40" @click="clear">クリア</button>
    <!-- 出力画像 -->
    <div class="mt-4" v-if="imageUrl">
      <img :src="imageUrl" :alt="`${width}x${height}`"/>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { Twitter } from '@ckpack/vue-color';

const width = ref(300);
const height = ref(300);
const imageUrl = ref('');
const currentBackgroundColor = ref({hex: '#0000FF'});
const currentFontColor = ref({hex: '#FFA500'});

const fileName = computed(() => {
  return `width_${width.value}_and_height_${height.value}.png`;
});

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

const clear = () => {
  width.value = 300;
  height.value = 300;
  currentBackgroundColor.value = {hex: '#0000FF'};
  currentFontColor.value = {hex: '#FFA500'};
  generateImage();
};

onMounted(() => {
  generateImage();
});

watch([width, height, currentBackgroundColor, currentFontColor], () => {
  generateImage();
});
</script>
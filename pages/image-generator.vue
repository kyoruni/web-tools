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
  </div>
</template>

<script setup>
import { ref } from 'vue';

const width = ref(300);
const height = ref(300);

const buttonClass = 'w-40 mt-4';

const execute = () => {
  alert('execute');
}

const clear = () => {
  alert('clear');
}
</script>
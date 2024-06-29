<template>
  <div class="percent-endecode">
    <h2 class="text-xl font-extrabold pt-4">パーセントエンコード/デコードするやつ</h2>
    <div class="divider"></div>
    <div class="flex items-center pb-4">
      <input type="radio" name="option" id="encode" class="radio radio-primary" value="encode" v-model="option" @change="onChange"/>
      <label for="encode" class="label cursor-pointer pr-4">エンコード</label>
      <input type="radio" name="option" id="decode" class="radio radio-primary" value="decode" v-model="option" @change="onChange"/>
      <label for="decode" class="label cursor-pointer">デコード</label>
    </div>
    <textarea class="textarea textarea-primary textarea-md w-full h-32 mb-4" placeholder="入力" v-model="inputText"></textarea>
    <textarea class="textarea textarea-primary textarea-md w-full h-32" placeholder="出力" v-model="outputText"></textarea>
    <button class="btn btn-primary w-40 mt-4 mb-4" :class="{ 'btn-disabled': isInputEmpty }" :aria-disabled="isInputEmpty">実行</button>
    <button class="btn btn-secondary w-40 mt-4 mb-4" :class="{ 'btn-disabled': isOutputEmpty }" :aria-disabled="isOutputEmpty" @click="copyButton">結果をコピー</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useClipboard } from '@vueuse/core';

const { copy, copied } = useClipboard();

const option = ref('encode');
const inputText = ref('');
const outputText = ref('');

const isInputEmpty = computed(() => {
  return inputText.value.length === 0;
});

const isOutputEmpty = computed(() => {
  return outputText.value.length === 0;
});

const onChange = (() => {
  inputText.value = '';
  outputText.value = '';
});

const copyButton = (() => {
  copy(outputText.value);
  if (copied) {
    alert('コピーしました！');
  } else {
    alert('コピーに失敗しました…');
  }
});
</script>
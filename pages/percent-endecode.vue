<template>
  <div class="percent-endecode">
    <PageTitle :value="'パーセントエンコード・デコードするやつ'"/>
    <div class="flex items-center pb-4">
      <input type="radio" name="option" id="encode" :class="radioClass" value="encode" v-model="option" @change="onChange"/>
      <label for="encode" :class="labelClass" class="pr-4">エンコード</label>
      <input type="radio" name="option" id="decode" :class="radioClass" value="decode" v-model="option" @change="onChange"/>
      <label for="decode" :class="labelClass">デコード</label>
    </div>
    <textarea :class="textAreaClass" class="mb-4" placeholder="入力" v-model="inputText"></textarea>
    <textarea :class="textAreaClass" placeholder="出力" v-model="outputText"></textarea>
    <button class="btn btn-primary mr-2" :class="buttonClass" @click="execute">実行</button>
    <button class="btn btn-secondary mr-2" :class="[isOutputEmpty ? 'btn-disabled' : '', buttonClass]" :aria-disabled="isOutputEmpty" @click="copyButton">結果をコピー</button>
    <button class="btn btn-accent" :class="buttonClass" @click="clear">クリア</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useClipboard } from '@vueuse/core';

const { copy, copied } = useClipboard();

const option = ref('encode');
const inputText = ref('');
const outputText = ref('');

const radioClass = 'radio radio-primary';
const labelClass = 'label cursor-pointer';
const textAreaClass = 'textarea textarea-primary textarea-md w-full h-32 rounded';
const buttonClass = 'w-40 mt-4';

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

const execute = (() => {
  if (isInputEmpty) {
    const optionKind = option.value === 'encode' ? 'エンコード' : 'デコード';
    alert(`${optionKind}したいテキストを入力してください！`);
    return;
  }

  if (option.value === 'encode') {
    outputText.value = encodeURIComponent(inputText.value);
  } else {
    outputText.value = decodeURIComponent(inputText.value);
  }
});

const copyButton = (() => {
  copy(outputText.value);
  if (copied) {
    alert('コピーしました！');
  } else {
    alert('コピーに失敗しました…');
  }
});

const clear = (() => {
  inputText.value = '';
  outputText.value = '';
});
</script>
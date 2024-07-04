<template>
  <div class="string-generator">
    <PageTitle :value="'指定した字数の文字を作るやつ'" />
    <p>widthType: {{ widthType }}</p>
    <p>charType: {{ charType }}</p>
    <p>kinds: {{ kinds }}</p>
    <div class="flex items-center pb-4">
      <input type="radio" name="widthType" id="half" :class="radioClass" value="half" v-model="widthType" @change="selectHalf" />
      <label for="half" :class="labelClass" class="pr-4">半角</label>
      <input type="radio" name="widthType" id="full" :class="radioClass" value="full" v-model="widthType" @change="selectFull" />
      <label for="full" :class="labelClass">全角</label>
    </div>
    <select class="select select-primary w-full max-w-xs rounded" v-model="charType">
      <option disabled selected value="">文字の種類を選択</option>
      <option v-for="kind in kinds" :key="kind.value" :value="kind.value">
        {{ kind.displayName }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const widthType = ref('half'); // half or full
const charType = ref('');
const kinds = ref([]);

const radioClass = 'radio radio-primary';
const labelClass = 'label cursor-pointer';

const selectHalf = (() => {
  charType.value = '';
  kinds.value = [
    { displayName: '数字', value: 'number' },
    { displayName: '英字(大文字)', value: 'upperAlpha' },
    { displayName: '英字(小文字)', value: 'lowerAlpha' },
  ];
});

const selectFull = (() => {
  charType.value = '';
  kinds.value = [
    { displayName: '数字', value: 'number' },
    { displayName: '英字(大文字)', value: 'upperAlpha' },
    { displayName: '英字(小文字)', value: 'lowerAlpha' },
    { displayName: 'ひらがな', value: 'hiragana' },
    { displayName: 'カタカナ', value: 'katakana' },
  ];
});

onMounted(() => {
  selectHalf();
});
</script>
<template>
  <div class="string-generator">
    <PageTitle :value="'指定した字数の文字を作るやつ'" />
    <p>widthType: {{ widthType }}</p>
    <p>charType: {{ charType }}</p>
    <p>kinds: {{ kinds }}</p>
    <div class="flex items-center pb-4">
      <input type="radio" name="widthType" id="half" :class="radioClass" value="half" v-model="widthType" />
      <label for="half" :class="labelClass" class="pr-4">半角</label>
      <input type="radio" name="widthType" id="full" :class="radioClass" value="full" v-model="widthType" />
      <label for="full" :class="labelClass">全角</label>
    </div>
    <select class="select select-primary w-full max-w-xs rounded" @change="selectKind">
      <option disabled selected>文字の種類を選択</option>
      <option v-for="kind in kinds" :key="kind.value" :value="kind.value">
        {{ kind.displayName }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const widthType = ref('half'); // half or full
const charType = ref('number');
const kinds = ref([]);

const radioClass = 'radio radio-primary';
const labelClass = 'label cursor-pointer';

const selectKind = ((event) => {
  charType.value = event.target.value;
});

onMounted(() => {
  kinds.value = [
    { displayName: '数字', value: 'number' },
    { displayName: '英字(大文字)', value: 'upperAlpha' },
    { displayName: '英字(小文字)', value: 'lowerAlpha' },
  ];
});
</script>
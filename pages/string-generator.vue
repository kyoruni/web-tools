<template>
  <div class="string-generator">
    <PageTitle :value="'指定した字数の文字を作るやつ'" />
    <div class="flex items-center pb-4">
      <input type="radio" name="charWidthType" id="half" :class="radioClass" value="half" v-model="charWidthType" />
      <label for="half" :class="labelClass" class="pr-4">半角</label>
      <input type="radio" name="charWidthType" id="full" :class="radioClass" value="full" v-model="charWidthType" />
      <label for="full" :class="labelClass">全角</label>
      ({{ charWidthType }})
    </div>
    <select class="select select-primary w-full max-w-xs rounded">
      <option disabled selected>文字の種類を選択</option>
      <option>aaaaa</option>
      <option>bbbbb</option>
      <option>ccccc</option>
      <option>ddddd</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const charWidthType = ref('half'); // half or full

const radioClass = 'radio radio-primary';
const labelClass = 'label cursor-pointer';
</script>
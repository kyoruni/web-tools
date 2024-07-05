<template>
  <div class="string-generator">
    <PageTitle :value="'指定した字数の文字を作るやつ'" />
    <div class="flex items-center pb-4">
      <input type="radio" name="widthType" id="half" :class="radioClass" value="half" v-model="widthType" @change="selectHalf" />
      <label for="half" :class="labelClass" class="pr-4">半角</label>
      <input type="radio" name="widthType" id="full" :class="radioClass" value="full" v-model="widthType" @change="selectFull" />
      <label for="full" :class="labelClass">全角</label>
    </div>
    <div class="flex">
      <select class="select select-primary w-full max-w-xs rounded" v-model="charType">
        <option disabled selected value="">文字の種類を選択</option>
        <option v-for="kind in kinds" :key="kind.value" :value="kind.value">
          {{ kind.displayName }}
        </option>
      </select>
      <input
        type="number"
        placeholder="文字数"
        class="input input-bordered input-primary block w-full max-w-40 rounded ml-2"
        v-model="charCount"/>
    </div>
    <textarea class="textarea textarea-primary textarea-md w-full h-32 rounded mt-4 mb-4" placeholder="ここに出力されます" v-model="outputText"></textarea>
    <button class="btn btn-primary mr-2" :class="[isInvalidExecute ? 'btn-disabled' : '', buttonClass]" @click="execute">実行</button>
    <button class="btn btn-secondary mr-2" :class="[isOutputEmpty ? 'btn-disabled' : '', buttonClass]" @click="copyButton">結果をコピー</button>
    <button class="btn btn-accent" :class="buttonClass" @click="clear">クリア</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useClipboard } from '@vueuse/core';

const { copy, copied } = useClipboard();
const widthType = ref('half'); // half or full
const charType = ref('');
const kinds = ref([]);
const charCount = ref(1);
const outputText = ref('');

const charRanges = {
  numberHalf: [0x0030, 0x0039], // 半角数字
  numberFull: [0xFF10, 0xFF19], // 全角数字
  upperAlphaHalf: [0x0041, 0x005A], // 半角英字(大)
  upperAlphaFull: [0xFF21, 0xFF3A], // 全角英字(大)
  lowerAlphaHalf: [0x0061, 0x007A], // 半角英字(小)
  lowerAlphaFull: [0xFF41, 0xFF5A], // 全角英字(小)
  hiragana: [0x3041, 0x3096], // ひらがな
  katakanaHalf: [0xFF66, 0xFF9D], // 半角カタカナ
  katakanaFull: [0x30A1, 0x30FA], // 全角カタカナ
  emoticons: [0x1F600, 0x1F64F], // 顔文字
  foods: [0x1F345, 0x1F37F], // たべもの
  animals: [0x1F400, 0x1F43F], // どうぶつ
  vehicles: [0x1F680, 0x1F6A4], // のりもの
};

const radioClass = 'radio radio-primary';
const labelClass = 'label cursor-pointer';
const buttonClass = 'w-40 mt-4';

const isInvalidExecute = computed(() => {
  const isNumber = !isNaN(charCount.value) && Number.isInteger(charCount.value);
  return !charType.value || charCount.value === 0 || !isNumber;
});

const isOutputEmpty = computed(() => {
  return outputText.value.length === 0;
});

const isHalf = computed(() => {
  return widthType.value === 'half';
});

const execute = (() => {
  if (isInvalidExecute.value) {
    alert('数値を指定してください！');
    return;
  }
  switch (charType.value) {
    case 'number':
      generateCharacters(isHalf.value ? 'numberHalf' : 'numberFull');
      break;
    case 'upperAlpha':
      generateCharacters(isHalf.value ? 'upperAlphaHalf' : 'upperAlphaFull');
      break;
    case 'lowerAlpha':
      generateCharacters(isHalf.value ? 'lowerAlphaHalf' : 'lowerAlphaFull');
      break;
    case 'hiragana':
      generateCharacters('hiragana');
      break;
    case 'katakana':
      generateCharacters(isHalf.value ? 'katakanaHalf' : 'katakanaFull');
      break;
    case 'emoticons':
    case 'foods':
    case 'animals':
    case 'vehicles':
      generateCharacters(charType.value);
      break;
    default:
      alert('作成中');
  }
});

const generateCharacters = ((selectedCharType) => {
  const count = charCount.value;
  let result = '';
  const range = charRanges[selectedCharType]; // 選択された範囲を取得
  const rangeCount = range[1] - range[0] + 1; // 現在の範囲内の絵文字の数を計算

  const loopSize = 1000; // 一度に処理する件数
  const loopCount = Math.ceil(count / loopSize);
  let currentLength = 0;

  for (let currentLoopCount = 0; currentLoopCount < loopCount; currentLoopCount++) {
    let tmpResult = '';
    for (let i = 0; i < loopSize && currentLength < count; i++) {
      const codePoint = range[0] + ((currentLoopCount * loopSize + i) % rangeCount);
      tmpResult += String.fromCodePoint(codePoint);
      currentLength++;
    }
    result += tmpResult;
  }

  outputText.value = result;
});

const selectHalf = (() => {
  charType.value = '';
  kinds.value = [
    { displayName: '数字', value: 'number' },
    { displayName: '英字(大文字)', value: 'upperAlpha' },
    { displayName: '英字(小文字)', value: 'lowerAlpha' },
    { displayName: 'カタカナ', value: 'katakana' },
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
    { displayName: '絵文字(顔文字)', value: 'emoticons'},
    { displayName: '絵文字(たべもの)', value: 'foods'},
    { displayName: '絵文字(どうぶつ)', value: 'animals'},
    { displayName: '絵文字(のりもの)', value: 'vehicles'},
  ];
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
  widthType.value = 'half';
  selectHalf();
  charCount.value = 1;
  outputText.value = '';
});

onMounted(() => {
  selectHalf();
});
</script>
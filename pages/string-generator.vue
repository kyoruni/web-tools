<template>
  <div class="string-generator">
    <PageTitle :value="'指定した字数の文字を作るやつ'" />
    <p>widthType: {{ widthType }}</p>
    <p>charType: {{ charType }}</p>
    <p>kinds: {{ kinds }}</p>
    <p>charCount: {{ charCount }}</p>
    <p>isHalf: {{ isHalf }}</p>
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
    <button class="btn btn-secondary mr-2" :class="buttonClass">結果をコピー</button>
    <button class="btn btn-accent" :class="buttonClass">クリア</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const widthType = ref('half'); // half or full
const charType = ref('');
const kinds = ref([]);
const charCount = ref(1);
const outputText = ref('');

const emojiRanges = [
  [0x1F600, 0x1F64F], // Emoticons 顔文字
];

const radioClass = 'radio radio-primary';
const labelClass = 'label cursor-pointer';
const buttonClass = 'w-40 mt-4';

const isInvalidExecute = computed(() => {
  return !charType.value || charCount.value === 0;
});

const isHalf = computed(() => {
  return widthType.value === 'half';
});

const execute = (() => {
  switch (charType.value) {
    case 'number':
      generateNumber();
      break;
    case 'upperAlpha':
      generateUpperAlpha();
      break;
    case 'lowerAlpha':
      generateLowerAlpha();
      break;
    case 'hiragana':
      generateHiragana();
      break;
    case 'katakana':
      generateKatakana();
      break;
    case 'emoji':
      generateEmoji();
      break;
    default:
      alert('作成中');
  }
});

const generateNumber = (() => {
  let chars = '';
  if (isHalf.value) {
    chars = '0123456789';
  } else {
    chars = '０１２３４５６７８９';
  }
  outputText.value = generate(chars, charCount.value);
});

const generateUpperAlpha = (() => {
  let chars = '';
  if (isHalf.value) {
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  } else {
    chars = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';
  }
  outputText.value = generate(chars, charCount.value);
});

const generateLowerAlpha = (() => {
  let chars = '';
  if (isHalf.value) {
    chars = 'abcdefghijklmnopqrstuvwxyz';
  } else {
    chars = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ';
  }
  outputText.value = generate(chars, charCount.value);
});

const generateHiragana = (() => {
  const chars = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょ';
  outputText.value = generate(chars, charCount.value);
});

const generateKatakana = (() => {
  let chars = '';
  if (isHalf.value) {
    chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｵﾝﾝﾞﾟｧｨｩｪｫｯｬｭｮｰ';
  } else {
    chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワオンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュョ';
  }
  outputText.value = generate(chars, charCount.value);
});

const generateEmoji = (() => {
  let start = 0;
  const count = charCount.value;
  let result = '';
  let totalCount = 0;
  while (result.length < count) {
    // 絵文字の範囲のループ
    for (const emojiRange of emojiRanges) {
      // 範囲内の絵文字の数
      const rangeCount = emojiRange[1] - emojiRange[0] + 1;
      // 開始位置が範囲の外に出ていない場合
      if (start < totalCount + rangeCount) {
        // 開始位置を範囲内に入れる
        const rangeStart = emojiRange[0] + (start - totalCount);
        // 範囲内で必要な絵文字の数を取得
        for (let i = rangeStart; i <= emojiRange[1] && result.length < count; i++) {
          result += String.fromCodePoint(i);
        }
        if (result.length >= count) {
          break;
        }
      }
      // 現在の範囲の絵文字数を合計に追加
      totalCount += rangeCount;
    }
    // 全範囲を一度通り過ぎたらカウントをリセット
    totalCount = 0;
    // 最初からループするために開始位置をリセット
    start = 0;
  }
  outputText.value = result;
});

const generate = (chars, length) => {
  let result = '';
  const charsLength = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars[i % charsLength];
  }
  return result;
};

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
    { displayName: '絵文字', value: 'emoji'}
  ];
});

onMounted(() => {
  selectHalf();
});
</script>
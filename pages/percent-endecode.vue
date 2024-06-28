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
    <button class="btn btn-primary w-40 mt-4 mb-4" @click="execute">実行</button>
    <button class="btn btn-secondary w-40 mt-4 mb-4" :class="{ 'btn-disabled': isOutputEmpty }" v-clipboard:copy="outputText" v-clipboard:success="onSuccess" v-clipboard:error="onError" :aria-disabled="isOutputEmpty">結果をコピー</button>
    <button class="btn btn-accent w-40 mb-4" @click="clear">クリア</button>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const option = ref('encode');
    const inputText = ref('');
    const outputText = ref('');

    const onChange = (() => {
      inputText.value = '';
      outputText.value = '';
    });

    const execute = (() => {
      if (inputText.value.length === 0) {
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
    const clear = (() => {
      inputText.value = '';
      outputText.value = '';
    });
    const onSuccess = () => {
      alert('コピーしました！');
    };
    const onError = () => {
      alert('コピーに失敗しました…');
    };

    const isOutputEmpty = computed(() => {
      return outputText.value.length === 0;
    });
    return {
      option,
      inputText,
      outputText,
      onChange,
      execute,
      clear,
      onSuccess,
      onError,
      isOutputEmpty,
    }
  },
})
</script>
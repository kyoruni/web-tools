<template>
  <div class="percent-endecode">
    <h2 class="text-xl font-extrabold pt-4">パーセントエンコード/デコードするやつ</h2>
    <div class="divider"></div>
    <div class="flex items-center pb-4">
      <input type="radio" name="radio-1" id="hoge" class="radio radio-primary" checked="checked" />
      <label for="hoge" class="label cursor-pointer pr-4">エンコード</label>
      <input type="radio" name="radio-1" id="fuga" class="radio radio-primary" />
      <label for="fuga" class="label cursor-pointer">デコード</label>
    </div>
    <textarea class="textarea textarea-primary textarea-md w-full h-32 mb-4" placeholder="入力"></textarea>
    <textarea class="textarea textarea-primary textarea-md w-full h-32" placeholder="出力"></textarea>
    <button class="btn btn-primary w-40 mt-4 mb-4">実行</button>
    <button class="btn btn-secondary w-40 mt-4 mb-4">結果をコピー</button>
  </div>
</template>
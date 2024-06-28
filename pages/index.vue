<template>
  <div class="web-tools" data-theme="cupcake">
    <div class="navbar bg-primary text-primary-content">
      <button class="btn btn-ghost text-xl">kyoruni/web-tools</button>
    </div>
    <div class="container flex min-h-screen">
      <Menu class="w-1/4" style="background: pink;" />
      <Tutorial />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>

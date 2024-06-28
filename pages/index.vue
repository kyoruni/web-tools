<template>
  <div class="web-tools" data-theme="cupcake">
    <div class="navbar bg-primary text-primary-content">
      <button class="btn btn-ghost text-xl">kyoruni/web-tools</button>
    </div>
    <div class="flex min-h-screen flex-col md:flex-row">
      <Menu class="w-full md:w-1/4" style="background: pink;" />
      <div class="content w-full md:w-3/4">
        <Tutorial />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>

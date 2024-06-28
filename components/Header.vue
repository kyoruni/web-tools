<template>
  <div class="navbar bg-primary text-primary-content">
    <button class="btn btn-ghost text-xl">
      <Icon :kind="'home'"/>
      <nuxt-link to="/">
        kyoruni/web-tools
      </nuxt-link>
    </button>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  components: {
    Icon
  }
}
</script>
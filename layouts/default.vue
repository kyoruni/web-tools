<template>
  <div class="web-tools" data-theme="cupcake">
    <Header />
    <!-- コンテンツ -->
    <div class="flex min-h-screen flex-col md:flex-row">
      <Menu class="w-full md:w-1/4" style="background: pink;" />
      <div class="content w-full md:w-3/4">
        <div class="p-2">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>
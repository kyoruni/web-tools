<template>
  <div class="web-tools" data-theme="cupcake">
    <Header />
    <!-- コンテンツ -->
    <div class="flex min-h-screen flex-col md:flex-row">
      <Menu class="w-full md:w-1/4" />
      <div class="content w-full md:w-3/4">
        <div class="p-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>
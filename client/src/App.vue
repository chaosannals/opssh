<template>
  <KeepAlive>
    <RouterView v-slot="{Component}">
        <component :is="Component"/>
    </RouterView>
  </KeepAlive>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">

</style>

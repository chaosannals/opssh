<template>
  <ElConfigProvider :locale="zhCn" size="small" :z-index="4000">
    <RouterView></RouterView>
  </ElConfigProvider>
  <LogoutDialog></LogoutDialog>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';


</script>

<style scoped lang="scss"></style>

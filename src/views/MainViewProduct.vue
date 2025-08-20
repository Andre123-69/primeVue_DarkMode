<template>
  <div class="">
    <theme-switcher />
    <Sidebar />
    <div >
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/MenuBar.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
</script>

<style scoped>

</style>

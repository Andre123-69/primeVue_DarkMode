<template>
  <div class="">
    <theme-switcher v-if="!isNoLayoutRoute" />
    <Sidebar v-if="!isNoLayoutRoute" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from "../components/MenuBar.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";

const route = useRoute();
const isNoLayoutRoute = computed(() => route.meta.noLayout);
</script>

<style scoped>

</style>

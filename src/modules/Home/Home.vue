<template >
    
    <Toast />

</template>
<script setup>

import { useToast } from 'primevue/usetoast';

const toast = useToast();


</script>
<style scoped>
  .fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
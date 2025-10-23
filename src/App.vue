<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNotificationStore } from './stores/notification'

const notificationStore = useNotificationStore()

onMounted(() => {
  // Initialize notification check
  notificationStore.checkNewProducts()
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>


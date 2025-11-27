<script setup lang="ts">
import { onMounted } from 'vue'

const api = import.meta.env.VITE_API_URL
onMounted(async () => {
  try {
    const response = await fetch(`${api}/hello/`)
    const data = await response.json()
    console.log('Response data:', data)
  } catch (error) {
    console.error('Fetch error:', error)
  }
})
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style>

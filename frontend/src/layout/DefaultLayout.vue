<script setup lang="ts">
import { animate } from 'animejs'
import { ref, watch } from 'vue'

import DefaultNavigation from '@/main/components/DefaultNavigation.vue'
import TopNavbar from '@/main/components/TopNavbar.vue'

const isSidebarOpen = ref(false)

watch(
  () => isSidebarOpen.value,
  () => {
    const navigationClass = '.navigation'
    const navigationElement = document.querySelector(navigationClass)!

    if (isSidebarOpen.value) {
      animate(navigationClass, {
        translateY: ['10%', '0%'],
        opacity: [0, 1],
        duration: 200,
        easing: 'easeInOutQuad',
        end: () => {
          navigationElement.classList.remove('hidden')
        },
      })
      return
    }

    animate(navigationClass, {
      translateY: ['0%', '10%'],
      opacity: [1, 0],
      duration: 200,
      easing: 'easeInOutQuad',
      end: () => {
        setTimeout(() => {
          navigationElement.classList.add('hidden')
        }, 200)
      },
    })
  },
)
</script>

<template>
  <div class="block md:flex">
    <div class="relative md:static">
      <TopNavbar v-model="isSidebarOpen" class="md:hidden" />

      <DefaultNavigation
        class="navigation absolute top-12 left-0 hidden h-[calc(100vh-48px)] w-full md:static md:top-auto md:block"
      />
    </div>

    <div class="h-[calc(100vh-48px)] w-full overflow-auto p-4 md:h-screen">
      <slot />
    </div>
  </div>
</template>

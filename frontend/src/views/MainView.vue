<script setup lang="ts">
import { animate, splitText, stagger } from 'animejs'
import { onMounted } from 'vue'

import ButtonComponent from '@/components/ButtonComponent.vue'
import TitleComponent from '@/components/TitleComponent.vue'

onMounted(() => {
  const titleElement = document.querySelector('.title')
  if (!titleElement) return

  const { chars } = splitText(titleElement as HTMLElement, { words: false, chars: true })

  titleElement.addEventListener('mouseenter', () => {
    animate(chars, {
      y: [
        { to: '-0.5rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 },
      ],
      delay: stagger(50),
      ease: 'inOutCirc',
    })
  })
})
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <p class="font-montserrat mb-1 text-xl font-medium lg:mb-2 lg:text-2xl">Welcome to:</p>
    <TitleComponent class="title text-5xl lg:text-6xl" />
    <p
      class="font-montserrat mt-6 w-60 text-center text-lg font-medium lg:mt-8 lg:w-90 lg:text-2xl"
    >
      You can create your own recipes with AI and browse other’s recipes.
    </p>

    <div class="mt-6 flex gap-4 lg:mt-8">
      <ButtonComponent link to="/add-recipe">Add Recipe</ButtonComponent>
      <ButtonComponent link to="/all-recipes">Browse Recipes</ButtonComponent>
    </div>
  </div>
</template>

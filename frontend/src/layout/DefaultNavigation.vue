<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div
    class="bg-yellow flex h-[calc(100vh-48px)] justify-center pt-16 md:h-screen md:w-64 md:flex-col md:justify-start md:pt-4 md:pl-8 lg:w-72"
  >
    <h1
      class="text-dark-blue font-montserrat hidden cursor-default text-2xl font-bold tracking-wide md:block lg:text-4xl"
    >
      Recipefy
    </h1>

    <nav class="flex flex-col gap-4 md:mt-16">
      <RouterLink
        to="/add-recipe"
        class="font-montserrat hover:text-dark-blue flex items-center gap-1 text-lg font-semibold lg:text-xl"
      >
        <span>Add Recipe</span>
        <ChevronRight :size="20" :stroke-width="3" />
      </RouterLink>

      <RouterLink
        to="/recipes"
        class="font-montserrat hover:text-dark-blue flex items-center gap-1 text-lg font-semibold lg:text-xl"
      >
        <span>Recipes</span>
        <ChevronRight :size="20" :stroke-width="3" />
      </RouterLink>
    </nav>
  </div>
</template>

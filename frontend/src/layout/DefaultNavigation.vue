<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import TitleComponent from '@/components/TitleComponent.vue'
import { PATHS } from '@/router/paths'
</script>

<template>
  <div
    class="bg-yellow flex h-[calc(100vh-48px)] justify-center pt-16 md:h-screen md:w-64 md:flex-col md:justify-start md:pt-4 md:pl-8 lg:w-72"
  >
    <TitleComponent class="hidden md:block" />

    <nav class="flex flex-col gap-4 md:mt-16">
      <RouterLink
        to="/add-recipe"
        class="font-montserrat hover:text-dark-blue flex items-center gap-1 text-lg font-semibold lg:text-xl"
      >
        <span>Add Recipe</span>
        <ChevronRight :size="20" :stroke-width="3" />
      </RouterLink>

      <RouterLink
        :to="PATHS.myRecipes"
        class="font-montserrat hover:text-dark-blue flex items-center gap-1 text-lg font-semibold lg:text-xl"
      >
        <span>My Recipes</span>
        <ChevronRight :size="20" :stroke-width="3" />
      </RouterLink>

      <RouterLink
        :to="PATHS.allRecipes"
        class="font-montserrat hover:text-dark-blue flex items-center gap-1 text-lg font-semibold lg:text-xl"
      >
        <span>All Recipes</span>
        <ChevronRight :size="20" :stroke-width="3" />
      </RouterLink>

      <RouterLink
        :to="PATHS.authenticate"
        class="font-montserrat hover:text-dark-blue flex items-center gap-1 text-lg font-semibold lg:text-xl"
      >
        <span>Authenticate</span>
        <ChevronRight :size="20" :stroke-width="3" />
      </RouterLink>
    </nav>
  </div>
</template>

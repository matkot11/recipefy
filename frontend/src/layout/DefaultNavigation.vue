<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import TitleComponent from '@/components/TitleComponent.vue'
import { PATHS } from '@/router/paths'
import { useAuthStore } from '@/store/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div
    class="bg-yellow flex justify-center pt-16 md:h-screen md:w-64 md:flex-col md:justify-start md:pt-4 md:pl-8 lg:w-72"
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
        v-if="!authStore.user"
        :to="PATHS.register"
        class="font-montserrat hover:text-dark-blue flex items-center gap-1 text-lg font-semibold lg:text-xl"
      >
        <span>Authenticate</span>
        <ChevronRight :size="20" :stroke-width="3" />
      </RouterLink>

      <button
        v-else
        class="font-montserrat hover:text-dark-blue flex cursor-pointer items-center gap-1 text-lg font-semibold lg:text-xl"
        @click="authStore.handleLogout()"
      >
        <span>Logout</span>
        <ChevronRight :size="20" :stroke-width="3" />
      </button>
    </nav>
  </div>
</template>

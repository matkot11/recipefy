<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { PATHS } from '@/router/paths'

withDefaults(
  defineProps<{
    link?: boolean
    to?: (typeof PATHS)[keyof typeof PATHS] | undefined
  }>(),
  {
    link: false,
    to: undefined,
  },
)
</script>

<template>
  <component
    :is="link ? RouterLink : 'button'"
    :to="to"
    class="bg-yellow text-dark-blue font-montserrat hover:bg-dark-blue hover:text-yellow cursor-pointer rounded-md px-4 py-2 text-lg font-semibold transition-all duration-200 lg:py-3 lg:text-xl"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

import TitleComponent from '@/components/TitleComponent.vue'

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

defineProps<{
  modelValue: boolean
}>()
</script>

<template>
  <div class="bg-yellow relative flex w-full items-center justify-center gap-2 py-2">
    <button @click="$emit('update:modelValue', !modelValue)" class="absolute left-2 cursor-pointer">
      <component :is="modelValue ? X : Menu" :stroke-width="3" />
    </button>

    <TitleComponent />
  </div>
</template>

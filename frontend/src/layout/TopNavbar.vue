<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

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

    <h1 class="text-dark-blue font-montserrat cursor-default text-2xl font-bold tracking-wide">
      Recipefy
    </h1>
  </div>
</template>

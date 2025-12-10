<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

defineProps<{
  label: string
  name: string
  type: string
  placeholder: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <label :for="name" class="font-montserrat mb-1 text-sm font-medium">{{ label }}</label>
    <Field
      :name="name"
      :type="type"
      :placeholder="placeholder"
      class="font-montserrat focus:outline-dark-blue active:outline-dark-blue lg:text-md rounded-md border-2 p-2 text-sm"
    />
    <ErrorMessage :name="name" class="font-montserrat text-sm text-red-500" />
  </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import * as yup from 'yup'

import { useAuthStore } from '@/auth/store'
import type { LoginData } from '@/auth/typings'
import ButtonComponent from '@/commons/components/ButtonComponent.vue'
import InputComponent from '@/commons/components/InputComponent.vue'
import router from '@/router'
import { PATHS } from '@/router/paths'

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  })
  .required()

const { handleLogin } = useAuthStore()

const handleSubmit = async ({ email, password }: LoginData) => {
  await handleLogin({ email, password })
  router.push(PATHS.main)
}
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <h2 class="font-montserrat mb-8 text-2xl font-semibold">Login</h2>

    <Form
      :validation-schema="schema"
      @submit="(values) => handleSubmit(values as LoginData)"
      class="flex w-full max-w-md flex-col gap-4"
    >
      <InputComponent label="Email" name="email" type="email" placeholder="Email" />
      <InputComponent label="Password" name="password" type="password" placeholder="Password" />

      <ButtonComponent type="submit" class="mt-2">Login</ButtonComponent>
    </Form>

    <RouterLink
      :to="PATHS.register"
      class="font-montserrat hover:text-dark-blue mt-4 text-sm text-gray-500"
    >
      Don't have an account? Click here to register
    </RouterLink>
  </div>
</template>

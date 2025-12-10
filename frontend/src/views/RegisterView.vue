<script setup lang="ts">
import { Form } from 'vee-validate'
import * as yup from 'yup'

import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import router from '@/router'
import { PATHS } from '@/router/paths'
import { useAuthStore } from '@/store/authStore'
import type { RegisterData } from '@/typings/authStore'

const schema = yup
  .object({
    username: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    password_confirmation: yup
      .string()
      .required()
      .min(8)
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  })
  .required()

const { handleRegister, handleLogin } = useAuthStore()

const handleSubmit = async ({ username, email, password, password_confirmation }: RegisterData) => {
  await handleRegister({ username, email, password, password_confirmation })
  await handleLogin({ email, password })
  router.push(PATHS.main)
}
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <h2 class="font-montserrat mb-8 text-2xl font-semibold">Register</h2>

    <Form
      :validation-schema="schema"
      @submit="(values) => handleSubmit(values as RegisterData)"
      class="flex w-full max-w-md flex-col gap-4"
    >
      <InputComponent label="Username" name="username" type="text" placeholder="Username" />
      <InputComponent label="Email" name="email" type="email" placeholder="Email" />
      <InputComponent label="Password" name="password" type="password" placeholder="Password" />
      <InputComponent
        label="Confirm Password"
        name="password_confirmation"
        type="password"
        placeholder="Confirm Password"
      />

      <ButtonComponent type="submit" class="mt-2">Register</ButtonComponent>
    </Form>

    <RouterLink
      :to="PATHS.login"
      class="font-montserrat hover:text-dark-blue mt-4 text-sm text-gray-500"
    >
      Already have an account? Click here to login
    </RouterLink>
  </div>
</template>

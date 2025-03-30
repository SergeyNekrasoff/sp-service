<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import BaseFormInput from '@/components/base/BaseFormInput.vue'
import { useI18n } from 'vue-i18n'
import { useCheckoutStore } from '@/stores/checkout'

interface IError {
  username: string
  email: string
  password: string
}

const { t } = useI18n()

const apiCheckoutStore = useCheckoutStore()
const { createAccount } = useCheckoutStore()
const { loading } = storeToRefs(apiCheckoutStore)

const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const error = reactive<IError>({
  username: '',
  email: '',
  password: '',
})

watch(username, (value) => {
  if (value.trim() === '') {
    error['username'] = t('error.required', { field: 'Username' })
  } else {
    error['username'] = ''
  }
})

watch(email, (value) => {
  if (value.trim() === '') {
    error['email'] = t('error.required', { field: 'Email' })
  } else {
    error['email'] = ''
  }
})

watch(password, (value) => {
  if (value.trim() === '') {
    error['password'] = t('error.required', { field: 'Password' })
  } else {
    error['password'] = ''
  }
})

const isValid = computed(() => {
  return username.value || email.value || password.value
})

const submit = async () => {
  await createAccount({
    username: username.value,
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <div class="mt-16">
    <h5 class="text-xl mb-6 font-[500]">
      {{ t('order.title') }}
    </h5>

    <form @submit.prevent="submit">
      <div class="mb-4">
        <BaseFormInput v-model="username" name="username" placeholder="Enter your username" />
        <span v-if="error?.username" class="text-xs text-[tomato]">{{ error?.username }}</span>
      </div>

      <div class="mb-4">
        <BaseFormInput v-model="email" name="email" placeholder="Enter your email" />
        <span v-if="error?.email" class="text-xs text-[tomato]">{{ error?.email }}</span>
      </div>

      <div class="mb-4">
        <BaseFormInput v-model="password" :input-type="'password'" name="password" />
        <span v-if="error?.password" class="text-xs text-[tomato]">{{ error?.password }}</span>
      </div>

      <button
        type="submit"
        class="w-full mt-4 h-10 duration-100 ease-in"
        :class="
          !isValid
            ? 'bg-white_mute text-[gray] hover:bg-white_mute'
            : 'bg-black_flash text-white_mute hover:bg-black_soft'
        "
        :disabled="!isValid"
      >
        <template v-if="loading"> Loading... </template>
        <template v-else>
          {{ t('order.createAccount') }}
        </template>
      </button>
    </form>
  </div>
</template>

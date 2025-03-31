<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import BaseFormInput from '@/components/base/BaseFormInput.vue'
import { useI18n } from 'vue-i18n'
import { useCheckoutStore } from '@/stores/checkout'
import { usePaymentsStore } from '@/stores/payments'
import { usePlansStore } from '@/stores/plans'
import type { Account } from '@/types/checkout'
import { useRoute } from 'vue-router'
import type { PaymentCardData } from '@/types/payment'
import type { Plan } from '@/types/plans'

interface Error {
  username: string
  email: string
  password: string
}

const { t } = useI18n()

const route = useRoute()

const apiCheckoutStore = useCheckoutStore()
const { createAccount } = useCheckoutStore()

const apiPlansStore = usePlansStore()
const { getPlan } = usePlansStore()
const { plan } = storeToRefs(apiPlansStore)

const { loading } = storeToRefs(apiCheckoutStore)

const apiPaymentsStore = usePaymentsStore()
const { paymentCard } = storeToRefs(apiPaymentsStore)

const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const errors = reactive<Error>({
  username: '',
  email: '',
  password: '',
})

watch(username, (value) => {
  if (value.trim() === '') {
    errors['username'] = t('error.required', { field: 'Username' })
  } else {
    errors['username'] = ''
  }
})

watch(email, (value) => {
  if (value.trim() === '') {
    errors['email'] = t('error.required', { field: 'Email' })
  } else {
    errors['email'] = ''
  }
})

watch(password, (value) => {
  if (value.trim() === '') {
    errors['password'] = t('error.required', { field: 'Password' })
  } else {
    errors['password'] = ''
  }
})

const isValid = computed(() => {
  return Object.values(errors).every((error) => !error)
})

const isValidComplete = computed(() => {
  return (isValid.value && paymentCard.value && Object.keys(paymentCard.value).length > 0) || false
})

const submit = async () => {
  const user = {
    username: username.value,
    email: email.value,
    password: password.value,
  } as Account

  await createAccount({
    user: user,
    payment: paymentCard.value as PaymentCardData,
    plan: plan.value as Plan,
  })
}

onMounted(async () => {
  await getPlan(route.params.id as string)
})
</script>

<template>
  <div>
    <h5 class="text-xl mb-6 font-[500]">
      {{ t('order.title') }}
    </h5>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <BaseFormInput
          v-model="username"
          label="Username"
          name="username"
          placeholder="Enter your username"
        />
        <span v-if="errors?.username" class="text-xs text-[tomato]">{{ errors?.username }}</span>
      </div>

      <div class="mb-4">
        <BaseFormInput v-model="email" label="Email" name="email" placeholder="Enter your email" />
        <span v-if="errors?.email" class="text-xs text-[tomato]">{{ errors?.email }}</span>
      </div>

      <div class="mb-4">
        <BaseFormInput
          v-model="password"
          label="Password"
          :input-type="'password'"
          name="password"
        />
        <span v-if="errors?.password" class="text-xs text-[tomato]">{{ errors?.password }}</span>
      </div>

      <button
        type="submit"
        class="rounded-md w-full mt-4 h-10 duration-100 ease-in"
        :class="
          !isValidComplete
            ? 'bg-white_mute text-[gray] hover:bg-white_mute'
            : 'bg-black_flash text-white_mute hover:bg-black_soft'
        "
        :disabled="!isValidComplete"
      >
        <template v-if="loading"> Loading... </template>
        <template v-else>
          {{ t('order.createAccount') }}
        </template>
      </button>
    </form>
  </div>
</template>

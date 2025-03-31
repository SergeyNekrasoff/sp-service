<script setup lang="ts">
import BaseFormInput from '@/components/base/BaseFormInput.vue'
import { computed, reactive, watch } from 'vue'
import { usePaymentCard } from '@/composable/usePaymentCard'
import type { PaymentCardData } from '@/types/payment'
import { useI18n } from 'vue-i18n'
import { usePaymentsStore } from '@/stores/payments'

const { t } = useI18n()

const { setPaymentCard } = usePaymentsStore()

const card = reactive<PaymentCardData>({
  number: '',
  expiryMonth: '',
  expiryYear: '',
  cvc: '',
})

const { formatCardNumber, isValid, errors } = usePaymentCard(card)

const validateField = (field: string) => {
  switch (field) {
    case 'number':
      errors.number = isValid.value ? '' : `${t('error.card')}`
      break
    case 'expiryDate':
      errors.expiryDate = isValid.value ? '' : `${t('error.expiryDate')}`
      break
    case 'cvc':
      errors.cvc = isValid.value ? '' : `${t('error.cvc')}`
      break
  }
}

const formattedCardNumber = computed({
  get: () => card.number,
  set: (value: string) => {
    card.number = formatCardNumber(value)
  },
})

watch(
  card,
  (value: PaymentCardData) => {
    if (isValid.value) {
      setPaymentCard(value)
    } else {
      setPaymentCard(null)
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div class="border border-solid border-black_mute p-4 rounded-md h-[260px] mt-12">
    <div class="mb-4">
      {{ t('payment.name') }}
    </div>
    <div class="mb-6 w-[80%] relative">
      <BaseFormInput
        v-model="formattedCardNumber"
        name="cardNumber"
        :placeholder="'•••• •••• •••• ••••'"
        pattern="[0-9]{16}"
        maxlength="16"
        @on-blur="validateField('number')"
      />
      <span v-if="errors.number" class="absolute -bottom-[18px] text-xs text-[tomato]">
        {{ errors.number }}
      </span>
    </div>

    <div class="mb-6 w-[80%] flex items-center justify-end relative">
      <div class="text-xs font-semibold uppercase pr-4">
        Valid
        <br />
        Thru
      </div>
      <div class="flex flex-col">
        <div
          class="w-[80px] flex items-center justify-center p-2 border border-solid border-black_mute rounded-md"
        >
          <input
            v-model="card.expiryMonth"
            type="text"
            placeholder="mm"
            maxlength="2"
            class="w-[30px] pl-1"
            @on-blur="validateField('expiryDate')"
          />
          <span class="expiry-input__separator">/</span>
          <input
            v-model="card.expiryYear"
            type="text"
            placeholder="YY"
            maxlength="2"
            class="w-[30px]"
            @on-blur="validateField('expiryDate')"
          />
        </div>
      </div>
      <span v-if="errors.expiryDate" class="absolute -bottom-[18px] text-xs text-[tomato]">
        {{ errors.expiryDate }}
      </span>
    </div>

    <div class="w-[80%] flex items-center justify-end relative">
      <div class="text-xs font-semibold uppercase pr-4">cvc</div>
      <div class="flex flex-col w-[80px]">
        <BaseFormInput
          v-model="card.cvc"
          name="cardCVC"
          :placeholder="'•••'"
          pattern="[0-9]{3}"
          maxlength="3"
          @on-blur="validateField('cvc')"
        />
      </div>
      <span v-if="errors.cvc" class="absolute -bottom-[18px] right-0 text-xs text-[tomato]">
        {{ errors.cvc }}
      </span>
    </div>
  </div>
</template>

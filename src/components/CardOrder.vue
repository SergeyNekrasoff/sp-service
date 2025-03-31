<script setup lang="ts">
import type { Plan } from '@/types/plans'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePlansStore } from '@/stores/plans'

interface Props {
  item: Plan
  selected: number | string
  isOrder?: boolean
}

const { setPlan } = usePlansStore()

const props = defineProps<Props>()

const { locale, t } = useI18n()
const router = useRouter()
</script>

<template>
  <div
    class="rounded-md bg-white_soft flex flex-col items-start justify-between border border-blue_dark p-4 h-[400px]"
  >
    <div class="w-full">
      <h3 class="text-xl text-black_mute mb-8">
        {{ props.item?.title }}
      </h3>
      <div class="text-[32px] font-bold leading-2 text-black_flash mb-4">
        {{ props.item?.price }}
      </div>

      <p class="text-sm leading-2 text-black_mute">
        {{ props.item?.description }}
      </p>
    </div>
    <div class="w-full">
      <ul class="space-y-2 mb-8">
        <li
          v-for="(feature, index) in props.item?.features"
          :key="index"
          class="my-0.5 font-[400] text-sm"
        >
          • {{ feature }}
        </li>
      </ul>

      <template v-if="isOrder">
        <button
          v-if="props.item"
          class="rounded-md w-full mt-4 border border-solid border-blue_dark text-black_soft h-10 hover:bg-blue_lighter hover:text-white hover:border-none duration-100 ease-in"
          :class="{ 'bg-blue_light text-white_mute': selected === props.item.id }"
          @click="setPlan(props.item)"
        >
          {{ selected === item.id ? $t('plan.selected') : $t('pricing.order') }}
        </button>
      </template>

      <template v-else>
        <button
          class="rounded-md w-full mt-4 bg-white border border-solid border-blue_dark text-black_soft h-10 hover:bg-blue_lighter hover:text-white hover:border-none duration-100 ease-in"
          @click="router.push(`/${locale}/order/${props.item?.id}`)"
        >
          {{ t('pricing.order') }}
        </button>
      </template>
    </div>
  </div>
</template>

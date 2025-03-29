<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { usePlansStore } from '@/stores/plans'
import { onMounted } from 'vue'

const { locale, t } = useI18n()
const router = useRouter()

const plansStore = usePlansStore()
const { plans, loading } = storeToRefs(plansStore)

onMounted(async () => {
  await plansStore.getPlans()
})
</script>

<template>
  <section
    class="mx-auto my-16 w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8"
    id="pricing"
  >
    <div v-if="loading">Loading...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="plan in plans"
        :key="plan.id"
        class="flex flex-col items-start justify-between border border-white_mute p-4 h-[400px]"
      >
        <div class="w-full">
          <h3 class="text-xl text-black_mute mb-8">{{ plan?.title }}</h3>
          <div class="text-[32px] font-bold leading-2 text-black_flash mb-4">
            {{ plan?.price }}
          </div>

          <p class="text-sm leading-2 text-black_mute">{{ plan?.description }}</p>
        </div>
        <div class="w-full">
          <ul class="space-y-2 mb-8">
            <li
              v-for="(feature, index) in plan?.features"
              :key="index"
              class="my-0.5 font-[400] text-sm"
            >
              • {{ feature }}
            </li>
          </ul>

          <button
            class="w-full mt-4 bg-white border border-solid border-white_mute text-black_soft h-10 hover:bg-purple_lighter hover:text-white hover:border-none duration-100 ease-in"
            @click="router.push(`/${locale}/order/${plan.id}`)"
          >
            {{ t('pricing.order') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

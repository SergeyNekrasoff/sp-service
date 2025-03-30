<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlansStore } from '@/stores/plans'
import { onMounted } from 'vue'
import CardOrder from '@/components/CardOrder.vue'

const { getPlans } = usePlansStore()
const plansStore = usePlansStore()
const { plans, plan, loading } = storeToRefs(plansStore)

onMounted(async () => {
  await getPlans()
})
</script>

<template>
  <section
    id="pricing"
    class="mx-auto my-16 w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8"
  >
    <div v-if="loading">Loading...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardOrder v-for="item in plans" :key="item.id" :item="item" :selected="plan?.id" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import CardOrder from '@/components/CardOrder.vue'
import FormOrder from '@/components/FormOrder.vue'
import { usePlansStore } from '@/stores/plans'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import type { Plan } from '@/types/plans'

const apiPlansStore = usePlansStore()
const { getPlan, getPlans } = usePlansStore()
const { plan, plans } = storeToRefs(apiPlansStore)

const route = useRoute()
const selectedId = ref<string | number | string[]>(route.params.id)

watch(
  plan,
  async (value: unknown) => {
    if (!value) return
    selectedId.value = (value as Plan).id
  },
  {
    immediate: true,
    deep: true,
  },
)

onMounted(async () => {
  await getPlans()
  await getPlan(route.params.id as string)
})
</script>

<template>
  <div class="mx-auto mt-4 w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardOrder
        v-for="item in plans"
        :key="item.id"
        :item="item"
        :selected="selectedId"
        :is-order="true"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
      <FormOrder class="w-4/12 mx-auto" />
    </div>
  </div>
</template>

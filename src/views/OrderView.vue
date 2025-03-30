<script setup lang="ts">
import { onMounted } from 'vue'
import CardOrder from '@/components/CardOrder.vue'
import FormOrder from '@/components/FormOrder.vue'
import { usePlansStore } from '@/stores/plans'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const apiPlansStore = usePlansStore()
const { getPlans } = usePlansStore()
const { plans } = storeToRefs(apiPlansStore)

const route = useRoute()
const selectedId = route.params.id

onMounted(async () => {
  await getPlans()
})
</script>

<template>
  <div class="mx-auto mt-4 w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardOrder
        v-for="item in plans"
        :key="item.id"
        :item="item"
        :selected-id="selectedId"
        :is-order="true"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
      <FormOrder class="w-4/12 mx-auto" />
    </div>
  </div>
</template>

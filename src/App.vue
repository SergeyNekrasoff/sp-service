<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import EmptyLayout from '@/layout/EmptyLayout.vue'
import BaseHeader from '@/components/base/BaseHeader.vue'
import BaseFooter from '@/components/base/BaseFooter.vue'

const route = useRoute()

const isDefaultLayout = computed(() => route.meta.layout === 'default')
</script>

<template>
  <DefaultLayout v-if="isDefaultLayout">
    <template #header>
      <BaseHeader />
    </template>

    <template #footer>
      <BaseFooter />
    </template>
  </DefaultLayout>

  <EmptyLayout v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const tosPath = computed(() => (locale.value === 'en' ? '/tos' : `/${locale.value}/tos`))
</script>

<template>
  <footer class="base-footer" :app="true">
    <div class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-start text-xs text-white_soft">
        © SuperPuperService <span class="ml-1">{{ new Date().getFullYear() }}</span>
        <router-link :to="tosPath" class="ml-4 mr-20 font-[300] text-blue_light">
          {{ t('nav.tos') }}
        </router-link>
        <router-link :to="`/${locale}/`" class="font-[300] text-white mr-4 hover:text-blue_light">
          {{ t('nav.home') }}
        </router-link>
        <router-link :to="{ hash: '#pricing' }" class="font-[300] text-white hover:text-blue_light">
          {{ t('nav.pricing') }}
        </router-link>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.base-footer {
  @apply sticky bottom-0 bg-black_soft;
}
</style>

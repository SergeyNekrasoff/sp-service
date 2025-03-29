<template>
  <header class="base-header">
    <div class="flex items-center justify-between h-12">
      <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center justify-start font-bold text-xl text-white_soft">
          <RouterLink :to="`/${selectedLocale}/`">{{ t('header.logo') }}</RouterLink>
          <div class="ml-48">
            <router-link
              :to="`/${selectedLocale}/`"
              class="text-sm font-[300] text-white_soft mr-4 hover:text-blue_light"
            >
              {{ t('nav.home') }}
            </router-link>
            <router-link
              :to="{ hash: '#pricing' }"
              class="text-sm font-[300] text-white_soft hover:text-blue_light"
            >
              {{ t('nav.pricing') }}
            </router-link>
          </div>
        </div>
        <BaseSelect
          v-model="selectedLocale"
          :options="locales"
          :placeholder="locales[0]"
          :position="'bottom'"
          @update:modelValue="handleSelectLocale"
        />
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BaseSelect from '@/components/base/BaseSelect.vue'

const { locale, t } = useI18n()
const router = useRouter()

const locales = ref<string[]>(['en', 'ru'])
const selectedLocale = ref<string>(locales.value[0])

const handleSelectLocale = (value: string) => {
  selectedLocale.value = value
  localStorage.setItem('activeLocale', value)
}

watch(selectedLocale, (value: string) => {
  locale.value = value

  const currentRoute = router.currentRoute.value.path.split('/')

  if (currentRoute.pop() === 'tos' && value === 'en') {
    window.location.pathname = '/tos'
  }

  router.push({ params: { lang: value } })
})

onMounted(() => {
  const label = localStorage.getItem('activeLocale')
  const currentLocale = locales.value.find((e) => e === label)

  if (!currentLocale) return

  selectedLocale.value = currentLocale
})

// /src/markdown/ru/tos.md
// /ru/src/markdown/en/tos.md
</script>

<style lang="scss">
.base-header {
  @apply sticky top-0 h-16 relative bg-black_flash border-b border-black_soft py-2 px-4 z-20;
}
</style>

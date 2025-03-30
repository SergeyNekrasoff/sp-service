<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
</script>

<template>
  <div class="mx-auto mt-4 w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8">
    <p class="text-[36px] text-black_mute mb-12">
      {{ t('success.message') }}
    </p>
    <router-link
      :to="`/${locale}`"
      class="flex items-center justify-center bg-black_flash w-[200px] text-white_mute hover:bg-black_soft mt-4 h-10 duration-100 ease-in"
    >
      {{ t('nav.homeLink') }}
    </router-link>
  </div>
</template>

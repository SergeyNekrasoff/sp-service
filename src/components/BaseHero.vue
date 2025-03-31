<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="h-[600px] overflow-hidden">
    <img
      src="https://cdn.prod.website-files.com/5f23b456c81e6bebb921e9cb/670762b02aeefc910afade97_Gradient-HeroBG.jpg"
      loading="eager"
      width="3000"
      sizes="100vw"
      alt=""
      srcset="
        https://cdn.prod.website-files.com/5f23b456c81e6bebb921e9cb/670762b02aeefc910afade97_Gradient-HeroBG-p-500.jpg   500w,
        https://cdn.prod.website-files.com/5f23b456c81e6bebb921e9cb/670762b02aeefc910afade97_Gradient-HeroBG-p-800.jpg   800w,
        https://cdn.prod.website-files.com/5f23b456c81e6bebb921e9cb/670762b02aeefc910afade97_Gradient-HeroBG-p-1080.jpg 1080w,
        https://cdn.prod.website-files.com/5f23b456c81e6bebb921e9cb/670762b02aeefc910afade97_Gradient-HeroBG-p-1600.jpg 1600w,
        https://cdn.prod.website-files.com/5f23b456c81e6bebb921e9cb/670762b02aeefc910afade97_Gradient-HeroBG-p-2000.jpg 2000w,
        https://cdn.prod.website-files.com/5f23b456c81e6bebb921e9cb/670762b02aeefc910afade97_Gradient-HeroBG-p-2600.jpg 2600w,
        https://cdn.prod.website-files.com/5f23b456c81e6bebb921e9cb/670762b02aeefc910afade97_Gradient-HeroBG-p-3200.jpg 3200w,
        https://cdn.prod.website-files.com/5f23b456c81e6bebb921e9cb/670762b02aeefc910afade97_Gradient-HeroBG.jpg        6000w
      "
      class="w-full object-cover -translate-y-12"
    />
    <div class="mx-auto mt-4 w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8">
      <div class="absolute top-[230px]">
        <h1 class="text-5xl font-bold text-black_mute mb-12">
          {{ t('hero.welcome') }}
        </h1>
        <p class="text-xl mb-12 text-wrap w-1/2">
          {{ t('hero.offerAction') }}
        </p>
        <router-link
          to="#pricing"
          class="rounded-md flex items-center justify-center w-[220px] font-[600] p-3 bg-blue text-white_soft text-lg mt-12 hover:bg-blue_lighter duration-100 ease-in"
        >
          {{ t('hero.orderAction') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

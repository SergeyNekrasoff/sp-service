<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMarkdown } from '@/utils/useMarkdown'

const markdown = useMarkdown()
const { convertMarkdown } = useMarkdown()
const { loading } = markdown

const markdownContent = ref<string>('')

watchEffect(async () => {
  try {
    markdownContent.value = await convertMarkdown('tos')
  } catch (error) {
    markdownContent.value = '<p>Error loading content</p>'
    throw error
  }
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else class="markdown" v-html="markdownContent"></div>
</template>

<style lang="scss">
.markdown {
  @apply mx-auto mt-4 w-[90%] max-w-[1280px] flex flex-col justify-center px-6 py-8 overflow-hidden;
}

.markdown h2,
.markdown h3,
.markdown h4 {
  @apply font-[600] my-4;
}

.markdown h2 {
  @apply text-[24px];
}

.markdown h3 {
  @apply text-[20px];
}

.markdown h4 {
  @apply text-[20px];
}

.markdown p {
  @apply my-2;
}

.markdown ol,
.markdown ul {
  @apply list-disc mb-4;
}

.markdown a {
  @apply font-[400] text-blue_light;
}
</style>

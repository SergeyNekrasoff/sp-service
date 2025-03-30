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

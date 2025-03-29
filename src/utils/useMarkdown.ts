import { marked } from 'marked'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useMarkdown() {
  marked.setOptions({
    gfm: true,
    breaks: true,
    pedantic: false,
  })

  const loading = ref<boolean>(false)
  const { locale } = useI18n()

  const convertMarkdown = async (fileName: string): Promise<string> => {
    loading.value = true
    try {
      const response = await fetch(`./src/markdown/${locale.value}/${fileName}.md`)

      if (!response.ok) {
        throw new Error(`Invalid markdown response`)
      }

      const content = await response.text()
      loading.value = false

      return marked(content)
    } catch (error) {
      loading.value = false
      console.error('Error converting markdown:', error)
      return `<p>Error processing markdown</p>`
    }
  }

  return {
    convertMarkdown,
    loading,
  }
}

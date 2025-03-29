<template>
  <div class="relative flex items-center justify-start" ref="optionsRef">
    <IconGlobal class="w-4 h-4 mr-0 text-blue_darker" />

    <button class="button-select" :class="{ 'is-open': isOpen }" @click="isOpen = !isOpen">
      <span class="pr-1.5 text-white_mute">{{ modelValue || placeholder }}</span>
      <IconCaretUp v-if="isOpen" class="scale-75 text-white_mute" />
      <IconCaretDown v-else class="scale-75 text-white_mute" />
    </button>

    <div
      v-if="isOpen"
      class="options-container"
      :class="{ 'options-container--bottom': position === 'bottom' }"
    >
      <ul class="options-list">
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="handleOptionClick(option)"
          class="option-item"
          :class="{ 'is-selected': option === modelValue }"
        >
          <IconCheckCircle v-if="option === modelValue" class="text-green_light mr-2" />
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import IconGlobal from '@/components/icons/IconGlobal.vue'
import IconCaretUp from '@/components/icons/IconCaretUp.vue'
import IconCaretDown from '@/components/icons/IconCaretDown.vue'
import IconCheckCircle from '@/components/icons/IconCheckCircle.vue'
import { onClickOutside } from '@vueuse/core'

interface UseSelectProps {
  modelValue: string
  options?: string[]
  placeholder?: string
  position?: string
}

withDefaults(defineProps<UseSelectProps>(), {
  modelValue: '',
  options: () => [],
  placeholder: 'Select an option',
  position: 'top',
})

const optionsRef: Ref<HTMLDivElement | null> = ref(null)
const isOpen = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleOptionClick = (value: string) => {
  isOpen.value = false
  emit('update:modelValue', value)
}

onClickOutside(optionsRef, () => (isOpen.value = false))
</script>

<style lang="scss" setup>
.button-select {
  @apply text-xs flex items-center justify-start rounded-md p-2 bg-transparent text-black_mute;
}

.options-container {
  @apply absolute left-auto right-0 border border-solid border-white_soft rounded-lg bg-black_soft z-[1000] w-[80px] overflow-hidden bottom-0 top-auto transform-gpu translate-y-[-32px];

  &--bottom {
    @apply top-0 bottom-auto transform-gpu translate-y-[38px];
  }
}

.options-list {
  @apply max-h-[200px] overflow-y-auto;
}

.option-item {
  @apply p-2 text-xs text-white_mute cursor-pointer pl-10 flex items-center justify-start;
}

.option-item:hover {
  @apply bg-black_mute;
}

.option-item.is-selected {
  @apply bg-black_mute pl-4;
}

@media (max-width: 480px) {
  .options-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    max-height: 50vh;
  }
}
</style>

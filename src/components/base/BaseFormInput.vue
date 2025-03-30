<template>
  <div class="base-input" :class="classes">
    <label v-if="label" class="base-input__label" :for="name">
      {{ label }}
    </label>

    <div class="base-input__wrap">
      <div v-if="$slots.prefix" class="base-input__prefix">
        <slot name="prefix" />
      </div>

      <input
        ref="input"
        :value="modelValue"
        class="base-input__field"
        :class="{ 'base-input__field--no-border': !border }"
        :type="inputType"
        :name="name"
        :placeholder="placeholder"
        :disabled="isDisabled"
        autocomplete="false"
        maxlength="255"
        minlength="3"
        @input="onInput"
        @blur="onBlur"
        @change="onChange"
      />

      <div v-if="$slots.postfix" class="base-input__postfix">
        <slot name="postfix" />
      </div>
    </div>

    <small v-if="error" class="base-input__error">
      {{ error }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRefValue } from '@/composable/use/useRefValue'

const emit = defineEmits(['update:modelValue', 'blur', 'change'])

interface BaseInput {
  modelValue?: string | number
  label?: string
  name?: string
  isDisabled?: boolean
  placeholder?: string
  inputType?: 'text' | 'password' | 'number' | 'email'
  border?: boolean
  error?: string
}

const props = withDefaults(defineProps<BaseInput>(), {
  modelValue: '',
  inputType: 'text',
  placeholder: '',
  border: true,
})

const classes = computed(() => ({
  'disabled events-none': props.isDisabled,
  error: props.error,
}))

const { value: inputValue, setValue } = useRefValue(props.modelValue)

const onInput = (event: Event) => {
  const value = getValue(event)
  setValue(value)

  emit('update:modelValue', value)
}

const onBlur = () => {
  emit('blur', inputValue.value)
}

const onChange = () => {
  emit('change', inputValue.value)
}

const getValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  return target.value.trim()
}
</script>

<style lang="scss">
@mixin inputFocus() {
  @apply border-solid border-black_soft;
}

@mixin inputHover() {
  @apply border-solid border-black_soft;
}

.base-input {
  @apply relative flex flex-col items-start justify-center w-full text-black_mute;

  &__wrap {
    @apply flex items-center justify-between w-full transition duration-100 ease-in-out;
  }

  &__label {
    @apply relative text-xs max-w-max pb-2;

    &.required::after {
      content: '*';
      @apply absolute top-0 -right-[10px] text-sm;
    }
  }

  &__prefix {
    @apply pl-2;
  }

  &__field {
    @apply w-full text-black_mute font-[400] py-2 px-3 border border-solid border-black_soft overflow-hidden;

    &--no-border,
    &--no-border:hover,
    &--no-border:focus,
    &--focus-visible,
    &:disabled {
      @apply border-none !important;
    }

    &::placeholder {
      @apply text-[gray] text-sm font-light;
    }

    &:focus-visible,
    &:focus {
      @include inputFocus;
    }

    &:hover {
      @include inputHover;
    }

    &:disabled {
      @apply text-white_mute bg-black_mute border-black_mute;
    }
  }

  &.error {
    .base-input__field {
      @apply border-[tomato];
    }

    .base-input__label {
      @apply text-[gray];
    }

    .base-input__field {
      &::placeholder {
        @apply text-[gray];
      }
    }

    .base-input__error {
      @apply absolute top-full text-[tomato];
    }
  }

  &.disabled {
    .base-input__wrap {
      @apply border-white_mute;
    }

    .base-input__label {
      @apply text-white_mute;
    }

    .base-input__field {
      &::placeholder {
        @apply text-white_mute;
      }
    }
  }
}

.base-input__field,
.base-input__field:-webkit-autofill:hover,
.base-input__field:-webkit-autofill:focus {
  border-color: var(--vt-c-black_mute);
  -webkit-box-shadow: 0 0 0px 1000px var(--vt-c-black_mute) inset;
  transition: background-color 3000s ease-in-out 0s;

  &.focus {
    .base-input__field {
      @include inputFocus;
    }
  }
  &.hover {
    .base-input__field {
      @include inputHover;
    }
  }
}
</style>

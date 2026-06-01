<script lang="ts" setup>
import type { ToasterProps } from 'vue-sonner'

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from '@lucide/vue'
import { Toaster as Sonner } from 'vue-sonner'
import { cn } from '@/lib/utils'

const props = defineProps<ToasterProps>()

// Извлекаем toastOptions из пропсов, если они есть
const { toastOptions: propsToastOptions, ...restProps } = props

// Объединяем кастомные настройки с пропсами (приоритет — пропсы)
const mergedToastOptions = {
  classes: {
    toast: 'rounded-2xl',
  },
  ...propsToastOptions
}
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
      '--gray2': 'hsl(var(--popover) / 0.9)',
      '--gray3': 'var(--border)',
      '--gray4': 'var(--border)',
      '--gray5': 'var(--border)',
      '--gray12': 'var(--popover-foreground)',
    }"
    :toast-options="mergedToastOptions"
    v-bind="restProps"
  >
    <!-- шаблоны иконок -->
  </Sonner>
</template>

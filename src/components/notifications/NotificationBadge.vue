```vue
<template>
  <div class="relative inline-block">
    <slot></slot>
    <div v-if="count > 0" 
         class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {{ formattedCount }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationBadge',
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  computed: {
    formattedCount() {
      return this.count > 99 ? '99+' : this.count
    }
  }
}
</script>
```
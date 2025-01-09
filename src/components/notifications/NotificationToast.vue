```vue
<template>
  <div 
    v-if="show"
    class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm animate-slide-up"
    role="alert"
  >
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <i :class="['fas', iconClass, 'text-2xl', colorClass]"></i>
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-900">
          {{ notification.message }}
        </p>
        <p class="mt-1 text-sm text-gray-500">
          {{ timeAgo }}
        </p>
      </div>
      <div class="ml-4 flex-shrink-0 flex">
        <button
          @click="dismiss"
          class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Close</span>
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'NotificationToast',
  props: {
    notification: {
      type: Object,
      required: true
    },
    duration: {
      type: Number,
      default: 5000
    }
  },
  emits: ['dismiss'],
  setup(props, { emit }) {
    const show = ref(true)

    const iconClass = computed(() => {
      const icons = {
        booking: 'fa-calendar',
        payment: 'fa-credit-card',
        system: 'fa-cog',
        reminder: 'fa-bell'
      }
      return icons[props.notification.type] || 'fa-info-circle'
    })

    const colorClass = computed(() => {
      const colors = {
        high: 'text-red-500',
        medium: 'text-yellow-500',
        low: 'text-blue-500'
      }
      return colors[props.notification.priority] || 'text-blue-500'
    })

    const timeAgo = computed(() => {
      const now = new Date()
      const timestamp = new Date(props.notification.timestamp)
      const seconds = Math.floor((now - timestamp) / 1000)

      if (seconds < 60) return 'just now'
      if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
      if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
      return timestamp.toLocaleDateString()
    })

    const dismiss = () => {
      show.value = false
      emit('dismiss')
    }

    onMounted(() => {
      if (props.duration > 0) {
        setTimeout(dismiss, props.duration)
      }
    })

    return {
      show,
      iconClass,
      colorClass,
      timeAgo,
      dismiss
    }
  }
}
</script>

<style scoped>
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
```
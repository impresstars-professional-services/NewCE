```vue
<template>
  <div :class="['notification-item p-4 rounded-lg mb-2', unread ? 'bg-blue-50' : 'bg-white']">
    <div class="flex justify-between items-start">
      <div>
        <div class="flex items-center">
          <span :class="['px-2 py-1 text-xs rounded-full mr-2', priorityClass]">
            {{ notification.type }}
          </span>
          <span v-if="unread" class="w-2 h-2 bg-blue-500 rounded-full"></span>
        </div>
        <p class="mt-1">{{ notification.message }}</p>
        <p class="text-sm text-gray-500 mt-1">{{ formattedDate }}</p>
      </div>
      <button 
        v-if="unread"
        @click="$emit('mark-read', notification.id)"
        class="text-blue-600 hover:text-blue-800 text-sm"
      >
        Mark as read
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { getNotificationPriorityClass } from '../../services/domain/notification'

export default {
  name: 'NotificationItem',
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  emits: ['mark-read'],
  setup(props) {
    const unread = computed(() => !props.notification.read)
    
    const priorityClass = computed(() => 
      getNotificationPriorityClass(props.notification.priority)
    )

    const formattedDate = computed(() => 
      new Date(props.notification.timestamp).toLocaleString()
    )

    return {
      unread,
      priorityClass,
      formattedDate
    }
  }
}
</script>
```
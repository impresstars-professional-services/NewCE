```vue
<template>
  <div class="notification-list">
    <div v-if="loading" class="flex justify-center p-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else-if="error" class="text-red-600 p-4 text-center">
      {{ error }}
    </div>
    
    <div v-else>
      <div v-if="notifications.length === 0" class="text-gray-500 text-center p-4">
        No notifications
      </div>
      
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @mark-read="$emit('mark-read', $event)"
      />
      
      <div v-if="hasMore" class="text-center p-4">
        <button 
          @click="$emit('load-more')"
          class="text-blue-600 hover:text-blue-800"
        >
          Load more
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationItem from './NotificationItem.vue'

export default {
  name: 'NotificationList',
  components: {
    NotificationItem
  },
  props: {
    notifications: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    hasMore: {
      type: Boolean,
      default: false
    }
  },
  emits: ['mark-read', 'load-more']
}
</script>
```
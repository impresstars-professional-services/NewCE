```vue
<template>
  <div class="relative">
    <NotificationBadge :count="unreadCount" @click="togglePopover">
      <button 
        class="p-2 rounded-full hover:bg-gray-100"
        aria-label="Notifications"
      >
        <i class="fas fa-bell"></i>
      </button>
    </NotificationBadge>

    <div v-if="showPopover" 
         class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
      <div class="p-4 border-b">
        <div class="flex justify-between items-center">
          <h3 class="font-semibold">Notifications</h3>
          <button 
            v-if="unreadCount > 0"
            @click="markAllAsRead"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div class="max-h-96 overflow-y-auto">
        <NotificationList
          :notifications="notifications"
          :loading="loading"
          :error="error"
          :has-more="hasMore"
          @mark-read="markAsRead"
          @load-more="loadMore"
        />
      </div>

      <div class="p-4 border-t">
        <router-link 
          to="/notifications"
          class="text-sm text-blue-600 hover:text-blue-800"
        >
          View all notifications
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import NotificationBadge from './NotificationBadge.vue'
import NotificationList from './NotificationList.vue'

export default {
  name: 'NotificationPopover',
  components: {
    NotificationBadge,
    NotificationList
  },
  setup() {
    const store = useStore()
    const showPopover = ref(false)

    const notifications = computed(() => 
      store.getters['notifications/allNotifications']
    )
    const unreadCount = computed(() => 
      store.getters['notifications/unreadCount']
    )
    const loading = computed(() => 
      store.getters['notifications/isLoading']
    )
    const error = computed(() => 
      store.getters['notifications/error']
    )

    const togglePopover = () => {
      showPopover.value = !showPopover.value
    }

    const markAsRead = async (notificationId) => {
      await store.dispatch('notifications/markAsRead', notificationId)
    }

    const markAllAsRead = async () => {
      const unreadNotifications = store.getters['notifications/unreadNotifications']
      await Promise.all(
        unreadNotifications.map(n => markAsRead(n.id))
      )
    }

    const loadMore = () => {
      // Implement pagination logic here
    }

    // Close popover when clicking outside
    const handleClickOutside = (event) => {
      if (showPopover.value && !event.target.closest('.notification-popover')) {
        showPopover.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      store.dispatch('notifications/fetchNotifications')
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      showPopover,
      notifications,
      unreadCount,
      loading,
      error,
      hasMore: ref(false),
      togglePopover,
      markAsRead,
      markAllAsRead,
      loadMore
    }
  }
}
</script>
```
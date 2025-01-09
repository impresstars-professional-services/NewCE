```javascript
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { notificationRealtime } from '../services/domain/notification/notificationRealtime'

export function useNotifications() {
  const store = useStore()
  const unsubscribe = ref(null)

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

  const handleNewNotification = (notification) => {
    store.dispatch('notifications/addNotification', notification)
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

  onMounted(() => {
    const userId = store.getters['auth/currentUser']?.id
    if (userId) {
      notificationRealtime.connect(userId)
      unsubscribe.value = notificationRealtime.subscribe(handleNewNotification)
      store.dispatch('notifications/fetchNotifications')
    }
  })

  onUnmounted(() => {
    if (unsubscribe.value) {
      unsubscribe.value()
      notificationRealtime.disconnect()
    }
  })

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead
  }
}
```
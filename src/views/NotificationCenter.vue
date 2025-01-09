```vue
<template>
  <div class="notification-center container mx-auto mt-8 p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Notifications</h1>
      <div class="flex space-x-4">
        <BaseButton @click="markAllAsRead" :disabled="!unreadCount">
          Mark all as read
        </BaseButton>
        <BaseButton @click="showSettings = true" color="gray">
          Settings
        </BaseButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Notification List -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md">
          <div class="p-4 border-b">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-semibold">All Notifications</h2>
              <div class="flex items-center space-x-2">
                <BaseSelect
                  v-model="filters.type"
                  :options="typeOptions"
                  class="w-40"
                />
                <BaseSelect
                  v-model="filters.priority"
                  :options="priorityOptions"
                  class="w-40"
                />
              </div>
            </div>
          </div>
          
          <NotificationList
            :notifications="filteredNotifications"
            :loading="loading"
            :error="error"
            :has-more="hasMore"
            @mark-read="markAsRead"
            @load-more="loadMore"
          />
        </div>
      </div>

      <!-- Notification Stats -->
      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4">Overview</h3>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-600">Total Notifications</p>
              <p class="text-2xl font-bold">{{ metrics.total }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Unread</p>
              <p class="text-2xl font-bold text-blue-600">{{ metrics.unread }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4">By Type</h3>
          <div class="space-y-2">
            <div v-for="(count, type) in metrics.byType" :key="type" 
                 class="flex justify-between items-center">
              <span class="capitalize">{{ type }}</span>
              <span class="font-semibold">{{ count }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4">By Priority</h3>
          <div class="space-y-2">
            <div v-for="(count, priority) in metrics.byPriority" :key="priority"
                 class="flex justify-between items-center">
              <span class="capitalize">{{ priority }}</span>
              <span class="font-semibold">{{ count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <NotificationSettings
      v-if="showSettings"
      @close="showSettings = false"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import NotificationList from '../components/notifications/NotificationList.vue'
import NotificationSettings from '../components/notifications/NotificationSettings.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseSelect from '../components/BaseSelect.vue'

export default {
  name: 'NotificationCenter',
  components: {
    NotificationList,
    NotificationSettings,
    BaseButton,
    BaseSelect
  },
  setup() {
    const store = useStore()
    const showSettings = ref(false)
    const hasMore = ref(false)
    const filters = ref({
      type: 'all',
      priority: 'all'
    })

    const typeOptions = [
      { value: 'all', label: 'All Types' },
      { value: 'booking', label: 'Booking' },
      { value: 'payment', label: 'Payment' },
      { value: 'system', label: 'System' },
      { value: 'reminder', label: 'Reminder' }
    ]

    const priorityOptions = [
      { value: 'all', label: 'All Priorities' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ]

    const notifications = computed(() => 
      store.getters['notifications/allNotifications']
    )
    const loading = computed(() => 
      store.getters['notifications/isLoading']
    )
    const error = computed(() => 
      store.getters['notifications/error']
    )
    const metrics = computed(() => 
      store.getters['notifications/notificationMetrics']
    )
    const unreadCount = computed(() => 
      store.getters['notifications/unreadCount']
    )

    const filteredNotifications = computed(() => {
      return notifications.value.filter(notification => {
        if (filters.value.type !== 'all' && notification.type !== filters.value.type) {
          return false
        }
        if (filters.value.priority !== 'all' && notification.priority !== filters.value.priority) {
          return false
        }
        return true
      })
    })

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

    onMounted(() => {
      store.dispatch('notifications/fetchNotifications')
    })

    return {
      showSettings,
      filters,
      typeOptions,
      priorityOptions,
      notifications,
      filteredNotifications,
      loading,
      error,
      metrics,
      unreadCount,
      hasMore,
      markAsRead,
      markAllAsRead,
      loadMore
    }
  }
}
</script>
```
```vue
<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Notification Settings
      </h3>
    </template>

    <template #body>
      <form @submit.prevent="saveSettings" class="space-y-6">
        <div>
          <h4 class="font-medium mb-4">Email Notifications</h4>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="settings.emailEnabled"
                class="form-checkbox h-4 w-4 text-blue-600"
              />
              <span class="ml-2">Enable email notifications</span>
            </label>
          </div>
        </div>

        <div>
          <h4 class="font-medium mb-4">Notification Types</h4>
          <div class="space-y-2">
            <label v-for="type in notificationTypes" :key="type.value" 
                   class="flex items-center">
              <input
                type="checkbox"
                v-model="settings.enabledTypes"
                :value="type.value"
                class="form-checkbox h-4 w-4 text-blue-600"
              />
              <span class="ml-2">{{ type.label }}</span>
            </label>
          </div>
        </div>

        <div>
          <h4 class="font-medium mb-4">Priority Levels</h4>
          <div class="space-y-2">
            <label v-for="priority in priorityLevels" :key="priority.value"
                   class="flex items-center">
              <input
                type="checkbox"
                v-model="settings.enabledPriorities"
                :value="priority.value"
                class="form-checkbox h-4 w-4 text-blue-600"
              />
              <span class="ml-2">{{ priority.label }}</span>
            </label>
          </div>
        </div>
      </form>
    </template>

    <template #footer>
      <div class="flex justify-end space-x-2">
        <BaseButton @click="$emit('close')" color="gray">
          Cancel
        </BaseButton>
        <BaseButton @click="saveSettings" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save Settings' }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BaseModal from '../BaseModal.vue'
import BaseButton from '../BaseButton.vue'

export default {
  name: 'NotificationSettings',
  components: {
    BaseModal,
    BaseButton
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore()
    const saving = ref(false)

    const notificationTypes = [
      { value: 'booking', label: 'Booking Updates' },
      { value: 'payment', label: 'Payment Updates' },
      { value: 'system', label: 'System Updates' },
      { value: 'reminder', label: 'Reminders' }
    ]

    const priorityLevels = [
      { value: 'high', label: 'High Priority' },
      { value: 'medium', label: 'Medium Priority' },
      { value: 'low', label: 'Low Priority' }
    ]

    const settings = ref({
      emailEnabled: true,
      enabledTypes: ['booking', 'payment', 'system', 'reminder'],
      enabledPriorities: ['high', 'medium', 'low']
    })

    const saveSettings = async () => {
      saving.value = true
      try {
        await store.dispatch('notifications/updateSettings', settings.value)
        emit('close')
      } catch (error) {
        console.error('Error saving notification settings:', error)
      } finally {
        saving.value = false
      }
    }

    return {
      saving,
      settings,
      notificationTypes,
      priorityLevels,
      saveSettings
    }
  }
}
</script>
```
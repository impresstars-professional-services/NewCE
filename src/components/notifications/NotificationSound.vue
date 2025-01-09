```vue
<template>
  <audio ref="notificationSound" preload="auto">
    <source src="@/assets/sounds/notification.mp3" type="audio/mpeg">
  </audio>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'NotificationSound',
  setup() {
    const store = useStore()
    const notificationSound = ref(null)

    onMounted(() => {
      const unsubscribe = store.subscribe((mutation) => {
        if (mutation.type === 'notifications/ADD_NOTIFICATION') {
          notificationSound.value?.play()
        }
      })

      return () => unsubscribe()
    })

    return {
      notificationSound
    }
  }
}
</script>
```
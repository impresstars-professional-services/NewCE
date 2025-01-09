```javascript
<template>
  <div class="dashboard-home">
    <h1 class="text-3xl font-bold mb-6">Welcome, {{ userName }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard
        v-for="card in dashboardCards"
        :key="card.to"
        v-bind="card"
      />
    </div>

    <h2 class="text-2xl font-bold mb-4">Upcoming Bookings</h2>
    <Calendar :bookings="bookings" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import DashboardCard from '../components/DashboardCard.vue'
import Calendar from '../components/Calendar.vue'

export default {
  name: 'DashboardHome',
  components: {
    DashboardCard,
    Calendar
  },
  setup() {
    const store = useStore()
    const bookings = ref([])

    const userName = computed(() => {
      const user = store.getters['auth/currentUser']
      return user?.firstName ? `${user.firstName} ${user.lastName}` : 'Guest'
    })

    const dashboardCards = [
      {
        title: 'Book a Service',
        icon: 'calendar-plus',
        to: { name: 'Bookings' }
      },
      {
        title: 'Your Profile',
        icon: 'user',
        to: { name: 'Profile' }
      },
      {
        title: 'Manage Addresses',
        icon: 'home',
        to: { name: 'Addresses' }
      },
      {
        title: 'Manage Vehicles',
        icon: 'car',
        to: { name: 'Vehicles' }
      }
    ]

    onMounted(async () => {
      try {
        const result = await store.dispatch('bookings/fetchBookings')
        if (result.success) {
          bookings.value = result.data
        }
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    })

    return {
      userName,
      dashboardCards,
      bookings
    }
  }
}
</script>
```
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store' // Updated import

// Import route components
import Home from '../views/Home.vue'
import Services from '../views/Services.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import NotFound from '../views/NotFound.vue'

// Auth routes
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'

// Dashboard routes
import Dashboard from '../views/Dashboard.vue'
import DashboardHome from '../views/DashboardHome.vue'
import Profile from '../views/Profile.vue'
import Bookings from '../views/Bookings.vue'
import Vehicles from '../views/Vehicles.vue'
import Addresses from '../views/Addresses.vue'

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: DashboardHome
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'bookings',
        name: 'Bookings',
        component: Bookings
      },
      {
        path: 'vehicles',
        name: 'Vehicles',
        component: Vehicles
      },
      {
        path: 'addresses',
        name: 'Addresses',
        component: Addresses
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  // Handle protected routes
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ 
        name: 'Login', 
        query: { redirect: to.fullPath }
      })
      return
    }
  }

  // Handle guest-only routes
  if (to.matched.some(record => record.meta.guestOnly) && isAuthenticated) {
    next({ name: 'DashboardHome' })
    return
  }

  next()
})

// Export router instance
export default router
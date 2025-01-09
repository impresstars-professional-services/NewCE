import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'
import { validateEnv } from './config/env'
import { initializeAuth } from './services/auth/authInitializer'

// Import styles
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'vue-toastification/dist/index.css'
import './assets/main.css'

const initializeApp = async () => {
  try {
    // Validate environment variables
    validateEnv();

    // Create Vue app instance
    const app = createApp(App)

    // Initialize Pinia store
    const pinia = createPinia()
    app.use(pinia)

    // Initialize Vuex store
    app.use(store)

    // Initialize Router
    app.use(router)

    // Initialize Toast
    app.use(Toast, {
      position: 'top-right',
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false
    })

    // Initialize auth
    const authResult = await initializeAuth();
    if (!authResult.success) {
      throw new Error(authResult.error);
    }

    // Mount the app
    app.mount('#app')

  } catch (error) {
    console.error('Failed to initialize app:', error)
    document.body.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h1>Unable to Load Application</h1>
        <p>${error.message}</p>
        <p>Please check your configuration and try again.</p>
      </div>
    `
  }
}

// Initialize the application
initializeApp()
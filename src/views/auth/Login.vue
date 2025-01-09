<template>
  <!-- ... existing template ... -->
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { useNotification } from '../../composables/useNotification';

export default {
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const notification = useNotification();
    
    const form = ref({
      email: '',
      password: ''
    });
    
    const error = computed(() => store.getters['auth/error']);
    const isLoading = computed(() => store.getters['auth/isLoading']);

    const handleSubmit = async () => {
      try {
        const result = await store.dispatch('auth/login', {
          email: form.value.email,
          password: form.value.password
        });

        if (result?.success) {
          const redirectPath = route.query.redirect || '/dashboard';
          await router.push(redirectPath);
        } else {
          notification.showError(result?.error || 'Login failed');
        }
      } catch (err) {
        console.error('Login error:', err);
        notification.showError('An unexpected error occurred');
      }
    };

    return {
      form,
      error,
      isLoading,
      handleSubmit
    };
  }
};
</script>
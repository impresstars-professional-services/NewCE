<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

export default {
  name: 'Signup',
  setup() {
    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });

    const isFormValid = computed(() => {
      return (
        form.value.firstName &&
        form.value.lastName &&
        form.value.email &&
        form.value.password &&
        form.value.password === form.value.confirmPassword
      );
    });

    const isLoading = ref(false);
    const error = ref(null);
    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = async () => {
      if (!isFormValid.value) {
        if (form.value.password !== form.value.confirmPassword) {
          error.value = 'Passwords do not match';
          toast.error(error.value);
        }
        return;
      }

      isLoading.value = true;
      error.value = null;

      try {
        const result = await store.dispatch('auth/signUp', {
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          email: form.value.email,
          phone: form.value.phone,
          password: form.value.password,
        });

        if (result.success) {
          toast.success('Account created successfully!');
          router.push('/dashboard');
        } else {
          error.value = result.error || 'Failed to create account';
          toast.error(error.value);
        }
      } catch (err) {
        console.error('Signup error:', err);
        error.value = 'An unexpected error occurred';
        toast.error(error.value);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      form,
      isFormValid,
      isLoading,
      error,
      handleSubmit,
    };
  },
};
</script>

<template>
  <div class="signup container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Sign Up</h1>
    <form @submit.prevent="handleSubmit" class="max-w-lg mx-auto">
      <label for="firstName" class="block mb-2">First Name</label>
      <input
        v-model="form.firstName"
        id="firstName"
        class="block w-full border rounded p-2 mb-4"
        type="text"
        required
      />

      <label for="lastName" class="block mb-2">Last Name</label>
      <input
        v-model="form.lastName"
        id="lastName"
        class="block w-full border rounded p-2 mb-4"
        type="text"
        required
      />

      <label for="email" class="block mb-2">Email</label>
      <input
        v-model="form.email"
        id="email"
        class="block w-full border rounded p-2 mb-4"
        type="email"
        required
      />

      <label for="phone" class="block mb-2">Phone</label>
      <input
        v-model="form.phone"
        id="phone"
        class="block w-full border rounded p-2 mb-4"
        type="tel"
      />

      <label for="password" class="block mb-2">Password</label>
      <input
        v-model="form.password"
        id="password"
        class="block w-full border rounded p-2 mb-4"
        type="password"
        required
      />

      <label for="confirmPassword" class="block mb-2">Confirm Password</label>
      <input
        v-model="form.confirmPassword"
        id="confirmPassword"
        class="block w-full border rounded p-2 mb-4"
        type="password"
        required
      />

      <button
        :disabled="isLoading"
        class="block w-full bg-blue-500 text-white rounded py-2"
        type="submit"
      >
        {{ isLoading ? 'Signing Up...' : 'Sign Up' }}
      </button>
    </form>
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
  </div>
</template>

<style scoped>
/* Add any specific styling for your signup form here */
</style>

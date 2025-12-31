<template>
  <div data-testid="register-form" class="space-y-2">
    <Toast :message="errorMessage"/>
    <h2>Register</h2>
    <input
        v-model="username"
        placeholder="Username"
        data-testid="register-username"
        name="username"
        class="mr-2 md:w-full md:mr-0 md:p-2"
    />
    <input
        type="password"
        v-model="password"
        placeholder="Password"
        data-testid="register-password"
        name="password"
        class="mr-2 md:w-full md:mr-0 md:p-2"
    />
    <button
        class="min-w-[120px] md:w-full md:min-w-0 md:p-3"
        @click="register"
        data-testid="register-submit"
    >
      Register
    </button>
  </div>
</template>

<script>

import api from '@/utils/api';
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      this.errorMessage = '';

      try {
        const token = await api.register(this.username, this.password);

        this.$emit('register', token);
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Registration failed';

        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }

      return false;
    }
  }
};
</script>
<template>
  <div data-testid="login-form">
    <Toast :message="errorMessage" />
    <h2>Login</h2>
    <input
      v-model="username"
      placeholder="Username"
      data-testid="login-username"
      name="username"
    />
    <input
      type="password"
      v-model="password"
      placeholder="Password"
      data-testid="login-password"
      name="password"
    />
    <button
      class="login-button"
      @click="login"
      data-testid="login-submit"
    >
      Login
    </button>
  </div>
</template>

<script>

import api from '@/utils/api.js';
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
    async login() {
      this.errorMessage = '';

      try {
        const token = await api.login(this.username, this.password);

        this.$emit('login', token);
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Login failed';
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    }
  }
};

</script>

<style lang="scss" scoped>

input {
  margin-right: 8px;
}

button {
  min-width: 120px;
}

</style>

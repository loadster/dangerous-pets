<template>
  <div>
    <Toast :message="errorMessage" />
    <h2>Register</h2>
    <input v-model="username" placeholder="Username"/>
    <input type="password" v-model="password" placeholder="Password"/>
    <button class="register-button" @click="register">Register</button>
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

<style lang="scss" scoped>

input {
  margin-right: 8px;
}

button {
  min-width: 120px;
}

</style>
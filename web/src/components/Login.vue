<template>
  <div>
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button class="login-button" @click="login">Login</button>
  </div>
</template>

<script>

import api from '@/utils/api.js';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const token = await api.login(this.username, this.password);

        this.$emit('login', token);
      } catch (error) {
        console.error(error);
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

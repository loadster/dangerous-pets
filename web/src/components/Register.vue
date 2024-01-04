<template>
  <div>
    <h2>Register</h2>
    <input v-model="username" placeholder="Username"/>
    <input type="password" v-model="password" placeholder="Password"/>
    <button @click="register">Register</button>
  </div>
</template>

<script>

import api from '@/utils/api';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const token = await api.register(this.username, this.password);

        this.$emit('register', token);
      } catch (error) {
        console.error(error);
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
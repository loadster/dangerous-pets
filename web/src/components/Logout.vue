<template>
  <div>
    <button @click="logout" class="logout px-2" data-testid="logout-button">Logout</button>
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
    async logout() {
      try {
        await api.logout();

        this.$emit('logout', null);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

</script>

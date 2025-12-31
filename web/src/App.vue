<template>
  <div id="app" data-testid="app" class="p-12 lg:p-8 md:p-6 sm:p-4 max-w-screen-xl mx-auto">
    <div v-if="token" class="space-y-8">
      <h1 data-testid="app-title">Dangerous Pets</h1>
      <Shop/>
      <Logout @logout="setToken"/>
    </div>
    <div v-else class="mx-auto max-w-screen-sm space-y-8">
      <h1 data-testid="app-title">Dangerous Pets</h1>
      <Register @register="setToken"/>
      <Login @login="setToken"/>
    </div>
  </div>
</template>

<script>

import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Shop from './components/Shop.vue';
import Logout from "@/components/Logout.vue";
import api from "@/utils/api";

export default {
  components: {
    Logout,
    Register,
    Login,
    Shop
  },
  data() {
    return {
      token: null
    };
  },
  async mounted() {
    this.token = localStorage.getItem('token');

    if (this.token) {
      try {
        api.init(this.token);

        await api.inventory.list();
      } catch (err) {
        localStorage.removeItem('token');

        api.init(null);

        this.token = null;
      }
    }
  },
  methods: {
    setToken(token) {
      this.token = token;

      localStorage.setItem('token', token);
    }
  }
};
</script>
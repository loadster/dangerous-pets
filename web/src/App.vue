<template>
  <div id="app" data-testid="app" class="p-12 lg:p-8 md:p-6 sm:p-4">
    <h1 data-testid="app-title">Dangerous Pets</h1>
    <template v-if="token">
      <Shop/>
      <div class="py-16 md:py-8">
        <Logout @logout="setToken"/>
      </div>
    </template>
    <template v-else>
      <Register @register="setToken"/>
      <Login @login="setToken"/>
    </template>
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
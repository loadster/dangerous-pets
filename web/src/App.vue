<template>
  <div id="app" data-testid="app">
    <h1 data-testid="app-title">Dangerous Pets</h1>
    <template v-if="token">
      <Shop/>
      <div class="controls">
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

<style lang="scss">

@font-face {
  font-family: "VT";
  src: url("@/assets/fonts/VT323-Regular.ttf");
}

* {
  font-family: "VT", "serif";
  font-size: 24px;
}

html, body {
  margin: 0;
  padding: 0;
  background: black;
  color: white;
}

h1 {
  font-size: 48px;
  margin-top: 0;
}

input, button {
  background: transparent;
  color: white;
  border: 2px solid white;
}

button, input[type=button] {
  cursor: pointer;
}

#app {
  padding: 48px;
}

.controls {
  padding: 64px 0;
}

.muted {
  opacity: 0.6;
}

</style>
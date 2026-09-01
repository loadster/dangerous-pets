<template>
  <div id="app" data-testid="app" class="p-12 lg:p-8 md:p-6 sm:p-4 max-w-screen-xl mx-auto">
    <div v-if="token" class="space-y-8">
      <h1 data-testid="app-title">Dangerous Pets</h1>
      <Shop/>
      <Logout @logout="setToken"/>
    </div>
    <div v-else class="mx-auto max-w-screen-sm space-y-8">
      <h1 data-testid="app-title">Dangerous Pets</h1>
      <p data-testid="demo-notice" class="border-2 border-retro-bronze p-4">
        Dangerous Pets is a fictional pet store that exists as a practice target for load testing
        with <a href="https://loadster.com/" class="underline">Loadster</a>. Registering is part of
        the fun, but it's not a real account: make up a throwaway username and password, and never
        use a password from a real account.
      </p>
      <div class="flex justify-between gap-4">
        <img v-for="pet in samplePets" :key="pet.id" :src="`/images/${pet.id}.png`" :alt="pet.name"
             :title="pet.name" width="96" height="96" class="sm:w-24 sm:h-24 w-16 h-16"/>
      </div>
      <Register @register="setToken"/>
      <Login @login="setToken"/>
    </div>
    <footer class="muted mt-16 space-x-2">
      <span>A load testing playground from <a href="https://loadster.com/" class="underline">Loadster</a>.</span>
      <span>Accounts are fake, the gold is imaginary, and the pets are dangerous.</span>
      <a href="https://github.com/loadster/dangerous-pets" class="underline">Source on GitHub</a>
    </footer>
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
      token: null,
      samplePets: [
        { id: 'spiky_dragon', name: 'Spiky Dragon' },
        { id: 'rabid_raccoon', name: 'Rabid Raccoon' },
        { id: 'killer_bees', name: 'Killer Bees' },
        { id: 'cthulhu_hound', name: 'Cthulhu Hound' }
      ]
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
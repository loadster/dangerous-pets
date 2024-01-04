<template>
  <div id="shop">
    <div>
      <h2>Pets For Sale</h2>
      <div class="search">
        <input v-model="query" @input="refresh" placeholder="Search" />
      </div>
      <div class="inventory">
        <div v-for="pet in inventory" :key="pet.id" class="inventory-item">
          <img :src="`/images/${pet.id}.png`" :title="pet.name" width="128" height="128"/>
          <div>
            {{ pet.name }}<br/>
            {{ pet.type }}<br/>
            <span class="gold">@</span>{{ pet.price }}<br/>
            <button @click="addToBag(pet)">Add to Bag</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>Your Bag</h2>
      <div class="bag">
        <div v-for="pet in bag" :key="pet.id" class="bag-item">
          {{ pet.name }} - ${{ pet.price }}
          <button @click="removeFromBag(pet)">Remove</button>
        </div>
      </div>
      <div class="checkout" v-if="bag.length">
        <button @click="checkout()">Checkout</button>
      </div>
      <div v-else class="muted">
        Nothing is in your bag.
      </div>

      <Possessions :gold="possessions.gold" :pets="possessions.items"/>
    </div>
  </div>
</template>

<script>

import Possessions from "@/components/Possessions.vue";
import api from '@/utils/api';

export default {
  components: {
    Possessions
  },
  data() {
    return {
      inventory: [],
      bag: [],
      possessions: {
        gold: 0,
        items: []
      },
      query: ''
    };
  },
  async created() {
    try {
      this.inventory = await api.inventory.list();
      this.bag = await api.bag.list();
      this.possessions = await api.possessions.get();
    } catch (error) {
      console.error(error.response.data);
    }
  },
  methods: {
    async refresh() {
      if (this.query) {
        this.inventory = await api.inventory.search(this.query);
      } else {
        this.inventory = await api.inventory.list();
      }
    },
    async addToBag(item) {
      try {
        await api.bag.add(item.id);

        this.bag = await api.bag.list();
      } catch (error) {
        console.error(error.response.data);
      }
    },
    async removeFromBag(pet) {
      try {
        await api.bag.delete(pet.id);

        this.bag = await api.bag.list();
      } catch (error) {
        console.error(error.response.data);
      }
    },
    async checkout () {
      try {
        await api.purchase();
      } catch (err) {
        alert('Purchase failed!');
      }

      this.bag = await api.bag.list();
      this.possessions = await api.possessions.get();
    }
  }
};

</script>

<style lang="scss">

#shop {
  display: flex;
  column-gap: 64px;
}

.search {
  padding: 8px 0;
  text-align: right;
}

.inventory {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 16px;
  row-gap: 16px;
  padding: 16px;
  background: #ad7d2d;
  flex-grow: 100;
}

.inventory-item {
  background: black;
  padding: 16px;
  display: flex;
  gap: 16px;
  white-space: nowrap;
  align-items: center;

  button {
    margin: 16px 0 0 0;
  }
}

.bag {
  margin: 64px 0;

  .bag-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0;
    gap: 32px;
  }
}

.checkout {
  button {
    display: block;
    width: 100%;
    padding: 8px;
  }
}

</style>
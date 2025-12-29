<template>
  <div id="shop">
    <template v-if="!showCheckout">
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
      <div class="sidebar">
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
        </div>

        <Possessions :gold="possessions.gold" :pets="possessions.items"/>
      </div>
    </template>

    <template v-else>
      <div class="checkout-screen">
        <h2>Checkout</h2>
        <div class="checkout-summary">
          <div class="summary-row">
            <span>Your Gold:</span>
            <span><span class="gold">@</span>{{ possessions.gold }}</span>
          </div>
          <div class="summary-row">
            <span>Total Cost:</span>
            <span><span class="gold">@</span>{{ totalCost }}</span>
          </div>
          <div class="summary-row total">
            <span>Remaining Gold:</span>
            <span><span class="gold">@</span>{{ possessions.gold - totalCost }}</span>
          </div>
        </div>

        <div class="pets-list">
          <h3>Pets in Your Bag:</h3>
          <div v-for="pet in bag" :key="pet.id" class="checkout-pet">
            {{ pet.name }} - <span class="gold">@</span>{{ pet.price }}
          </div>
        </div>

        <div class="checkout-actions">
          <button @click="confirmPurchase()" class="buy-button">Buy Pets</button>
          <button @click="cancelCheckout()" class="cancel-button">Nevermind</button>
        </div>
      </div>
    </template>
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
      query: '',
      showCheckout: false
    };
  },
  computed: {
    totalCost() {
      return this.bag.reduce((sum, pet) => sum + (pet.price || 0), 0);
    }
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
    checkout() {
      this.showCheckout = true;
    },
    async confirmPurchase() {
      try {
        await api.purchase();
        this.showCheckout = false;
        this.bag = await api.bag.list();
        this.possessions = await api.possessions.get();
      } catch (err) {
        alert('Purchase failed!');
      }
    },
    cancelCheckout() {
      this.showCheckout = false;
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

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.checkout-screen {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
  background: #ad7d2d;

  h2 {
    margin-top: 0;
  }

  h3 {
    font-size: 32px;
    margin-bottom: 16px;
  }
}

.checkout-summary {
  background: black;
  padding: 24px;
  margin: 32px 0;

  .summary-row {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &.total {
      margin-top: 32px;
      padding-top: 16px;
      border-top: 2px solid white;
      font-size: 28px;
    }
  }
}

.pets-list {
  margin: 32px 0;

  .checkout-pet {
    padding: 8px 0;
  }
}

.checkout-actions {
  display: flex;
  gap: 16px;
  margin-top: 48px;

  button {
    flex: 1;
    padding: 16px;
    font-size: 28px;
    cursor: pointer;
    white-space: nowrap;

    &.buy-button {
      background: #2d7d2d;
      border-color: #2d7d2d;
    }

    &.cancel-button {
      background: transparent;
    }
  }
}

.gold {
  color: #ffd700;
}

</style>
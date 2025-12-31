<template>
  <div id="shop" data-testid="shop" class="flex flex-col gap-16 xl:gap-8 md:flex-row-reverse md:gap-8 sm:gap-6 w-full">
    <Toast :message="errorMessage" />
    <template v-if="!showCheckout">
      <div class="grow">
        <h2>Pets For Sale</h2>
        <div class="py-2 text-right md:text-left">
          <input
            v-model="query"
            @input="refresh"
            placeholder="Search"
            data-testid="search-input"
            name="search"
            class="md:w-full md:p-2"
          />
        </div>
        <div class="grid grid-cols-1 border-8 border-retro-bronze xl:grid-cols-3 md:grid-cols-2" data-testid="inventory">
          <div
            v-for="pet in inventory"
            :key="pet.id"
            class="bg-black border-8 border-retro-bronze p-8 flex flex-col justify-center sm:flex-row gap-4 whitespace-nowrap items-center md:flex-col md:items-start md:gap-2 md:whitespace-normal"
            :data-testid="`inventory-item-${pet.id}`"
          >
            <img
              :src="`/images/${pet.id}.png`"
              :title="pet.name"
              width="128"
              height="128"
              :alt="pet.name"
              class="md:self-center sm:w-24 sm:h-24"
            />
            <div>
              {{ pet.name }}<br/>
              <span class="gold">@</span>{{ pet.price }}<br/>
              <button
                @click="addToBag(pet)"
                :data-testid="`add-to-bag-${pet.id}`"
                class="px-2"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between min-w-[240px] md:order-[-1]">
        <div>
          <h2>Your Bag</h2>
          <div class="my-16 xl:my-8 md:my-6 md:w-full" data-testid="bag">
            <div
              v-for="pet in bag"
              :key="pet.id"
              class="flex items-center justify-between my-4 gap-8 md:flex-col md:items-start md:gap-2 md:w-full md:break-words"
              :data-testid="`bag-item-${pet.id}`"
            >
              {{ pet.name }} - ${{ pet.price }}
              <button
                @click="removeFromBag(pet)"
                :data-testid="`remove-from-bag-${pet.id}`"
                class="md:w-full"
              >
                Remove
              </button>
            </div>
          </div>
          <div class="md:w-full" v-if="bag.length">
            <button @click="checkout()" data-testid="checkout-button" class="block w-full p-2">
              Checkout
            </button>
          </div>
          <div v-else class="muted" data-testid="bag-empty">
            Nothing is in your bag.
          </div>
        </div>

        <Possessions :gold="possessions.gold" :pets="possessions.items"/>
      </div>
    </template>

    <template v-else>
      <div class="max-w-[600px] mx-auto border-8 border-retro-bronze md:max-w-full p-6" data-testid="checkout-screen">
        <h2 class="mt-0">Checkout</h2>
        <div class="bg-black p-6 my-8 md:p-6 md:my-6" data-testid="checkout-summary">
          <div class="flex justify-between my-4 md:my-3">
            <span>Your Gold:</span>
            <span data-testid="checkout-current-gold">
              <span class="gold">@</span>{{ possessions.gold }}
            </span>
          </div>
          <div class="flex justify-between my-4 md:my-3">
            <span>Total Cost:</span>
            <span data-testid="checkout-total-cost">
              <span class="gold">@</span>{{ totalCost }}
            </span>
          </div>
          <div class="flex justify-between my-4 mt-8 pt-4 border-t-2 border-white text-retro-xlarge md:my-3 md:mt-6 md:pt-3 md:text-retro-xlarge-mobile">
            <span>Remaining Gold:</span>
            <span data-testid="checkout-remaining-gold">
              <span class="gold">@</span>{{ possessions.gold - totalCost }}
            </span>
          </div>
        </div>

        <div class="my-8" data-testid="checkout-pets-list">
          <h3 class="text-retro-h3 mb-4 sm:text-retro-h3-mobile">Pets in Your Bag:</h3>
          <div
            v-for="pet in bag"
            :key="pet.id"
            class="py-2"
            :data-testid="`checkout-pet-${pet.id}`"
          >
            {{ pet.name }} - <span class="gold">@</span>{{ pet.price }}
          </div>
        </div>

        <div class="flex gap-4 mt-12 md:flex-col md:gap-3 md:mt-6">
          <button
            @click="confirmPurchase()"
            class="flex-1 p-4 text-retro-button-large cursor-pointer whitespace-nowrap bg-retro-green border-retro-green md:w-full md:p-3 md:text-retro-button-mobile sm:p-2.5 sm:text-retro-button-mobile-sm"
            data-testid="buy-pets-button"
          >
            Buy Pets
          </button>
          <button
            @click="cancelCheckout()"
            class="flex-1 p-4 text-retro-button-large cursor-pointer whitespace-nowrap bg-transparent md:w-full md:p-3 md:text-retro-button-mobile sm:p-2.5 sm:text-retro-button-mobile-sm"
            data-testid="cancel-checkout-button"
          >
            Nevermind
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import Possessions from "@/components/Possessions.vue";
import Toast from "@/components/Toast.vue";
import api from '@/utils/api';

export default {
  components: {
    Possessions,
    Toast
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
      showCheckout: false,
      errorMessage: ''
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
      this.errorMessage = '';

      try {
        await api.purchase();
        this.showCheckout = false;
        this.bag = await api.bag.list();
        this.possessions = await api.possessions.get();
      } catch (err) {
        this.errorMessage = err.response?.data?.message || 'Purchase failed!';
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    },
    cancelCheckout() {
      this.showCheckout = false;
    }
  }
};

</script>

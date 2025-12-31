<template>
  <div id="possessions" data-testid="possessions" class="my-12 md:my-8 sm:my-6">
    <div class="mb-6">
      Your Gold:
      <div class="text-retro-large pt-2.5 md:text-retro-gold-mobile sm:text-retro-gold-mobile-sm" data-testid="gold-amount">
        <span class="gold">@</span>{{ gold }}
      </div>
    </div>
    <div>
      <div class="mb-4">Your Pets:</div>
      <div v-if="pets.length" class="flex gap-2 mt-2" data-testid="owned-pets">
        <img
          v-for="(pet, index) in pets"
          :key="index"
          :src="`/images/${pet.id}.png`"
          :title="pet.name"
          :alt="pet.name"
          class="w-12 h-12 aspect-square border-2 border-white bg-black hover:border-retro-gold"
          :data-testid="`owned-pet-${pet.id}`"
        />
      </div>
      <div v-else class="muted" data-testid="no-pets">None yet!</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    gold: {
      type: Number,
      required: true
    },
    pets: {
      type: Array,
      required: false,
      default: () => []
    }
  }
};

</script>
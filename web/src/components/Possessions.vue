<template>
  <div id="possessions">
    <div class="gold-display">
      Your Gold: <span class="gold">@</span>{{ gold }}
    </div>
    <div class="pets-section">
      <div class="pets-label">Your Pets:</div>
      <div v-if="pets.length" class="pets-grid">
        <img
          v-for="(pet, index) in pets"
          :key="index"
          :src="`/images/${pet.id}.png`"
          :title="pet.name"
          class="pet-icon"
        />
      </div>
      <div v-else class="muted">None yet</div>
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

<style lang="scss">

#possessions {
  margin: 48px 0;
}

.gold {
  color: gold;
}

.gold-display {
  margin-bottom: 24px;
}

.pets-section {
  .pets-label {
    margin-bottom: 16px;
  }

  .pets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 64px);
    gap: 8px;
    margin-top: 8px;
  }

  .pet-icon {
    width: 64px;
    height: 64px;
    border: 2px solid white;
    background: black;
    cursor: help;

    &:hover {
      border-color: gold;
    }
  }
}

</style>
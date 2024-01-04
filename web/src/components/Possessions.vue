<template>
  <div id="gold">
    Your Gold: <span class="gold">@</span>{{ gold }}<br/>
    Your Pets: {{ pets.length }}
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

#gold {
  margin: 48px 0;
}

.gold {
  color: gold;
}

</style>
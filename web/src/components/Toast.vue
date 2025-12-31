<template>
  <div
    v-if="message"
    class="fixed top-5 left-1/2 -translate-x-1/2 bg-retro-red-dark border-2 border-retro-red text-white px-8 py-4 z-[9999] animate-slide-in max-w-[600px] text-center md:max-w-[calc(100%-32px)] md:px-5 md:py-3 md:top-4 sm:max-w-[calc(100%-24px)] sm:px-4 sm:py-2.5 sm:text-retro-toast-mobile-sm sm:top-3"
    data-testid="error-toast"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  }
};
</script>

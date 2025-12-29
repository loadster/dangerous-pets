<template>
  <div v-if="message" class="toast" data-testid="error-toast">
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

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #8b0000;
  border: 2px solid #ff0000;
  color: white;
  padding: 16px 32px;
  z-index: 9999;
  animation: slideIn 0.3s ease-out;
  max-width: 600px;
  text-align: center;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>

<template>
  <div class="loading">
    <div class="loading__outer">
      <v-progress-circular
        :size="60"
        color="primary"
        indeterminate
      />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" >
.loading {
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  &__outer {
    display: flex;
    width: 100%;
    min-height: 100%;
    background: rgba(255, 255, 255, 0.7);
    align-items: center;
    justify-content: center;
  }
}
</style>

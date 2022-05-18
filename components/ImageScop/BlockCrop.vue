<template>
  <div
    class="block"
    :class="{ 'selected-block': computedSelected}"
    @click="handleClick"
  />
</template>

<script>
export default {
  name: 'BlockCrop',
  props: {
    blockData: { type: Object, required: true }
  },
  emits: ['onSelected'],
  computed: {
    computedSelected () {
      return this.blockData?.isSelected || this.blockData?.isHolding
    }
  },
  methods: {
    handleClick () {
      this.$emit('onSelected', this.blockData?.id, !this.blockData?.isSelected)
    }
  }
}
</script>

<style>
.block {
  display: flex;
  border: 1px solid #dadce0;
}
.selected-block {
  border: 1px solid red;
}
</style>

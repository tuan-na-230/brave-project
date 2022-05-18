<template>
  <div class="main">
    <img ref="imageArea" :src="url" :style="{width: `${width}px`}" :draggable="false">
    <div
      class="main-grid"
      draggable="false"
      :style="{width: `${width + 2}px`, height: `${height}px`}"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
    >
      <BlockCrop
        v-for="(item, index) in selectedBlock"
        :key="index"
        :block-data="item"
        :style="{ width: `${widthBlock}px`, height: `${heightBlock}px` }"
        @onSelected="handleChangeSelected"
      />
    </div>
    <div
      class="crop-area"
      :style="{
        display: isMultiSelected ? 'block' : 'none',
        transform: `translate(${
          isMultiSelected ? Math.min(startHoldClick.x, endHoldClick.x) : 0
        }px, ${
          isMultiSelected ? Math.min(startHoldClick.y, endHoldClick.y) : 0
        }px)`,
        width: `${
          isMultiSelected ? Math.abs(endHoldClick.x - startHoldClick.x) : 0
        }px`,
        height: `${
          isMultiSelected ? Math.abs(endHoldClick.y - startHoldClick.y) : 0
        }px`,
      }"
    />
  </div>
</template>

<script>

import { conditionSelectBlock } from '../../helpers/index'
import BlockCrop from './BlockCrop.vue'
export default {
  name: 'ImageCrop',
  components: {
    BlockCrop
  },
  props: {
    numberBlockWidth: {
      type: Number,
      required: true
    },
    numberBlockHeight: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isMultiSelected: false,
      startHoldClick: { x: undefined, y: undefined },
      endHoldClick: { x: undefined, y: undefined },
      widthBlock: 0,
      heightBlock: 0,
      selectedBlock: []
    }
  },
  computed: {
    holdArea () {
      const xStart = Math.min(this.startHoldClick.x, this.endHoldClick.x)
      const xEnd = Math.max(this.startHoldClick.x, this.endHoldClick.x)
      const yStart = Math.min(this.startHoldClick.y, this.endHoldClick.y)
      const yEnd = Math.max(this.startHoldClick.y, this.endHoldClick.y)
      return {
        x: { start: xStart, end: xEnd },
        y: { start: yStart, end: yEnd }
      }
    }
  },
  watch: {
    holdArea (newState) {
      const list = [...this.selectedBlock]
      const temp = list.map((o) => {
        const range = o.range
        if (conditionSelectBlock(range, newState)) {
          return { ...o, isHolding: true }
        }
        return { ...o, isHolding: false }
      })
      this.selectedBlock = temp
    }
  },
  mounted () {
    this.height = this.$refs.imageArea.clientHeight
    this.widthBlock = this.$refs.imageArea.clientWidth / this.numberBlockWidth
    this.heightBlock = this.$refs.imageArea.clientHeight / this.numberBlockHeight
    const temp = []
    for (let y = 0; y < this.numberBlockHeight; y++) {
      for (let x = 0; x < this.numberBlockWidth; x++) {
        temp.push({
          id: `${x}|${y}`,
          range: {
            x: { start: x * this.widthBlock, end: (x + 1) * this.widthBlock },
            y: {
              start: y * this.heightBlock,
              end: (y + 1) * this.heightBlock
            }
          },
          isSelected: false,
          isHolding: false
        })
      }
    }
    this.selectedBlock = temp
  },
  methods: {
    handleMouseDown (e) {
      this.startHoldClick = { x: e.layerX, y: e.layerY }
      this.isMultiSelected = true
    },
    handleMouseUp () {
      const list = [...this.selectedBlock]
      this.selectedBlock = list.map((o) => {
        const range = o.range
        if (conditionSelectBlock(range, this.holdArea)) {
          return { ...o, isSelected: true, isHolding: false }
        }
        return { ...o, isHolding: false }
      })
      this.startHoldClick = { x: undefined, y: undefined }
      this.endHoldClick = { x: undefined, y: undefined }
      this.isMultiSelected = false
    },
    handleMouseMove (e) {
      if (this.isMultiSelected) {
        this.endHoldClick = { x: e.layerX, y: e.layerY }
      }
    },
    handleChangeSelected (id, isSelected) {
      const temp = [...this.selectedBlock]
      const index = temp.findIndex(o => o?.id === id)
      temp[index] = { ...temp[index], isSelected }
      this.selectedBlock = temp
    }
  }
}
</script>
<style scoped>
.main {
  position: relative;
}
.crop-area {
  position: absolute;
  display: block;
  border: 1px solid #4af;
  background: rgba(68, 170, 255, 0.5);
  pointer-events: none;
  will-change: transform;
  z-index: 100;
  left: 0px;
  top: 0px;
}
.main-grid {
  border: 1px solid #ddd;
  position: absolute;
  user-select: none;
  top: 0px;
  display: flex;
  flex-wrap: wrap;
}
</style>

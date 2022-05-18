<template>
  <div>
    <ImageCrop
      :number-block-width="12"
      :number-block-height="12"
      :width="800"
      :url="`https://kenh14cdn.com/203336854389633024/2021/5/16/ezgifcom-gif-maker-5-1621145345841808518154.gif.png`"
    />
  </div>
</template>

<script>
import ImageCrop from '../components/ImageScop/ImageCrop.vue'
export default {
  components: {
    ImageCrop
  }
}
</script>

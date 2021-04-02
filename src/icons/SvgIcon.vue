<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { ref,computed } from '@vue/composition-api'
export default {
  name: 'svgIcon',
  props:{
    iconClass:{
      type: String,
      default: '',
    },
    className:{
      type: String,
      default: '',
    }
  },
  setup(props){

    const iconName = computed(() => `#icon-${props.iconClass}`)

    const svgClass = computed(() => {
      if(props.className){
        return `svg-icon ${props.className}`
      }else{
        return `svg-icon`
      }
    })

    return {
      iconName,
      svgClass
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon{
  width: 1em;
  height: 1em;
  fill: currentColor;
  color: #fff;
  // &.font12{
  //   font-size: 12px;
  // }
  // &.font50{
  //   font-size: 50px;
  // }
}
</style>
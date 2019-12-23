<template>
  <div>
    {{ item }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    {{ funding }}
  </div>
</template>

<script>
export default {
  props: {
    funding: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

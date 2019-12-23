<template>
  <div>
    <v-switch
      v-model="toggle"
      :label="pageHeading"
    />
  </div>
</template>

<script>
import { EventBus } from '@/event-bus'
export default {
  name: 'Toggle',
  data() {
    return {
      toggle: true
    }
  },
  computed: {
    pageHeading() {
      if (this.toggle) {
        return 'current'
      } else {
        return 'expired'
      }
    }
  },
  watch: {
    toggle(newValue, oldValue) {
      EventBus.$emit('toggle', this.pageHeading)
    }
  },
  mounted() {
    EventBus.$emit('toggle', this.pageHeading)
  },
  methods: {}
}
</script>

<style scoped>
</style>

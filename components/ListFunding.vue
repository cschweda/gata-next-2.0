<template>
  <div>
    <div
      v-for="item in filteredFunding"
      :key="item.title"
    >
      <v-card
        class="mb-10 elevation-1 py-6"
        @click="routeToItem(item)"
      >
        <div v-if="toggleState === 'expired'">
          EXPIRED: {{ item.expires | format }}
        </div>
      

        <h2 class="px-3 pt-3">
          {{ item.title }}
        </h2>
        <v-card-text class="px-3">
          {{ item.excerpt }}
        </v-card-text>
        <v-card-text class="px-3 text-right">
          Posted: {{ item.posted | format }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import FundingCard from '@/components/FundingCard'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FundingCard
  },
  props: {
    funding: {
      type: Array,
      default: () => []
    },
    toggleState: {
      type: String,
      default: 'current'
    }
  },
  data() {
    return {
      filteredFunding: []
    }
  },
  watch: {
    toggleState(newValue, oldValue) {
      const today = new Date()
      const target = new Date(today.getTime() - 24 * 60 * 60 * 1000)

      let filteredFunding = []
      if (newValue === 'current') {
        this.funding.forEach(x => {
          let expiration = new Date(x.expires)
          if (expiration > target) filteredFunding.push(x)
        })
      } else {
        this.funding.forEach(x => {
          if (new Date(x.expires) < target) filteredFunding.push(x)
        })
      }
      this.filteredFunding = filteredFunding
    }
  },
  methods: {
    routeToItem(item) {
      this.$router.push(item.path)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

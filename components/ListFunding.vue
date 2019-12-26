<template>
  <div>
    <div
      v-if="filteredFunding.length === 0"
      class="text-center mb-10 mt-3"
    >
      <h2>
        There are no {{ toggleState }} funding opportunities to display.
      </h2>
    </div>
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
        <div v-else>
          Expires: {{ item.expires | format }}
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
      const target = new Date(today.setHours(0, 0, 0, 0))

      let filteredFunding = []
      if (newValue === 'current') {
        this.funding.forEach(x => {
          let expiration = new Date(x.expires)
          let expirationAdjusted = new Date(
            expiration.getTime() + 24 * 60 * 60 * 250
          )
          expirationAdjusted = new Date(
            expirationAdjusted.setDate(expirationAdjusted.getDate() + 1)
          )
          let posted = new Date(x.posted)
          let postedAdjusted = new Date(posted.getTime() + 24 * 60 * 60 * 250)
          // console.log(
          //   `Expiration: ${expirationAdjusted} -- Target: ${target} -- Posted: ${postedAdjusted}`
          // )
          if (
            expirationAdjusted > target &&
            x.status === 'live' &&
            postedAdjusted <= today
          )
            filteredFunding.push(x)
        })
      } else {
        this.funding.forEach(x => {
          let expiration = new Date(x.expires)
          //console.log(`Expiration: ${expiration} -- Target: ${target}`)
          if (expiration < target && x.status === 'live')
            filteredFunding.push(x)
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

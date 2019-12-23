<template>
  <div>
    <base-content
      id="baseContentTop"
      :loading="loading"
    >
      <template v-slot:title>
        <v-container
          v-if="content"
        >
          <v-row class="text-center">
            <v-col>
              <h1>{{ content.title }}</h1>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:content>
        <v-container
          v-if="content"
          id="scrollArea"
        >
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
              order-md="1"
              order="2"
              order-sm="2"
            >
              <div
                class="dynamic-content"
                @click="handleClicks"
                v-html="content.html"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <h2>Funding Opportunities</h2>
              <toggle />
              <list-funding
                :key="renderKey"
                :funding="funding"
                :toggle-state="toggleState"
                @click="updateRenderKey()"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </base-content>
  </div>
</template>

<script>
import BaseContent from '@/components/BaseContent'
import ListFunding from '@/components/ListFunding'
import Toggle from '@/components/Toggle'
import { EventBus } from '@/event-bus'
import { getContent, getAllFunding } from '@/services/Content'
import { handleClicks } from '@/mixins/handleClicks'
export default {
  components: {
    BaseContent,
    ListFunding,
    Toggle
  },
  mixins: [handleClicks],
  async asyncData({ isDev, redirect }) {
    try {
      let content = await getContent('pages', 'home')
      let funding = await getAllFunding()
      let loading = false
      return { content, funding, loading }
    } catch (error) {
      let loading = false
      let content = ''
      console.log(error)
      redirect('/404')
    }
  },
  data() {
    return {
      hideExpired: true,
      content: null,
      loading: true,
      toggleState: null,
      renderKey: 0
    }
  },
  created() {
    EventBus.$on('toggle', state => {
      this.toggleState = state
      //console.log(this.toggleState)
    })
  },
  methods: {
    updateRenderey() {
      return this.renderKey++
    }
  }
}
</script>

<style>
</style>

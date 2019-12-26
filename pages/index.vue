<template>
  <div>
    <div
      v-if="content"
      class="text-center py-8"
      style="background: #0D4474; margin-top: 90px;"
    >
      <h1 style="color: #fff">
        {{ content.title }}
      </h1>
    </div>
    
    <base-content
      :loading="loading"
      style="margin-top: -100px"
    >
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
                
                :funding="funding"
                :toggle-state="toggleState"
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
      toggleState: null
    }
  },
  created() {
    EventBus.$on('toggle', state => {
      this.toggleState = state
      //console.log(this.toggleState)
    })
  },
  methods: {}
}
</script>

<style>
</style>

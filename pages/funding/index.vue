<template>
  <div>
    <base-content
      v-if="page.content && page.status === 200"
      id="baseContentTop"
      :loading="page.loading"
    >
      <template v-slot:title>
        <v-container
          v-if="content"
        >
          <v-row class="text-left">
            <v-col>
              <h1 class="page-title rule">
                {{ page.content.title }}
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:content>
        <v-container
          v-if="page.content && page.status === 200"
          id="scrollArea"
        >
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <toggle />
              
              <list-funding
              
                :funding="page.funding"
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
    let page = {}
    try {
      page.content = await getContent('pages', 'home')
      page.funding = await getAllFunding()
      page.loading = false
      page.error = null
      page.status = 200
      page.redirect = null
    } catch (error) {
      page.content = null
      page.funding = null
      page.loading = true
      page.error = error
      page.status = 404
      page.redirect = '/404'
    }
    return { page }
  },
  data() {
    return {
      hideExpired: true,
      content: null,

      toggleState: null
    }
  },
  created() {
    EventBus.$on('toggle', state => {
      this.toggleState = state
      //console.log(this.toggleState)
    })
    if (this.page) {
      if (this.page.redirect) {
        console.log('Redirect: ', this.page)
        this.$router.push(`${this.page.redirect}`)
      }
    }
  },
  head: {
    title: 'ICJIA GATA Funding Opportunities'
  }
}
</script>

<style>
</style>

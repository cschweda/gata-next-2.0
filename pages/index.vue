
<template>
  <div>
    <div
      v-if="page.content && page.status === 200"
      class="text-center py-8"
      style="background: #0D4474; margin-top: 90px;"
    >
      <h1 style="color: #fff">
        {{ page.content.title }}
      </h1>
    </div>
    
    <base-content
      v-if="page.content && page.status === 200"
      :loading="page.loading"
      style="margin-top: -100px"
    >
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
              order-md="1"
              order="2"
              order-sm="2"
            >
              <div
                class="dynamic-content markdown-body px-4"
                
                @click="handleClicks"
                v-html="page.content.html"
              />
            </v-col>
          </v-row>
        </v-container>
        <div
          style="background: #f5f5f5; border-top: 1px solid #ddd"
          class="py-8"
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <h2 style="text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 25px;">
                  Funding Opportunities
                </h2>
                <toggle />
                <list-funding
                
                  :funding="page.funding"
                  :toggle-state="toggleState"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </template>
    </base-content>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
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
  async asyncData({ isDev }) {
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
    if (this.page.redirect) {
      console.log('Redirect: ', this.page)
      this.$router.push(`${this.page.redirect}`)
    }
  },
  mounted() {},
  methods: {},
  head: {
    title: 'ICJIA GATA Home'
  }
}
</script>

<style>
</style>

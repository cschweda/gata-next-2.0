<template>
  <div>
    <base-content
      v-if="page.content && page.status === 200"
      id="baseContentTop"
      :loading="page.loading"
    >
      <template v-slot:title>
        <v-container
          v-if="page.content && page.status === 200"
        >
          <v-row class="text-left">
            <v-col>
              <h1 class="page-title rule">
                News and Announcements
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:content>
        <v-container
          v-if="page.content && page.status === 200"
          id="scrollArea"
          class="mb-10"
        >
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <ListNewsTable :items="filteredNews" />
          </v-col>
        </v-container>
      </template>
    </base-content>
  </div>
</template>

<script>
import BaseContent from '@/components/BaseContent'
import ListNewsTable from '@/components/ListNewsTable'
import Toggle from '@/components/Toggle'
import { EventBus } from '@/event-bus'
import { getContent, getAllNews } from '@/services/Content'
import { handleClicks } from '@/mixins/handleClicks'
export default {
  components: {
    BaseContent,
    ListNewsTable
  },
  mixins: [handleClicks],
  async asyncData({ isDev, redirect }) {
    let page = {}
    try {
      page.content = await getContent('pages', 'home')
      page.news = await getAllNews()
      page.loading = false
      page.error = null
      page.status = 200
      page.redirect = null
    } catch (error) {
      page.content = null
      page.news = null
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
  computed: {
    filteredNews() {
      let filteredNews = this.page.news.filter(item => {
        return item.status === 'live'
      })
      return filteredNews
    }
  },
  created() {
    if (this.page.redirect) {
      console.log('Redirect: ', this.page)
      this.$router.push(`${this.page.redirect}`)
    }
  },
  methods: {},
  head: {
    title: 'ICJIA GATA News'
  }
}
</script>

<style>
</style>

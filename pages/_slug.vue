<template>
  <div>
    <base-content
      v-if="page && page.loading"
      id="baseContentTop"
      class="mb-12"
      :loading="page.loading"
    >
      <template v-slot:title>
        <v-container
          v-if="page.content && page.status === 200"
        >
          <v-row class="text-left">
            <v-col cols="12">
              <h1 class="page-title">
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
              :md="dynamicFlex()"
              order-md="1"
              order="2"
              order-sm="2"
            >
              <div
                class="dynamic-content markdown-body"
                @click="handleClicks"
                v-html="page.content.html"
              />
            </v-col>
            <v-col
              v-if="showToc"
              cols="12"
              sm="12"
              md="3"
              order-md="2"
              order="1"
              order-sm="1"
            >
              <TOC
                selector="#scrollArea"
                top="#baseContentTop"
                :enable-tracking="page.content.enableTracking"
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
import TOC from '@/components/TOC'
import { getContent } from '@/services/Content'
import { handleClicks } from '@/mixins/handleClicks'
export default {
  components: {
    BaseContent,
    TOC
  },
  mixins: [handleClicks],
  async asyncData({ isDev, params }) {
    let page = {}
    try {
      // if (params.slug === 'home') {
      //   redirect('/')
      // }
      page.content = await getContent('pages', params.slug)

      page.error = null
      page.status = 200
      if (params.slug === 'home') {
        page.redirect = '/'
        page.loading = true
      } else {
        page.redirect = null
        page.loading = false
      }
    } catch (error) {
      page.content = null
      page.loading = false
      page.error = error
      page.status = 404
      page.redirect = '/404'
      page.loading = true
    }
    return { page }
  },
  data() {
    return {
      hideExpired: true,
      content: null,
      loading: true,
      showToc: false
    }
  },
  computed: {
    pageTitle() {
      if (this.page && this.page.status === 200) {
        return this.page.content.title
      } else {
        return 'Error'
      }
    }
  },

  mounted() {
    if (this.page) {
      if (this.page.redirect) {
        console.log('Redirect: ', this.page)
        this.$router.push(`${this.page.redirect}`)
      } else {
        this.showToc = this.page.content.showToc
      }
    }
  },
  methods: {
    dynamicFlex() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return '12'
      } else {
        return this.showToc ? '9' : '12'
      }
    }
  },
  head() {
    return {
      title: this.pageTitle
    }

    // meta: [
    //   { hid: 'description', name: 'description', content: 'About page description' }
    // ]
  }
}
</script>

<style>
</style>

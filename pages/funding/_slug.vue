<template>
  <div>
    <base-content
      v-if="page"
      id="baseContentTop"
      :loading="page.loading"
    >
      <template 
        v-if="page && isExpired" 
        slot="expired"
      >
        <div
          style="background: #EF5350; color: #fff; font-weight: bold; font-size: 20px"
          class="mt-0 px-2 py-10 mb-8 text-center"
        >
          THIS FUNDING OPPORTUNITY HAS EXPIRED
        </div>
      </template>
      <template v-slot:title>
        <v-container
          v-if="page.content && page.status === 200"
        >
          <v-row class="text-left">
            <v-col cols="12">
              <h1 class="page-title rule text-center">
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
              md="9"
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
  async asyncData({ isDev, redirect, params }) {
    let page = {}
    try {
      page.content = await getContent('funding', params.slug)

      page.error = null
      page.status = 200

      page.redirect = null
      page.loading = false
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

      showToc: false
    }
  },
  computed: {
    isExpired() {
      if (this.page && this.page.status === 200) {
        const today = new Date()
        const target = new Date(today.setHours(0, 0, 0, 0))
        if (new Date(this.page.content.expires) < target) {
          return true
        } else {
          return false
        }
      } else {
        return null
      }
    },
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

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
          <v-row class="text-left">
            <v-col cols="12">
              <h1 class="page-title">
                {{ content.title }}
              </h1>
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
              :md="dynamicFlex()"
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
    try {
      if (params.slug === 'home') {
        redirect('/')
      }
      let content = await getContent('pages', params.slug)
      let loading = false
      return { content, loading }
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
      showToc: false
    }
  },
  created() {
    this.showToc = this.content.showToc
  },
  methods: {
    dynamicFlex() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return '12'
      } else {
        return this.showToc ? '9' : '12'
      }
    }
  }
}
</script>

<style>
</style>

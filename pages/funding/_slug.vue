<template>
  <div>
    <base-content
      id="baseContentTop"
      :loading="loading"
    >
      <template 
        v-if="isExpired" 
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
          v-if="content"
        >
          <v-row class="text-left">
            <v-col cols="12">
              <h1 class="page-title rule">
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
              md="9"
              order-md="1"
              order="2"
              order-sm="2"
            >
              <div
                class="dynamic-content markdown-body"
                @click="handleClicks"
                v-html="content.html"
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
    try {
      let content = await getContent('funding', params.slug)
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
  computed: {
    isExpired() {
      const today = new Date()
      const target = new Date(today.setHours(0, 0, 0, 0))
      if (new Date(this.content.expires) < target) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.showToc = this.content.showToc
  },
  mounted() {},
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

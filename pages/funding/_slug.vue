<template>
  <div>
    <base-content
      id="baseContentTop"
      :loading="loading"
    >
      <template v-slot:title>
        <v-container
          v-if="content"
          fluid
        >
          <v-row>
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
          fluid
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
        </v-container>
      </template>
    </base-content>
  </div>
</template>

<script>
import BaseContent from '@/components/BaseContent'
import { getContent } from '@/services/Content'
import { handleClicks } from '@/mixins/handleClicks'
export default {
  components: {
    BaseContent
  },
  mixins: [handleClicks],
  async asyncData({ $axios, isDev, redirect, params }) {
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
      loading: true
    }
  }
}
</script>

<style>
</style>

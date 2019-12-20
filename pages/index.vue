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
            <!-- <v-col cols="12">
              <h1
                class=""
                style="margin-left: -15px;"
              >
                
              </h1>
            </v-col> -->
            <h1>{{ content.title }}</h1>
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
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <h2>Funding Opportunities</h2>
              <funding :funding="funding" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </base-content>
  </div>
</template>

<script>
import BaseContent from '@/components/BaseContent'
import Funding from '@/components/Funding'
import { getContent, getAllFunding } from '@/services/Content'
import { handleClicks } from '@/mixins/handleClicks'
export default {
  components: {
    BaseContent,
    Funding
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
      loading: true
    }
  },
  mounted() {}
}
</script>

<style>
</style>

<template>
  <base-content
    id="baseContentTop"
    class="mb-12"
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
            md="12"
            order-md="1"
            order="2"
            order-sm="2"
          >
            <search :content="searchContent" />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </base-content>
</template>

<script>
import Search from '@/components/Search'
import BaseContent from '@/components/BaseContent'
import {
  getContent,
  getAllNews,
  getAllPages,
  getAllFunding
} from '@/services/Content'
export default {
  components: {
    BaseContent,
    // eslint-disable-next-line vue/no-unused-components
    Search
  },
  async asyncData({ isDev, redirect }) {
    try {
      let content = await getContent('pages', 'search')
      let news = await getAllNews()
      let funding = await getAllFunding()
      let pages = await getAllPages()
      let searchContent = [...news, ...funding, ...pages]
      let loading = false
      return { content, searchContent, loading }
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
  }
}
</script>

<style lang="scss" scoped>
</style>

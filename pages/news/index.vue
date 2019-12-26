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
            <v-col>
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
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <ListNewsTable :items="news" />
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
    try {
      let content = await getContent('pages', 'news')
      let news = await getAllNews()
      let loading = false
      return { content, news, loading }
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
  },
  created() {},
  methods: {}
}
</script>

<style>
</style>

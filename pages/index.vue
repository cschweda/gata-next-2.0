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
// import { handleClicks } from '@/mixins/handleClicks'
export default {
  components: {
    BaseContent
  },
  // mixins: [handleClicks],
  data() {
    return {
      hideExpired: true,
      content: null,
      loading: true
    }
  },
  mounted() {
    this.fetchContent()
  },

  methods: {
    fetchContent() {
      this.loading = true
      const content = this.$store.state.pages.filter(p => {
        return p.slug === 'home'
      })
      if (content.length) {
        this.content = content[0]
      } else {
        console.log('Error: Page Not Found')
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>

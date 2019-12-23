<template>
  <v-navigation-drawer
    v-model="drawer"
   
    
    app
    
    temporary
  >
    <v-layout 
      sidebar-height 
      column 
      ma-0 
      px-3
    >
      <v-row class="fill-height">
        <v-container fluid>
          <v-list-item>
            <v-list-item-content class="text-center">
              <v-list-item-title style="font-weight: 900">
                ICJIA GATA INFORMATION
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          <v-list
            v-if="pages"
            dense
          >
            <v-list-item
              v-for="item in pages"
              :key="item.title"
              link
            >
              <v-list-item-content>
                <v-list-item-title
                  style="font-weight: 700"
                  @click="$router.push(item.slug)"
                >
                  <span v-if="item.menuTitle">
                    {{ item.menuTitle }}
                  </span>
                  <span v-else>
                    {{ item.title }}
                  </span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>
      </v-row>
      <v-spacer />
      <v-divider />
      <div class="text-center mb-3 pt-3 py-3">
        <img
          src="@/assets/icjia-logo.png"
          class="logo mt-3"
          height="40"
          @click="goto('http://www.icjia.state.il.us')"
        >
        <h5>
          <a
            href="https://github.com/ICJIA/icjia-gata-next"
            class="sidebar-footer-link"
          >View on Github</a>
        </h5>
        <h5 
          style="color: #666; font-weight: 400 !important;" 
          class="mt-2"
        >
          &copy;&nbsp;2019
          <a
            class="sidebar-footer-link"
            href="http://www.icjia.state.il.us"
          >Illinois Criminal Justice Information Authority</a>
        </h5>
        <!-- <div 
          style="font-size: 10px;" 
          class="mt-2"><a href="https://legacy-grants.icjia.cloud">Previous ICJIA GATA site </a>&raquo;</div>
      </div> -->
      </div>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { EventBus } from '@/event-bus'
import { getAllPages } from '@/services/Content'
export default {
  props: {
    sections: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      drawer: false,
      pages: [],
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }
  },
  async created() {
    this.pages = await getAllPages()
    this.loading = false
  },
  mounted() {
    EventBus.$on('toggleDrawer', () => {
      this.drawer = !this.drawer
    })
  }
}
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
}

.sidebar-height {
  min-height: 100vh;
}
</style>

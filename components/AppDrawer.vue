<template>
  <v-navigation-drawer
    v-model="drawer"
   
    
    app
    
    temporary
  >
    <!-- <div
      style="font-size: 24px; font-weight: bold; background: #0D4474; color: #fff"
      class="text-center py-4"
    >
      ICJIA GATA INFORMATION
    </div> -->
    <v-layout 
      sidebar-height 
      column 
      ma-0 
      px-3
    >
      <v-row class="fill-height">
        <v-container fluid>
          <v-list
            v-if="pages"
            dense
          >
            <div
              v-for="item in pages"
              :key="item.title"
            >
              <v-list-item
                
                link
              >
                <v-list-item-content>
                  <h3
                    v-if="item.slug==='home'"
                    style="font-weight: 700;"
                    @click="$router.push(`/`)"
                  >
                    Home
                  </h3>
                  <h3
                    v-else
                    style="font-weight: 700;"
                    @click="$router.push(`/${item.slug}`)"
                  >
                    <span v-if="item.menuTitle">
                      {{ item.menuTitle }}
                    </span>
                    <span v-else>
                      {{ item.title }} 
                    </span>
                  </h3>
                </v-list-item-content>
              </v-list-item>
              <div
                v-if="item.dividerAfter"
                class="my-2"
              >
                <v-divider />
              </div>
            </div>
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
          alt="Illinois Criminal Justice Information Authority"
          @click="goto('http://www.icjia.state.il.us')"
        >
        <h5 style="font-size: 12px">
          <a
            href="https://github.com/ICJIA/icjia-gata-next"
            class="sidebar-footer-link"
          >View on Github</a>
        </h5>
        <h5 
          style="color: #666; font-size: 12px" 
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
    const pages = await getAllPages()
    this.pages = pages.filter(p => {
      return p.status === 'live'
    })
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
  /* min-height: 88vh; */
  min-height: 98vh;
}

h5 a {
  text-decoration: none;
}
</style>

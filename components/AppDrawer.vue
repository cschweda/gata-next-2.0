<template>
  <v-navigation-drawer
    v-model="drawer"
   
    
    app
    dark
    temporary
  >
    <v-row class="fill-height">
      <v-container fluid>
        <v-list
          class="drawer"
          rounded
          px-4
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="text-center heavy"
              >
                ICJIA GATA INFORMATION
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          links here
        </v-list>
      </v-container>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import { EventBus } from '@/event-bus'
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
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }
  },
  mounted() {
    EventBus.$on('toggleDrawer', () => {
      this.drawer = !this.drawer
    })
  }
}
</script>

<style>
.theme--light.v-list {
  background: white !important;
}

.push-right {
  padding-left: 50px;
}
.drawer .v-list-item--active {
  color: #fff !important;
}

/* .drawer .v-list-item-group .v-list-item--active {
  opacity: 0.1 !important;
} */

.link-item:hover {
  background: #268384;
}
</style>

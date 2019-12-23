<template>
  <v-app id="page-top">
    <app-nav />
    <client-only>
      <app-drawer />
    </client-only>
    <v-content>
      <nuxt />
    </v-content>
   
    <app-footer />
  </v-app>
</template>
<script>
import AppNav from '@/components/AppNav'
import AppFooter from '@/components/AppFooter'
import AppDrawer from '@/components/AppDrawer'
export default {
  transition: 'default',
  components: {
    AppNav,
    AppFooter,
    AppDrawer
  },
  data() {
    return {
      loading: true,
      pages: []
    }
  }
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 200ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.hover {
  cursor: pointer !important;
}
</style>

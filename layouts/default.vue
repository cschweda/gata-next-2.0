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
</style>

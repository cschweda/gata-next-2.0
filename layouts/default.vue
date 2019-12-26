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

.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 15px;
  padding-right: 25px;
  width: 100%;
  height: 100%;
}

.dynamic-content h2 {
  margin-top: 25px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.dynamic-content h3 {
}

h1.page-title {
  text-transform: uppercase;
  border-bottom: 1px solid #aaa;
}
</style>

<template>
  <v-app>
    <v-content>
      <!-- Provides the application the proper gutter -->
   
      <!-- If using vue-router -->
        
       
      <nuxt />
    </v-content>
  </v-app>
</template>
<script>
export default {
  transition: 'default'
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
</style>

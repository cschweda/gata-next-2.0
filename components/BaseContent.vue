<template>
  <div>
    <div
      v-if="!loading"
      class=""
      style="margin-top: 90px"
    >
      <slot name="expired" />
      <slot name="title" />
      <slot name="printer" />
      <slot name="content" />
      <slot name="error" />
    </div>
    <div v-else>
      <v-container style="margin-top: 150px">
        <v-row>
          <v-col>
            <loader />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
export default {
  components: {
    Loader
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    //console.log(this.$browserDetect.isIE);
  }
}
</script>

<style scoped>
.iePull {
  margin-top: -75px;
}
</style>

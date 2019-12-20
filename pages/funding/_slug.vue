
<template>
  <div class="top">
    <div
      v-if="content && !loading"
      v-html="content.html"
    />

    {{ tocItems }}
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { mapGetters } from 'vuex'

import BaseContent from '@/components/BaseContent'
import Breadcrumb from '@/components/Breadcrumb'
import BaseList from '@/components/BaseList'
import BaseCard from '@/components/BaseCard'
import TableOfContents from '@/components/TableOfContents'

export default {
  transition: 'tweakOpacity',
  components: { BaseContent, BaseCard, Breadcrumb, TableOfContents, BaseList },
  data() {
    return {
      tocItems: [],
      title: 'General Overview',
      loading: true,
      content: null
    }
  },
  head() {
    return {
      title: `ICJIA GATA | ${this.getTitle}`
    }
  },
  computed: {
    ...mapGetters(['funding']),
    isExpired() {
      const today = new Date()
      const target = new Date(today.getTime() - 24 * 60 * 60 * 1000)
      if (new Date(this.content.expires) < target) {
        return true
      } else {
        return false
      }
    },
    getTitle() {
      return `${this.title}`
    }
  },
  watch: {
    content(newValue, oldValue) {
      const toc = Array.prototype.slice.call(document.querySelectorAll('h2'))
      const tocItems = toc.map(item => {
        let obj = {}
        obj.id = item.id
        obj.text = item.innerHTML
        return obj
      })
      const intro = { id: 'top', text: 'Notice of Funding Opportunity' }
      tocItems.unshift(intro)
      this.tocItems = tocItems
    }
  },
  created() {
    this.fetchContent()
  },
  methods: {
    fetchContent() {
      this.loading = true
      const { slug } = this.$route.params
      const content = this.$store.state.funding.filter(p => {
        return p.slug === `${slug}`
      })
      if (content.length) {
        this.content = content[0]
      } else {
        console.log('Error: Page Not Found')
        //this.$router.push('/404')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.nofo {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  color: #555;
}

.table-of-contents {
  position: fixed;
  top: 130px;
  right: 10px;
}

.tocSpacer {
  margin-top: 65px;
}
</style>

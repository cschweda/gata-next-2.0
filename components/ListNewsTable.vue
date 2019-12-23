<template>
  <div>
    <client-only placeholder="Loading...">
      <v-card color="white">
        <v-card-title>
          <v-spacer />
          <v-text-field
            v-model="search"
          
            label="Search"
            single-line
            hide-details
            class="mb-10"
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="-1"
          :search="search"
          class="elevation-1 newsTable hover"
          show-expand
          item-key="slug"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          @click:row="clicked"
        >
          <template
            v-slot:item.createdAt="{ item }"
          >
            <div style="cursor: pointer !important">
              {{ item.posted | format }}
            </div>
          </template>

        

          <template
            v-slot:item.title="{ item }"
          >
            <b class="hover">{{ item.title }}</b>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length + 2">
              <div class="py-5">
                <NewsCard
                  :content="item"
                
                  :elevation="true"
                  :display-news-link="true"
                />
              </div>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </client-only>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import NewsCard from '@/components/NewsCard'
import { addAttributeToElement, dateFormat } from '@/services/Utilities'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    NewsCard
  },

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      search: '',
      expanded: [],
      singleExpand: true,
      headers: [
        {
          text: 'Posted',
          align: 'left',
          sortable: true,
          value: 'posted'
        },
        { text: 'Title', value: 'title' }
      ]
    }
  },
  mounted() {
    addAttributeToElement(
      'v-icon--link',
      'aria-label',
      'Read More / Read Less'
    )()
  },
  methods: {
    getRoute(item) {
      console.log('Route here: ', item)
    },

    clicked(value) {
      if (value === this.expanded[0]) {
        this.expanded = []
      } else {
        if (this.expanded.length) {
          this.expanded.push(value)
          this.expanded.shift()
          if (this.expanded[0].title) {
            //console.log(scheduled);
            // this.$ga.event({
            //   eventCategory: "News",
            //   eventAction: "Preview",
            //   eventLabel: "Preview: " + this.expanded[0].title
            // });
          }
        } else {
          this.expanded.push(value)
          if (this.expanded[0].title) {
            //console.log(scheduled);
            // this.$ga.event({
            //   eventCategory: "News",
            //   eventAction: "Preview",
            //   eventLabel: "Preview: " + this.expanded[0].title
            // });
          }
        }
      }
    }
  }
}
</script>

<style>
tr:hover {
  cursor: pointer !important;
}
</style>

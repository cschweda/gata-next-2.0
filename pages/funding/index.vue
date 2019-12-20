
<template>
  <div>
    <base-content
      id="baseContentTop"
      :loading="loading"
    >
      <template v-slot:title>
        <v-container
          v-if="content"
          fluid
        >
          <v-row>
            <v-col cols="12">
              <h1 class="page-title">
                {{ content.title }}
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:content>
        <v-layout class="pull-50">
          <v-container>
            <v-flex xs12>
              <grant-toggle />
            </v-flex>
          </v-container>
        </v-layout>
        <v-container
          v-if="content"
          id="scrollArea"
          fluid
        >
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
              order-md="1"
              order="2"
              order-sm="2"
            >
              <div
                
                v-html="content.html"
              />
            </v-col>
          </v-row>
        </v-container>
        <base-list 
          :items="fundsToDisplay" 
          style="margin-top: -30px;"
        >
          <template slot-scope="item">
            <v-layout row>
              <v-container>
                <v-flex xs12>
                  <base-card 
                    :item="item" 
                    :show-expired="true"
                  >
                    <template slot="posted">
                      <div class="text-xs-right pr-3 pt-3 pb-2">
                        <h4 
                          class="pr-3 pb-4" 
                          style="font-size: 14px;"
                        >
                          <span class="posted">Posted:&nbsp;{{ item.posted | format }}</span>
                        </h4>
                      </div>
                    </template>
                    <template slot="expires">
                      <div class="text-xs-left pb-2">
                        <h4 
                          class="pl-3 pt-4" 
                          style="font-size: 14px;"
                        >
                          <span 
                            :class="{expired: !hideExpired}" 
                            class="expires"
                          >{{ expiredText }}:&nbsp;{{ item.expires | format }}</span>
                        </h4>
                      </div>
                    </template>
                  </base-card>
                </v-flex>
              </v-container>
            </v-layout>
          </template>
        </base-list>
      </template>
    </base-content>

    
    <!-- <div 
      class="text-center pt-5 pb-5" 
    >
      <h3>
        For archived funding opportunities prior to 2019, please see: <a href="https://legacy-grants.icjia.cloud/grants">https://legacy-grants.icjia.cloud/grants</a>
      </h3>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus.js'
import config from '@/config'

import BaseContent from '@/components/BaseContent'
import Breadcrumb from '@/components/Breadcrumb'
import BaseList from '@/components/BaseList'
import BaseCard from '@/components/BaseCard'
import GrantToggle from '@/components/GrantToggle'

export default {
  components: {
    BaseContent,
    BaseList,
    BaseCard,
    GrantToggle
  },
  computed: {
    ...mapGetters(['pages', 'funding', 'current', 'expired']),
    expiredText() {
      return this.hideExpired ? 'Expires' : 'Expired'
    },
    fundsToDisplay() {
      return this.hideExpired ? this.current : this.expired
    }
  },
  data() {
    return {
      hideExpired: true,
      content: null,
      loading: true
    }
  },
  mounted() {
    this.fetchContent()
    EventBus.$on('toggleFundingDisplay', state => {
      this.hideExpired = state
      //console.log(state)
    })
  },

  methods: {
    fetchContent() {
      this.loading = true
      const content = this.$store.state.pages.filter(p => {
        return p.slug === 'funding'
      })
      if (content.length) {
        this.content = content[0]
      } else {
        console.log('Error: Page Not Found')
      }
      this.loading = false
    }
  }
}
</script>

<style>
.isCurrent.v-input--selection-controls.v-input .v-label {
  /* color: #2e7d32; */
  font-weight: bold !important;
  font-size: 18px !important;
}

.isExpired.v-input--selection-controls.v-input .v-label {
  /* color: #d84315; */
  font-weight: bold !important;
  font-size: 18px !important;
}

h2 a {
  text-decoration: none;
}

h2 a:hover {
  color: #aaa;
}

.date {
  font-size: 18px;
  margin-bottom: 15px;
  color: #666;
}
</style>

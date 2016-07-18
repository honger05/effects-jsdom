<template>
  <div>
    <nv-head :page-type="searchKey.tab | getTitleStr"
      fix-head="true"
      :need-add="true"
      :show-menu.sync="showMenu">
    </nv-head>

    <section id="page" :class="{'show-menu': showMenu}">
      <ul class="posts-list">
        <li v-for="item in topics"
          v-link="{name: 'topic', params: {id: item.id}}">
          <h3 v-text="item.title"
            :class="item.tab | getTabClassName item.good item.top"
            :title="item.tab | getTabStr item.good item.top">
          </h3>
          <div class="content">
            <img :src="item.author.avatar_url" class="avatar">
            <div class="info">
              <p>
                <span class="name">{{item.author.loginname}}</span>
                <span class="status" v-if="item.reply_count > 0">
                  <b>{{item.reply_count}}</b>
                  /{{item.visit_count}}
                </span>
              </p>
              <p>
                <time>{{item.create_at | getLastTimeStr true}}</time>
                <time>{{item.last_reply_at | getLastTimeStr true}}</time>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <nv-top></nv-top>
  </div>
</template>

<script>
  let scrollListener = null

  export default {
    data () {
      return {
        showMenu: false,
        scroll: true,
        topics: [],
        searchKey: {
          page: 1,
          limit: 20,
          tab: 'all',
          mdrender: true
        },
        searchDataStr: ''
      }
    },

    route: {
      data (transition) {
        let query = transition.to.query
        let tab = query.tab || 'all'

        if (this.searchDataStr === '') {
          this.searchDataStr = JSON.stringify(this.searchKey)
        }

        if (transition.from.name === 'list') {
          this.searchKey = JSON.parse(this.searchDataStr)
          this.searchKey.limit = 20
        }

        if (sessionStorage.searchKey && transition.from.name === 'topic' && sessionStorage.tab === tab) {
          this.topics = JSON.parse(sessionStorage.topics)
          this.searchKey = JSON.parse(sessionStorage.searchKey)
          this.$nextTick(() => {
            window.scrollTo(0, sessionStorage.scrollTop)
          })
        } else {
          this.searchKey.tab = query.tab
          this.getTopics()
          window.scrollTo(0, 0)
        }

        this.showMenu = false
        document.body.classList.remove('scroll-hide')

        scrollListener = ev => {
          this.getScrollData()
        }

        window.addEventListener('scroll', scrollListener, false)
      },

      deactivate (transition) {
        window.removeEventListener('scroll', scrollListener, false)
        if (transition.to.name === 'topic') {
          sessionStorage.scrollTop = window.pageYOffset
          sessionStorage.topics = JSON.stringify(this.topics)
          sessionStorage.searchKey = JSON.stringify(this.searchKey)
          sessionStorage.tab = transition.from.query.tab || 'all'
        } else {
          sessionStorage.removeItem('topics')
          sessionStorage.removeItem('searchKey')
          sessionStorage.removeItem('tab')
        }
        transition.next()
      }
    },

    methods: {
      getTopics () {
        this.$log('searchKey')
        let params = Utils.param(this.searchKey)
        this.$http.get('api/v1/topics?' + params)
          .then(response => {
            this.scroll = true
            let datum = response.data
            if (datum && datum.data) {
              this.topics = datum.data
            }
          })
      },

      getScrollData () {
        if (this.scroll) {
          let currentHeight = ~~(window.innerHeight + window.pageYOffset)
          if (currentHeight >= document.body.clientHeight - 200) {
            this.scroll = false
            this.searchKey.limit += 20
            this.getTopics()
          }
        }
      }
    },

    components: {
      'nvHead': require('../components/header.vue'),
      'nvTop': require('../components/backtotop.vue')
    }
  }
</script>

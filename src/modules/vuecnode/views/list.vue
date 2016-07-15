<template>
  <div>
    <nv-head :page-type="searchKey.tab | getTitleStr"
      fix-head="true"
      :need-add="true"
      :show-menu.sync="showMenu">
    </nv-head>
  </div>
</template>

<script>
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
          this.searchKey.limit = 20
          this.searchKey = JSON.parse(this.searchDataStr)
        }

        if (sessionStorage.searchKey && transition.from.name === 'topic' && sessionStorage.tab === tab) {
          this.topics = JSON.parse(sessionStorage.topics)
          this.searchKey = JSON.parse(sessionStorage.searchKey)
          this.$nextTick(() => {
            window.pageYOffset = sessionStorage.scrollTop
          })
        } else {
          this.searchKey.tab = query.tab
          this.getTopics()
        }

        this.showMenu = false

        window.addEventListener('scroll', () => this.getScrollData(), false)
      },

      deactivate (transition) {
        window.removeEventListener('scroll')
        if (transition.to.name === 'topic') {
          sessionStorage.scrollTop = window.pageYOffset
          sessionStorage.topics = JSON.stringify(this.topics)
          sessionStorage.searchKey = JSON.stringify(this.topics)
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
        console.log('get data ...')
      },

      getScrollData () {
        if (this.scroll) {
          let totalHeight = ~~(window.innerHeight + window.pageYOffset)
          if (document.body.clientHeight <= totalHeight + 200) {
            this.scroll = false
            this.searchKey.limit += 20
            this.getTopics()
          }
        }
      }
    },

    components: {
      'nvHead': require('../components/header.vue')
    }
  }
</script>

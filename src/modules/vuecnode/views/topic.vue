<template>
  <nv-head page-type="主题"
    :show-menu.sync="showMenu"
    :need-add="true"
    fix-head="true">
  </nv-head>

  <div id="page" v-if="topic.title">
    <h2 class="topic-title" v-text="topic.title"></h2>
    <section class="author-info">
      <img :src="topic.author.avatar_url" alt="" class="avatar">
      <div class="col">
        <span>{{topic.author.loginname}}</span>
        <time>发布于：{{topic.create_at | getLastTimeStr true}}</time>
      </div>
      <div class="right">
        <span class="tag"
          :class="topic.tab | getTabClassName item.good item.top">
          {{topic.tab | getTabStr topic.good topic.top}}
        </span>
        <span class="name">{{topic.visit_count}}次浏览</span>
      </div>
    </section>

    <section class="markdown-body topic-content" v-html="topic.content"></section>

    <h3 class="topic-reply">
      <strong>{{topic.reply_count}}</strong> 回复
    </h3>

    <section class="reply-list">
      <ul>
        <li v-for="item in topic.replies">
          <section class="user">
            <img :src="item.author.avatar_url" class="head"
              v-link="{name: 'user', params: {loginname: item.author.loginname}}">
            <div class="info">
              <span class="cl">
                <span class="name" v-text="item.author.loginname"></span>
                <span class="name mt10">
                  <span></span>
                  发布于：{{item.create_at | getLastTimeStr true}}
                </span>
              </span>
              <span class="cr">
                <span class="iconfont icon"
                  :class="{'uped': isUps(item.ups)}"
                  @click="upReply(item)">
                  &#xe608;
                </span>
                {{item.ups.length}}
                <span class="iconfont icon">&#xe609;</span>
              </span>
            </div>
          </section>
          <div class="reply_content" v-html="item.content"></div>
          <nv-reply :topic.sync="topic"
            :topic-id="topicId"
            :reply-id="item.id"
            :reply-to="item.author.loginname"
            :show.sync="curReplyId"
            v-if="userId && curReplyId === item.id">
          </nv-reply>
        </li>
      </ul>
    </section>

    <nv-top></nv-top>

    <nv-reply v-if="userId"
      :topic.sync="topic"
      :topic-id="topicId"
      :reply-id="">
    </nv-reply>

  </div>

  <div class="no-data" v-if="noData">
    <i class="iconfont icon-empty">&#xe60a;</i>
    该话题不存在!
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showMenu: false,
        topic: {},
        noData: false,
        topicId: '',
        curReplyId: '',
        userId: localStorage.userId || '',
        alert: {
          txt: '',
          show: false,
          hideFn () {
            let timer
            clearTimeout(timer)
            timer = setTimeout(() => {
              this.alert.show = false
            })
          }
        }
      }
    },

    route: {
      data (transition) {
        this.showMenu = false
        this.topicId = transition.to.params.id
        this.$http.get('api/v1/topic/' + this.topicId)
          .then(res => {
            console.log(res.data)
            if (res.data && res.data.data) {
              this.topic = res.data.data
            } else {
              this.noData = true
            }
          })
      }
    },

    methods: {
      isUps (ups) {
        return Utils.inArray(ups, this.userId) >= 0
      },

      addReply (id) {
        this.curReplyId = id
        if (!this.userId) {
          this.$route.router.go('/login?redirect=' + encodeURIComponent(this.$route.path))
        }
      },

      upReply (item) {
        if (!this.userId) {
          this.$route.router.go('/login?redirect=' + encodeURIComponent(this.$route.path))
        } else {
          this.$http.post('api/v1/reply/' + item.id + '/ups', {
            data: {accesstoken: localStorage.token}
          }).then(res => {
            if (res.success) {
              if (res.action === 'down') {
                let index = Utils.inArray(item.ups, this.userId)
                item.ups.splice(index, 1)
              } else {
                item.ups.push(this.userId)
              }
            }
          }, res => {
            let error = JSON.parse(res.responseText)
            this.alert.txt = error.error_msg
            this.alert.show = true
            this.alert.hideFn()
            return false
          })
        }
      }
    },

    components: {
      'nvHead': require('../components/header.vue'),
      'nvAlert': require('../components/nvAlert.vue'),
      'nvReply': require('../components/reply.vue'),
      'nvTop': require('../components/backtotop.vue')
    }
  }
</script>

<template>
  <div class="bgfff">
    <nv-head page-type="用户信息" fix-head="true" :show-menu="false" :need-add="true" ></nv-head>
    <section class="userinfo">
      <img class="u-img" :src="user.avatar_url" /><br/>
      <span class="u-name" v-text="user.loginname"></span>
      <div class="u-bottom">
        <span class="u-time" v-text="user.create_at | getLastTimeStr false"></span>
        <span class="u-score">积分：{{user.score}}</span>
      </div>
    </section>
    <section class="topics">
      <ul class="user-tabs">
        <li class="item br" :class='{"selected":selectItem === 1}' @click="changeItem(1)">最近回复</li>
        <li class="item" :class='{"selected":selectItem === 2}' @click="changeItem(2)">最新发布</li>
      </ul>
      <div class="message markdown-body" v-for="item in currentData">
        <section class="user">
          <img class="head" :src="item.author.avatar_url"
            v-link="{name:'user',params:{loginname:item.author.loginname}}" />
          <div class="info" v-link="{name:'topic',params:{id:item.id}}">
            <div class="t-title">{{item.title}}</div>
            <span class="cl">
              <span class="name">{{item.author.loginname}}</span>
            </span>
            <span class="cr">
              <span class="name">{{item.last_reply_at | getLastTimeStr true}}</span>
            </span>
          </div>
        </section>
      </div>
      <div class="no-data" v-show="currentData.length === 0">
        <i class="iconfont icon-empty">&#xe60a;</i>
        暂无数据!
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        user: {},
        currentData: [],
        selectItem: 1
      }
    },
    route: {
      data (transition) {
        let loginname = transition.to.params.loginname
        this.$http.get('api/v1/user/' + loginname)
          .then(res => {
            if (res.data && res.data.data) {
              this.user = res.data.data
              if (this.user.recent_replies.length > 0) {
                this.currentData = this.user.recent_replies
              } else {
                this.currentData = this.user.recent_topics
                this.selectItem = 2
              }
            }
          })
      }
    },

    methods: {
      // 切换tab
      changeItem (idx) {
        this.selectItem = idx
        this.currentData = idx === 1 ? this.user.recent_replies : this.user.recent_topics
      }
    },

    components: {
      'nvHead': require('../components/header.vue')
    }
  }
</script>

<style>
.bgfff {
  background: #fff;
}
</style>

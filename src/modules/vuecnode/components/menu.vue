<template>
  <section id="sideBar" class="nav-list" :class="{'show': showMenu}">
    <user-info></user-info>
    <ul class="list-ul">
      <li class="iconfont icon-quanbu" v-link="{name: 'list', query: {tab: 'all'}}">全部</li>
      <li class="iconfont icon-hao" v-link="{name: 'list', query: {tab: 'good'}}">精华</li>
      <li class="iconfont icon-fenxiang" v-link="{name: 'list', query: {tab: 'share'}}">分享</li>
      <li class="iconfont icon-wenda" v-link="{name: 'list', query: {tab: 'ask'}}">问答</li>
      <li class="iconfont icon-zhaopin" v-link="{name: 'list', query: {tab: 'job'}}">招聘</li>
      <li class="iconfont icon-xiaoxi line" v-link="{name: 'message'}">消息</li>
    </ul>
  </section>
</template>

<script>
  export default {
    replace: true,
    props: ['showMenu', 'pageType', 'nickName', 'profileUrl'],
    components: {
      'userInfo': require('./user-info.vue')
    }
  }
</script>

<style lang="scss">
.nav-list {
  position: fixed;
  top: 0;
  bottom: 0;
  left: -200px;
  width: 200px;
  background-color: #292929;
  color: #b89f7a;
  transition: transform 0.3s ease;
  z-index: 99;
  &.show {
    transform: translateX(200px);
  }
}

.list-ul {
  margin: 0 24px;
  border-top: 1px solid #b89f7a;
  overflow: hidden;
  padding-top: 9%;
  li {
    font-size: 14px;
    font-weight: 200;
    padding: 9% 0;
    text-align: left;
    text-indent: 1px;
    line-height: 15px;
    color: #b89f7a;
    &:last-child {
      margin-bottom: 50px;
    }
    &:before{
      color: #b89f7a;
    }
  }
  .line{
    border-top: 1px solid #b89f7a;
    margin-top: 10px;
    padding-top: 30px;
  }
  a {
    display: block;
    color: #b89f7a;
  }
}
</style>

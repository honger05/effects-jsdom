<template>
  <div>
    <div class="page-cover" v-show="showMenu" @click="toggleMenu"></div>
    <header :class="{'show': showMenu}" id="hd" class="fix-header">
      <div class="nv-toolbar">
        <div class="toolbar-nav" @click="toggleMenu">
          <i class="icon-fire"></i>
        </div>
        <span class="page-type" v-text="pageType"></span>
        <i class="num" v-if="messageCount > 0"> {{messageCount}}</i>
        <i class="icon-quill add-icon"
          v-show="!messageCount || messageCount <= 0"
          v-if="needAdd"
          v-link="{name: 'add'}">
        </i>
      </div>
    </header>
    <nv-menu :show-menu="showMenu"
      :page-type="pageType"
      :nick-name="nickname"
      :profile-url="profileimgurl">
    </nv-menu>
  </div>
</template>

<script>
  export default {
    replace: true,
    props: ['pageType', 'fixHead', 'showMenu', 'messageCount', 'needAdd'],
    data () {
      return {
        nickname: '',
        profileimgurl: ''
      }
    },

    methods: {
      toggleMenu () {
        this.showMenu = !this.showMenu
        document.body.classList.toggle('scroll-hide')
      }
    },

    components: {
      'nvMenu': require('./menu.vue')
    }
  }
</script>

<style lang="scss">
.page-type {
  color: #b89a74;
}

#hd {
  border-bottom: 1px solid #e8e8e8;
  &.fix-header {
    width: 100%;
    background-color: rgba(60, 57, 57, 0.95);
    position: fixed;
    top: 0;
    left: 0;
    transition: transform 0.3s ease;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    z-index: 6;
  }
  &.no-fix {
    width: 100%;
    background-color: #fff;
    overflow: hidden;
  }
  &.show {
    transform: translateX(200px);
  }
}

.nv-toolbar {
  width: 100%;
  height: 44px;
  display: -webkit-box;
  -webkit-box-align: center;
  .toolbar-nav {
    width: 49px;
    height: 44px;
    line-height: 48px;
    position: absolute;
    text-align: center;
    font-size: 20px;
    color: #b89a74;
    background-size: 19px 16px;
    margin: 0;
    z-index: 1;
    top: 0;
    left: 0;
  }
  &>span {
    display: block;
    text-align: center;
    height: 100%;
    line-height: 44px;
    font-size: 16px;
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .num {
    background-color: #80bd01;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
  }
  .add-icon{
    color: #e8bf38;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
    padding: 2px;
    border-radius: 5px;
    font-size: 18px;
  }
}

.scroll-hide{
  height: 100%;
  overflow: hidden;
}

</style>

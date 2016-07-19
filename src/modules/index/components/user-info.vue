<template>
  <div class="user-info">
    <ul class="login-no" v-if="!loginname">
      <li class="login icon-home" @click="goEnter">
        <i class=""></i>登录
      </li>
    </ul>
    <div class="login-yes" v-if="loginname" @click="goUser">
      <div class="avertar">
        <img :src="avatarUrl" v-if="avatarUrl" alt="">
      </div>
      <div class="info">
        <p v-if="loginname" v-text="loginname"></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    replace: true,
    data () {
      return {
        loginname: localStorage.loginname || '',
        avatarUrl: localStorage.avatar_url || ''
      }
    },

    methods: {
      goEnter () {
        let link = '/login?redirect=' + encodeURIComponent(this.$route.path)
        this.$route.router.go(link)
      },

      goUser () {
        this.$route.router.go({name: 'user', params: {loginname: localStorage.loginname}})
      }
    }
  }
</script>

<style lang="scss">
.user-info {
  padding: 15px;
  font-size: 15px;
  color: #b89f7a;
}

.login-no {
  overflow: hidden;
  margin: 8px 9px;
  &>li {
    float: right;
    height: 24px;
    line-height: 24px;
    padding-left: 34px;
    position: relative;
    &:before {
      width: 24px;
      height: 24px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .login {
    float: left;
  }
}

.login-yes {
  height: 100%;
  background-size: 6px 10px;
  overflow: hidden;
  position: relative;
  .avertar {
    width: 40px;
    height: 40px;
    background: url(../assets/images/components/user.png) no-repeat center center;
    background-size: 40px 40px;
    border-radius: 20px;
    overflow: hidden;
    float: left;
    &>img {
      width: 40px;
      height: 40px;
      display: block;
    }
  }
  .info {
    margin-left: 10px;
    overflow: hidden;
    float: left;
  }
  p {
    width: 85px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 12px;
    line-height: 40px;
    &.lh20 {
      line-height: 20px;
    }
  }
  &:after {
    display: block;
    background: url(../assets/images/components/go_icon.png) no-repeat center right;
    background-size: 7px 7px;
  }
}
</style>

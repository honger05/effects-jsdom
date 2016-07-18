<template>
  <div class="login-div">
    <nv-head page-type="登录"></nv-head>
    <section class="page-body">
      <div class="label">
        <input type="text" class="txt" placeholder="Access Token"
        v-model="token" maxlength="36">
      </div>
      <div class="label">
        <a class="button">选择二维码图片</a>
        <input id="file_upload" type="file" class="file"
        @change="readPic" accept="image/*" capture="camera">
        <a @click="login" class="button">登录</a>
      </div>
    </section>
    <nv-alert :content="alert.txt" :show="alert.show"></nv-alert>
    <nv-loading :show="loading.show" :show-txt="loading.showTxt"></nv-loading>
  </div>
</template>

<script>
  import { qrcode } from 'lib/llqrcode'
  let U = navigator.userAgent

  let browser = {
    versions: {
      ios: !!U.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: U.indexOf('Android') > -1 || U.indexOf('Linux') > -1, // android终端或uc浏览器
      iPhone: U.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: U.indexOf('iPad') > -1 // 是否iPad
    }
  }

  console.log(qrcode, browser)

  export default {
    data () {
      let _self = this
      return {
        token: '',
        alert: {
          txt: '',
          show: false,
          hideFn () {
            let timer
            clearTimeout(timer)
            timer = setTimeout(() => {
              _self.alert.show = false
            }, 1000)
          }
        },
        loading: {
          show: false,
          showTxt: '二维码识别中'
        }
      }
    },

    methods: {
      login () {
        if (this.token === '') {
          this.alert.txt = '令牌格式错误,应为36位UUID字符串'
          this.alert.show = true
          this.alert.hideFn()
          return false
        }
        this.$http.post('api/v1/accesstoken', {
          accesstoken: this.token
        }).then(res => {
          localStorage.loginname = res.data.loginname
          localStorage.avatar_url = res.data.avatar_url
          localStorage.userId = res.data.id
          localStorage.token = this.token
          let redirect = decodeURIComponent(this.$route.query.redirect || '/')
          this.$route.router.go(redirect)
        }, res => {
          var error = JSON.parse(res.responseText)
          this.alert.txt = error.error_msg
          this.alert.show = true
          this.alert.hideFn()
          return false
        })
      },

      readPic (e) {
        let file = e.currentTarget.files[0]
        let reader = new FileReader()
        reader.onload = e => {
          let dataURL = reader.result
          let base64 = dataURL.split('base64,')
          let param = {'img': base64[1]}

          this.loading.show = true
          if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
            this.$http.post('http://m.yueqingwang.com/common.ashx', param)
              .then(d => {
                this.loading.show = false
                if (d === 'qrcode error') {
                  this.token = ''
                  this.alert.txt = '二维码图片不清晰'
                  this.alert.show = true
                  this.alert.hideFn()
                  return false
                } else {
                  this.token = d
                }
              })
          } else {
            qrcode.decode(dataURL)
            qrcode.callback = function (data) {
              self.loading.show = false
              self.token = data
            }
          }
        }
        reader.readAsDataURL(file)
      }
    },

    components: {
      'nvHead': require('../components/header.vue'),
      'nvAlert': require('../components/nvAlert.vue'),
      'nvLoading': require('../components/loading.vue')
    }
  }
</script>

<style lang="scss">
.login-div {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
}
.page-body {
  padding: 100px 15px;

  .label {
    display: inline-block;
    width: 100%;
    margin-top: 15px;
    position: relative;
    left: 0;
    top: 0;

    .txt {
      padding: 12px 0;
      border:none;
      border-bottom: 1px solid #4fc08d;
      background-color: transparent;
      width: 100%;
      font-size: 14px;
      color: #313131;
    }
    .button {
      display: inline-block;
      width: 48%;
      height: 42px;
      line-height: 42px;
      border-radius: 3px;
      color: #fff;
      font-size: 16px;
      background-color: #4fc08d;
      border: none;
      border-bottom: 2px solid #3aa373;
      text-align: center;
      vertical-align: middle;
    }
    .button:first-child {
      margin-right: 2%;
    }
    .file {
      position: absolute;
      top: 0;
      left: 0;
      height: 42px;
      width: 48%;
      outline: medium none;
      filter:alpha(opacity=0);
      -moz-opacity:0;
      opacity:0;
    }
  }
}
</style>

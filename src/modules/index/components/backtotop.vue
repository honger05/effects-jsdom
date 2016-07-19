<template>
  <div class="icon-rocket"
    v-show="show"
    @click="goTop">
  </div>
</template>

<script>
  export default {
    replace: true,
    data () {
      return {
        show: false
      }
    },

    ready () {
      window.addEventListener('scroll', ev => {
        if (window.scrollY > 200) {
          this.show = true
        } else {
          this.show = false
        }
      })
    },

    beforeDestory () {
      window.removeEventListener('scroll')
    },

    methods: {
      goTop () {
        let timer = setInterval(() => {
          if (document.body.scrollTop === 0) {
            clearInterval(timer)
          }
          let speed = Math.ceil((document.body.scrollTop - 0) / 20)
          document.body.scrollTop = document.body.scrollTop - speed
        }, 16)
        this.show = false
      }
    }
  }
</script>

<style>
.icon-rocket {
  position: fixed;
  right: 10px;
  bottom: 80px;
  font-size: 50px;
  z-index: 9999;
  color: #e8bf38;
  transform: rotate(316deg);
}
</style>

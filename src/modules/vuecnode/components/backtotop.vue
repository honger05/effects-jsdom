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
        if (window.scrollY > 100) {
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
        window.scrollTo(0, 0)
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

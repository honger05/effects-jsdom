<template>
  <div>
    <header :class="{'show': showMenu}"
      id="hd">
      <div class="nv-toolbar">
        aaaa
      </div>
    </header>
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
      openMenu () {
        this.showMenu = !this.showMenu
      }
    }
  }
</script>

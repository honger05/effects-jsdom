<template>
  <div style="text-align:center">
    <img src="../assets/images/vue-logo.png" alt="" class="index">
  </div>
</template>
<script>
  export default {
    ready () {
      setTimeout(() => {
        this.$route.router.go({name: 'list'})
      }, 2000)
    }
  }
</script>
<style>
  .index {
    width: 60%;
    background-color: #fff;
  }
</style>

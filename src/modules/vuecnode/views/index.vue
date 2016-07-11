<template>
  <div>
    <img src="../assets/index.png" alt="" class="index">
  </div>
</template>
<script>
  export default {
    ready () {
      setTimeout(() => {
        // this.$route.router.go({name: 'lis'})
        console.log(1)
      }, 2000)
    }
  }
</script>
<style>
  .index {
    width: 100%;
    background-color: #fff;
    margin-top: 40%;
  }
</style>

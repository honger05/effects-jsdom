<template>
<div>
  <group>
    <cell title="Vux Demo" link="/demo"></cell>
    <cell title="Vue CnodeJs" link="http://localhost/vuecnode.html"></cell>
    <cell title="Animated Div" link="http://localhost/animatediv.html"></cell>
    <cell title="Simple Tab" link="http://localhost/tab.html"></cell>
    <cell title="table sort" link="http://localhost/tablesort.html"></cell>
  </group>
</div>
</template>

<script>
import Cell from 'vuxcpt/cell'
import Group from 'vuxcpt/group'

export default {
  components: {
    Cell,
    Group
  },
  data () {
    return {
      version: '1.0.1'
    }
  }
}
</script>

<style>

</style>

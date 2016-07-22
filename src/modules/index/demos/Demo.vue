<template>
<div>
  <group title="Scroller" title-color="#04be02">
    <cell title="pulldown" link="/demo/pulldown">
    </cell>
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

<template>
<div>
  <group>
    <cell title="Vue Demo" link="/demo"></cell>
    <cell title="Animated Div" link="http://localhost/animatediv.html"></cell>
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
  data() {
    return {
      version: '1.0.1'
    }
  }
}
</script>

<style>

</style>

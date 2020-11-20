<template>
  <div class="mainc d-flex justify-space-around flex-wrap">
    <Card></Card>
     <Card></Card>
      <Card></Card>
       <Card></Card>
        <Card></Card>
        <Card></Card>
        <div>{{msg}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '../meeting/vueCard.vue'

export default {
  
  components:{
     Card,
  },
  computed: {
    ...mapState({
      msg:state=>state.meeting
    })
  },
  created() {
    this.$store.dispatch("FECH_MEETINGLIST")
  },
}
</script>

<style>
.mainc{
  max-width: 960px;
  margin: 0 auto
}
</style>
<template>
  <div class="mainc d-flex justify-space-around flex-wrap">
    <Card></Card>
     <Card></Card>
      <Card></Card>
       <Card></Card>
        <Card></Card>
        <Card></Card>
  </div>
</template>

<script>
import Card from '../meeting/vueCard.vue'
export default {
  components:{
     Card,
  }

}
</script>

<style>
.mainc{
  max-width: 960px;
  margin: 0 auto
}
</style>
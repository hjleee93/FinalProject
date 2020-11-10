<template>
  <div class="mainc d-flex justify-space-around flex-wrap">
    <card-end></card-end>
    <card-end></card-end>
    <card-end></card-end>
    <card-end></card-end>
    <card-end></card-end>
    <card-end></card-end>
  </div>
</template>

<script>
import CardEnd from '../meeting/vueCardEnd.vue'
export default {
  components:{
    CardEnd,
  }

}
</script>

<style>
.mainc{
  max-width: 960px;
  margin: 0 auto
}

</style>
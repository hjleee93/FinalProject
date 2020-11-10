<template>
  <div class="container">
    <ToolBar/>
    <router-view></router-view>

  </div>
</template>

<script>
import ToolBar from '../ToolBar.vue';
export default {
    components:{
       ToolBar,
    }

}
</script>

<style>

</style>
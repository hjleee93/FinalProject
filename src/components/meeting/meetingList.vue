<template>
  <div class="container-fluid" >
   <div class="row">
    <div class="submenuimage">
        <p class="subtitle">모임</p>
    </div>
   <div class="container">
     <v-tabs
    color="grey darken-3"
    >
    <v-tab to="/meetingList/meeting"><b>예정된 모임</b></v-tab>
    <v-tab to="/meetingList/meetingend"><b>마감된 모임</b></v-tab>
    <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
  </v-tabs>
 
    <router-view></router-view>
      </div>
  </div>
  </div>
</template>

<script>

export default {
    components:{
       
    }

}
</script>

<style >
.v-slide-group__content{
 justify-content:center;
}
* {
  font-family: "Noto Sans KR", sans-serif;
}

.submenuimage {
  background-image: url("../../assets/images/code-1839406_1920.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.subtitle {
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
  font-size: 50px;
}
</style>
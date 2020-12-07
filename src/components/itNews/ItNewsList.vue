<template>
  <div class="container-fluid" >
   <div class="row">
    <div class="submenuimage">
        <p class="subtitle">ItNews</p>
    </div>
   <div class="container">
     <v-tabs
    color="grey darken-3"
    >
    <!-- <v-tab to="/meetingList/meeting"><b>예정된 모임</b></v-tab>-->
   <!-- <v-tab to="/meetingList/meetingend"><b>마감된 모임</b></v-tab>-->
  
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

.submenuimage{
    width: 100%;
    height:180px;
    background-color:#F4EEFF;
    text-align: center;
    line-height: 180px;
}
.subtitle{
    font-family: 'Masque';
    color:#4e5157 ;
    font-size: 50px;
}
</style>
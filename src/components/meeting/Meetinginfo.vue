<template>
  <b-container class="cont">
    <b-row  class="justify-content-md-center"><h1>{{minfo.collabTitle}}</h1></b-row>
    <b-row>
      <b-col>
       <v-img src="https://picsum.photos/id/11/500/300"   min-height="200" max-height="300"  max-width="500" min-width="400" aspect-ratio="1.7"></v-img>
     </b-col>
      <b-col >
        <b-card> 
           <b-row>
          <div class="f-box">일시:</div>
        </b-row>
           <b-row><div  class="f-box"> 정원:</div></b-row>
           <b-row><div  class="f-box"> 장소:{{minfo.address}}</div></b-row>
           <b-row><div  class="f-box"> 개발언어:{{minfo.collabLang}}</div></b-row>
           </b-card>
           
           </b-col>
           </b-row>
      <b-card> <b-row><b-col>개설자정보</b-col></b-row>
      <b-row><b-col>개설자성명:{{minfo.collabWriter}}</b-col></b-row>
      <b-row><b-col>개설자번호:{{minfo.collabPhone}}</b-col></b-row>
      <b-row><b-col>개설자이메일:{{minfo.collabEmail}}</b-col></b-row>
      
      </b-card>
     
       <b-card title="모집정보">
         <b-card>{{minfo.collabContent}}</b-card>
       </b-card>
    <b-row >
        <b-col align-self="center"><b-button id="m-btn">신청하기</b-button></b-col>
    </b-row>
    <div>{{minfo}}</div>
    </b-container>  
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return{

    }
  },
  created() {
    const no=this.$route.params.id
    this.$store.dispatch("FECH_MOBOARDINFO",no)
  },
  computed: {
    ...mapState({
      minfo:state=>state.minfo
    })
  },

}
</script>

<style>
#m-btn{
  background-color: #424874;
}
.rowbox1{
  font-size: 1.5em;
}
.f-box{
  margin-bottom: 20px;
}
.cont{
  border: 1px solid black;
  margin-top:1.5rem;
}
.layout2{
  margin-top:1.5rem;
  border:1px solid black;
}


</style>
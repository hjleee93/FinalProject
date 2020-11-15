<template>
<b-container fluid>
      <b-row >
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">portfolioinfo</p>
      </div>
      </b-row>
      <b-row>
        <b-col>제목</b-col>      
    </b-row>
    <div>{{pboardone}}</div>
    작성자
    내용
    첨부파일
    답글     
</b-container> 
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
          
        }
    },
    created() {
        const pboardNo=this.$route.params.id;
        console.log(pboardNo);
        this.$store.dispatch("FETCH_PBOARDONE",pboardNo)
    },
    computed: {
        ...mapState({
            pboardone:state=>state.pboardone
        })
    },
    
  
      


    



}
</script>

<style>
#subtitle{
font-family: 'Barlow Semi Condensed', sans-serif;
}
.submenuimage{
  width: 100%;
  height:180px;
  background-color:#ffffff;
  text-align: center;
  line-height: 180px; 
}
.subtitle{
  font-family: 'Masque';
  color:#4e5157 ;
  font-size: 50px;
}
</style>
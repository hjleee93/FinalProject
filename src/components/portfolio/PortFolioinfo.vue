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
 
    <div v-for="item in pboardone" :key="item.id">{{item}}</div>
<b-row><b-col>
          <b-button @click="update">수정</b-button>
          <b-button @click="pdelete">삭제</b-button>
          
  </b-col></b-row>
  <ModalView v-if="showModal" @close="showModal = false">
    <template>
      <div slot="header">
        정말 삭제하시겠습니까?
      </div>
      <div slot="body"> 
        <b-button @click="ydele">
          YES
        </b-button>
      <b-button @click="ndele">NO</b-button>
      </div>
      <div slot="footer">

      </div>
    </template>


  </ModalView>
     
</b-container> 
</template>

<script>
import ModalView from '../common/ModalView.vue'
import { mapState } from 'vuex';
export default {
    data(){
        return {
            showModal:false,
            pboardno:0,
      
        }
    },
    components:{
      ModalView,
    },
    methods: {
      update(){
        alert("수정버튼 눌림")
      },
      pdelete(){
          this.showModal=!this.showModal;
         
        
      },
      ydele(){
        let no=this.$route.params.id
         this.$store.dispatch("FETCH_PBOARDDEL",no)
        
        
      },
      ndele(){
        this.showModal=!this.showModal;
      }
    },
    created() {
        const pboardNo=this.$route.params.id;
        console.log(pboardNo);
        this.$store.dispatch("FETCH_PBOARDONE",pboardNo)
    },
    computed: {
        ...mapState({
            pboardone:state=>state.pboardone,
          
           
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
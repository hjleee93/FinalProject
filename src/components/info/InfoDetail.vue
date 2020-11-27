<template>

 <b-container fluid>
      <b-row >
        <div class="submenuimage ">
          <p class="subtitle" id="subtitle">채용설명회 일정</p>
        </div>
      </b-row>
      <b-row id="writecontain" align-h="end">
        <b-button to="/infoList">목록</b-button>
      </b-row>
      <b-row>
        <b-col><b-card class="text-center"><b-form>
        <b-row>
          <b-col cols="2"><b-form-group  label="기업명"/></b-col>
          <b-col> <b-form-input v-model="infoDetail.infoTitle" readonly/></b-col>
        </b-row>
        <b-row>
          <b-col cols="2"><b-form-group  label="분류"/></b-col>
          <b-col> <b-form-input v-model="infoDetail.infoCategory" readonly/></b-col>
        </b-row>
          <b-row>
          <b-col cols="2"><b-form-group  label="날짜"/></b-col>
          <b-col> <b-form-input v-model="infoDetail.infoDate" readonly/></b-col>
        </b-row>
        <b-row>
          <b-col cols="2"><b-form-group  label="시간" readonly/></b-col>
          <b-col> <b-form-textarea v-model="infoDetail.infoTime" readonly/></b-col>
        </b-row>
        <b-row>
          <b-col cols="2"><b-form-group  label="주소" readonly/></b-col>
          <b-col> <b-form-textarea v-model="infoDetail.infoAddress" readonly/></b-col>
        </b-row>
           <b-row>
          <b-col cols="2"><b-form-group  label="내용" readonly/></b-col>
          <b-col> <b-form-textarea v-model="infoDetail.infoContent" readonly/></b-col>
        </b-row>       
          </b-form>
       </b-card>
       </b-col>
      </b-row>


      <b-container>
      <b-row ><b-col><b-card class="text-center"><b-row><b-col cols="2"></b-col>
      <b-col><b-form-textarea readonly /></b-col>
      <b-col cols="1"><b-button>삭제</b-button></b-col>
      <b-col cols="1"><b-button>수정</b-button></b-col>
      </b-row></b-card></b-col>
      </b-row>
    
      </b-container>
      <div>게시판 객체 : {{infoDetail}}</div>
      <div>유저 객체 : {{userData}}</div>


 <ModalView v-if="showModal" @close="showModal = false">
    <template>
      <div slot="header">
        삭제하시겠습니까?
      </div>
      <div slot="body" class="modalf"> 
        <b-button @click="ydele">네</b-button>
         <b-button @click="ndele">아니요</b-button>
      </div>
      <div slot="footer">

      </div>
    </template>

  </ModalView>

  </b-container> 
</template>

<script>
import { mapState } from 'vuex';
import ModalView from '../common/ModalView.vue';
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

export default {

  data(){
      return{
        showModal:false,
        infoNo:0,
      }
    },
   components:{
        ModalView,   
    },
    methods: {
      update(){
        //새로운 수정 컴포넌트로 이동
        let no=this.$route.params.id
        this.$router.push({name:'InfoModify',params:{id:no}})

      },
      pdelete(){
          this.showModal=!this.showModal;
         
        
      },
      ydele(){
        let no=this.$route.params.id
         this.$store.dispatch("FETCH_INFO_DELETE",no)
         this.$router.push({name:'InfoList'})
        
        
      },
      ndele(){
        this.showModal=!this.showModal;
      },        
    },
    created() {
        const infoNo=this.$route.params.id;
        this.$store.dispatch("FETCH_INFO_DETAIL",infoNo)
    },
    computed: {
        ...mapState({
            infoDetail:state=>state.infoDetail,       
        }),
         ...loadUserState(['userData'])    
    }    
}
</script>

<style scoped>
#subtitle{
font-family: 'Barlow Semi Condensed', sans-serif;
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
#writecontain{
  margin-bottom: 10%;
  
}
.modalf{
  display: flex;
  justify-content: space-around;
}

</style>
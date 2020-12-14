<template>
 <b-container fluid>

      <b-row>
        <div class="submenuimage">
          <p class="subtitle" id="subtitle">Job Information</p>
        </div>
      </b-row>

<b-container>
    <b-row>
      <b-col>
       <b-card class="text-center">
        <b-form>
          <h4 class="sub-header">취업설명회 일정</h4>
          <hr>
        
        <b-row>
            <b-col class="title"><b>기업명</b> :  {{infoDetail.infoTitle}}</b-col>
        </b-row>
        
        <b-row>
            <b-col class="title"><b>분류</b> :  {{infoDetail.infoCategory}}</b-col>
        </b-row>

        <b-row>
           <!--  <b-col class="title"><b>날짜</b> :  {{infoDetail.infoDate}}</b-col> -->
          <b-col class="title"><b>날짜</b> :  {{infoDetail.infoDate | moment('YYYY년 MM월 DD일')}}</b-col>
        </b-row>

        <b-row>
            <b-col class="title"><b>시간</b> :  {{infoDetail.infoTime}}</b-col>  
        </b-row>

        <b-row>
            <b-col class="title"><b>주소</b> : {{infoDetail.infoContent}}</b-col>
        </b-row>

        <b-row v-if="attachment">
              <b-col class="qnaphoto">첨부파일</b-col>
              <b-col><b-button class="qnaphotofile"  @click="attachmentdown(attachment)">{{attachment.originalfilename}}</b-button></b-col>
        </b-row>

       <!-- 
        <b-row>
          <b-col cols="3"><b-form-group label="기업명"/></b-col>
          <b-col><b-form-input id="form-control" v-model="infoDetail.infoTitle" readonly/></b-col>
        </b-row> 
         
        <b-row>
          <b-col cols="3"><b-form-group  label="분류"/></b-col>
          <b-col> <b-form-input v-model="infoDetail.infoCategory" readonly/></b-col>
        </b-row>

        <b-row>
          <b-col cols="3"><b-form-group  label="날짜"/></b-col>
          <b-col> <b-form-input v-model="infoDetail.infoDate" readonly/></b-col>       
        </b-row>

         <b-row>
          <b-col cols="3"><b-form-group  label="시간" readonly/></b-col>
          <b-col> <b-form-textarea v-model="infoDetail.infoTime" readonly/></b-col>
        </b-row> 

        <b-row>
          <b-col cols="3"><b-form-group  label="주소/내용" readonly/></b-col>
          <b-col> <b-form-textarea v-model="infoDetail.infoContent" readonly/></b-col>
        </b-row>  

        <b-row v-if="attachment">
          <b-col cols="3"><b-form-group  label="첨부파일" readonly/></b-col>
          <b-col cols="1" id="file"><b-button id="btn_file" @click="attachmentdown(attachment)">{{attachment.originalfilename}}</b-button></b-col>
        </b-row>       
          </b-form> -->
        </b-form>
        
        <b-row id=" writecontain" align-h="end">
          <b-col>
            <b-button id="btn_update" v-if="userData.memberEmail === 'admin@kh.com'" @click="update">수정</b-button>
            <b-button id="btn_pdelete" v-if="userData.memberEmail === 'admin@kh.com'" @click="pdelete">삭제</b-button>
            <b-button to="/infoList" id="golist">목록</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
  </b-container>   
    <ModalView v-if="showModal" @close="showModal = false">

    <template>
      <div slot="header">
        삭제하시겠습니까?
      </div>
      <div slot="body" class="modalf"> 
        <b-button id="but_ydele" @click="ydele">네</b-button>
        <b-button id="but_ndele" @click="ndele">아니요</b-button>
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
import { createNamespacedHelpers } from "vuex";
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");

export default {
  data(){
      return{
        showModal:false,
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
       //첨부파일 다운로드 
      attachmentdown(attachment){
        location.href="http://localhost:8082/itjobgo/info/filedownload?oriName="+attachment.originalfilename+"&reName="+attachment.renamedfilename;
      }             
    },
    created() {
        const infoNo=this.$route.params.id;
        this.$store.dispatch("FETCH_INFO_DETAIL",infoNo)
        this.$store.dispatch("FETCH_INFO_ATTACHMENT",infoNo)
    },
    computed: {      
        ...mapState({
            infoDetail:state=>state.infoDetail,  
            attachment:state=>state.infoAttachment2         
        }),
         ...loadUserState(['userData'])    
    }    
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@1,600&display=swap');
  * {
    font-family: 'Nanum Gothic', sans-serif;
  }
.subtitle{
  font-family: 'Masque';
  color:#4e5157 ;
  font-size: 50px;
}
.submenuimage{
  width: 100%;
  height:180px;
  background-color:#F4EEFF;
  text-align: center;
  line-height: 180px; 
}
.text-center{
    margin: 10px 100px;
    font-weight: bold;
}
.sub-header{
margin: 35px 100px ;

}
.form-control{  
  width:550px;
  margin-bottom: 5px; 
  background-color: white;
  border-color:white;
  resize: none; 
}
#subtitle{
font-family: 'Barlow Semi Condensed', sans-serif;
}
#writecontain{
  margin: 2%;
  text-align: center;
  }
#btn_update{
  width:60px;
  margin-bottom: 5px; 
  margin-right: 1.5%;
  background-color: #424874;
  border:5px;
  color:white; 
}
#btn_pdelete{
    width:60px;
    margin-bottom: 5px; 
    margin-right: 1.5%;
    background-color: #9BA4B4;
    border:5px;
    color:white; 
}
#golist{
  width:60px;
  margin-bottom: 5px; 
  background-color: #424874;
  border:5px;
  color:white; 
}
#but_ydele{
  background-color: red;
  border-color:red;
}
#but_ndele{
  background-color: #424874;
}
#btn_file{
  background-color: #512d7ee7;
  margin-bottom: 10px; 
}
.modalf{
  display: flex;
  justify-content: space-around;
}
</style>
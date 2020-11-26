<template>
<b-container fluid>
      <b-row >
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">communityBoardInfo</p>
      </div>
      </b-row>
      <b-row id=" writecontain" align-h="end"><b-button to="/communityBoardList">목록으로 </b-button></b-row>
      <b-row>
        <b-col><b-card class="text-center"><b-form>
        <b-row>
          <b-col cols="2"><b-form-group  label="제목"/></b-col>
          <b-col> <b-form-input v-model="communityboardView.boardTitle" readonly/></b-col>
        </b-row>
          <b-row>
          <b-col cols="2"><b-form-group  label="작성자"/></b-col>
          <b-col> <b-form-input v-model="communityboardView.boardWriter" readonly/></b-col>
        </b-row>
          <b-row>
          <b-col cols="2"><b-form-group  label="작성내용" readonly/></b-col>
          <b-col> <b-form-textarea v-model="communityboardView.boardContent" readonly/></b-col>
        </b-row>
        <b-row v-if="attachment">
          <b-col cols="2"><b-form-group  label="첨부파일" readonly/></b-col>
          <b-col cols="2"><b-button @click="attachmentdown(attachment)">{{attachment.originalfilename}}</b-button></b-col>
        </b-row>
          </b-form>
          <b-row v-if="userData.memberSq===communityboardView.memberNum"><b-col>
          <b-button @click="update">수정</b-button>
          <b-button @click="pdelete">삭제</b-button>
  </b-col></b-row></b-card></b-col>
      </b-row>
      

      <b-form v-if="userData.memberSq!=null"><b-row ><b-col><b-card class="text-center"><b-row><b-col cols="2"><b-form-group label="답글"/></b-col>
      <b-col><b-form-textarea v-model="pcomment" /></b-col>
      <b-col cols="1"><b-button @click="comment">전송</b-button></b-col>
      </b-row></b-card></b-col></b-row></b-form>

      <b-container>
      <b-row ><b-col><b-card class="text-center"><b-row><b-col cols="2"><b-form-group label="답글"/></b-col>
      <b-col><b-form-textarea readonly /></b-col>
      <b-col cols="1"><b-button>삭제</b-button></b-col>
      <b-col cols="1"><b-button>수정</b-button></b-col>
      </b-row></b-card></b-col>
      </b-row>
    
      </b-container>
      <div>게시판 객체 : {{communityboardView}}</div>
      <div>유저 객체 : {{userData}}</div>
      <p>날짜표시  : {{ communityboardView.boardDate | moment('YYYY-MM-DD') }}</p>

  
  <!-- <div v-for="item in pboardone" :key="item.id">{{item}}</div> -->
    

  <ModalView v-if="showModal" @close="showModal = false">
    <template>
      <div slot="header">
        정말 삭제하시겠습니까?
      </div>
      <div slot="body" class="modalf"> 
        <b-button @click="ydele">네</b-button>
         <b-button @click="ndele">아니오</b-button>
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
import axios from 'axios';
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

import Vue from 'vue'
import vueMoment from 'vue-moment';
Vue.use(vueMoment);

export default {
    data(){
        return {
            showModal:false,
            pboardno:0,
            pcomment:'',
      
        }
    },
    components:{
      ModalView,
    },
    methods: {
      update(){
        //수정버튼 눌렸을때 처리하는 로직
        //새로운 수정 컴포넌트로 이동
        let no=this.$route.params.id
        this.$router.push({name:'CommunityBoardUpdate',params:{id:no}})

      },
      pdelete(){
          this.showModal=!this.showModal;
         
        
      },
      ydele(){
        let no=this.$route.params.id
         this.$store.dispatch("FETCH_COMMUNITYBOARD_DELETE",no)
         this.$router.push({name:'CommunityBoardList'})
        
        
      },
      comment(){
        let formData2=new FormData();
        formData2.append('pboardNo',this.pboardone.pboardNo);
        formData2.append('pcommentContent',this.pcomment);
        formData2.append('memberSq',this.userData.memberSq);
        formData2.append('memberName',this.userData.memberName)
        for(let key of formData2.entries()){
          console.log(`${key}`);
        }
      axios.post("http://localhost:8082/itjobgo/portfolio/comment.do",formData2)
      .then((data)=>{
          console.log(data)})
        .catch((error)=>
        console.log(error))
     
      },
      ndele(){
        this.showModal=!this.showModal;
      },
      //첨부파일 다운로드 
      attachmentdown(attachment){
        location.href="http://localhost:8082/itjobgo/community/filedownload?oriName="+attachment.originalfilename+"&reName="+attachment.renamedfilename;
      }         
    },
    created() {
        const communityBoardNo=this.$route.params.id;
        this.$store.dispatch("FETCH_COMMUNITYBOARD_VIEW",communityBoardNo)
        this.$store.dispatch("FETCH_COMMUNITYBOARD_ATTACHMENT",communityBoardNo)
        
    },
    computed: {
     
        ...mapState({
            communityboardView:state=>state.communityboardView,
            attachment:state=>state.cbAttachment2         
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
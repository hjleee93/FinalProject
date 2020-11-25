<template>
<b-container fluid>
      <b-row >
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">portfolioinfo</p>
      </div>
      </b-row>
      <b-row id=" writecontain" align-h="end"><b-button to="/portfolioList">목록으로 </b-button></b-row>
      <b-row>
        <b-col><b-card class="text-center"><b-form>
        <b-row>
          <b-col cols="2"><b-form-group  label="제목"/></b-col>
          <b-col> <b-form-input v-model="pboardone.pboardTitle" readonly/></b-col>
        </b-row>
          <b-row>
          <b-col cols="2"><b-form-group  label="작성자"/></b-col>
          <b-col> <b-form-input v-model="pboardone.pboardWriter" readonly/></b-col>
        </b-row>
          <b-row>
          <b-col cols="2"><b-form-group  label="작성내용" readonly/></b-col>
          <b-col> <b-form-textarea v-model="pboardone.pboardContent" readonly/></b-col>
        </b-row>
        <b-row v-if="attachment">
          <b-col cols="2"><b-form-group  label="첨부파일" readonly/></b-col>
          <b-col cols="2"><b-button @click="attachmentdown(attachment)">{{attachment.originalFilename}}</b-button></b-col>
        </b-row>
          </b-form>
          <b-row v-if="userData.memberSq===pboardone.pboardId"><b-col>
          <b-button @click="update">수정</b-button>
          <b-button @click="pdelete">삭제</b-button>
  </b-col></b-row></b-card></b-col>
      </b-row>
      

      <b-form v-if="userData.memberSq!=null"><b-row ><b-col><b-card class="text-center"><b-row><b-col cols="2"><b-form-group label="답글"/></b-col>
      <b-col><b-form-textarea ref="comment" v-model="pcomment" /></b-col>
      <b-col cols="1"><b-button @click="comment">전송</b-button></b-col>
      </b-row></b-card></b-col></b-row></b-form>

      <b-container>
      <b-row ><b-col><b-card class="text-center"><b-row><b-col cols="2"><b-form-group label="답글"/></b-col>
      <b-col><b-form-textarea readonly /></b-col>
      <b-col cols="1"><b-button>삭제</b-button></b-col>
      <b-col cols="1"><b-button>수정</b-button></b-col>
      </b-row></b-card></b-col>
      </b-row>
      <div>{{commentlist}}</div>
    
      </b-container>
      <!-- <div>{{pboardone}}</div> -->
      <!-- <div>{{userData}}</div> -->
  
  <!-- <div v-for="item in pboardone" :key="item.id">{{item}}</div> -->
    

  <ModalView v-if="showModal" @close="showModal = false">
    <template>
      <div slot="header">
        정말 삭제하시겠습니까?
      </div>
      <div slot="body" class="modalf"> 
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
import axios from 'axios';
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";
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
        this.$router.push({name:'Portup',params:{id:no}})

      },
      pdelete(){
          this.showModal=!this.showModal;
         
        
      },
      ydele(){
        let no=this.$route.params.id
         this.$store.dispatch("FETCH_PBOARDDEL",no)
         this.$router.push({name:'portlist'})
        
        
      },
     
      comment(){
        let formData2=new FormData();
        formData2.append('pboardNo',this.pboardone.pboardNo);
        formData2.append('pcommentContent',this.pcomment);
        formData2.append('memberSq',this.userData.memberSq);
        formData2.append('memberName',this.userData.memberName)
        // for(let key of formData2.entries()){
        //   console.log(`${key}`);
        // }
      axios.post("http://localhost:8082/itjobgo/portfolio/comment.do",formData2)
      .then((data)=>{
        console.log(data)
        this.pcomment=""
      
      })
      .catch((error)=>
        console.log(error))
     
      },
      ndele(){
        this.showModal=!this.showModal;
      },
      //첨부파일 다운로드 
      attachmentdown(attachment){
        location.href="http://localhost:8082/itjobgo/portfolio/filedownload?oriName="+attachment.originalFilename+"&reName="+attachment.renamedFilename;
      }         
    },
    created() {
        const pboardNo=this.$route.params.id;
        this.$store.dispatch("FETCH_PBOARDONE",pboardNo)
        this.$store.dispatch("FETCH_ATTACHMENT",pboardNo)
        this.$store.dispatch("FETCH_COMMNET",this.$route.params.id);
        
    },
    mounted() {
     
        //모든 화면이 렌더링된 후 호출 된다.
        
  
    },
    computed: {
      
        ...mapState({
            pboardone:state=>state.pboardone,
            attachment:state=>state.attachment2,
            commentlist:state=>state.comment    
        }),
         ...loadUserState(['userData'])  
    },
    
    
  
    
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
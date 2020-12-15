<template>
 <div class="container-fluid">
      <b-row >
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">portfolioinfo</p>
      </div>
      </b-row>
      <b-row id=" writecontain" align-h="end"><b-button to="/portfolioList">목록으로 </b-button></b-row>
      <b-row>
        <b-col>
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
          <b-col> <b-form-textarea   rows="3"
        max-rows="8" v-model="pboardone.pboardContent" readonly/></b-col>
        </b-row>
        <b-row v-if="attachment">
          <b-col cols="2"><b-form-group  label="첨부파일" readonly/></b-col>
          <b-col cols="2"><b-button @click="attachmentdown(attachment)">{{attachment.originalFilename}}</b-button></b-col>
        </b-row>
          
          <b-row v-if="userData.memberSq===pboardone.pboardId"><b-col>
          <b-button @click="update" v-if="userData.memberSq===pboardone.pboardId">수정</b-button>
          <b-button @click="pdelete"  v-if="userData.memberSq===pboardone.pboardId||userData.memberEmail === 'admin@kh.com'" >삭제</b-button>
  </b-col></b-row></b-col>
      </b-row>
    <b-form @submit.prevent="comment" v-if="userData.memberLevel>=2"><b-row ><b-col><b-card class="text-center"><b-row><b-col cols="2">{{userData.memberName}}</b-col></b-row>
      <b-row><b-col><b-form-textarea required ref="comment" v-model="pcomment" /></b-col>
      <b-col cols="1"><b-button type="submit">전송</b-button></b-col></b-row>
      </b-card></b-col></b-row></b-form>
      <b-container>
      <b-row v-for="comments in commentlist" :comments="comments"  :key="comments.id"><b-col><b-card class="text-center"><b-row><b-col  style="text-align:start" align-self="start" >{{comments.memberName}}</b-col>
       <b-col align-self="end"  style="text-align:end" >{{new Date(comments.pcommentDate).toLocaleDateString()}}</b-col>
      </b-row>
      <!-- 인풋 박스를 조건으로 비활성화 할수 있음-->
      <b-row><b-col>
     
      <b-form-textarea  :disabled="commentcheck"  :value="comments.pcommentContent" @input="updateInput" />
      </b-col>
     
      <template v-if="comments.memberSq==userData.memberSq">
        <b-col cols="1">
           <div @click="declick(comments.pcommentNo)">삭제</div> 
           <div @click="upclick($event)" >수정</div> <!--v-if="commentcheck==false"-->
           <div @click="upendclick(comments.pcommentNo,$event)" >확인</div> 
        </b-col>
        
      </template>
      
      </b-row></b-card></b-col>
      </b-row>
      <!--<div>{{userData}}</div>-->
 
    
      </b-container>
   

  

    

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
     
</div>
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
            commentcheck:true,
            changeval:'',
            boolcheck:false,
            values:'',
            updatetext:'',
            comments:'',
            retext:'',
      
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
      updateInput(event){
        this.updatetext=event;
        

      },
      upclick(e){
        console.log(e)
       if(e.target.parentElement.parentElement.children[0].children[0].disabled==true){
         e.target.parentElement.parentElement.children[0].children[0].disabled = false
       }else e.target.parentElement.parentElement.children[0].children[0].disabled = true
       
        //console.log()//
       // this.commentcheck=false;
      },
      ydele(){
        let no=this.$route.params.id
         this.$store.dispatch("FETCH_PBOARDDEL",no)
         this.$router.push({name:'portlist'})
        
        
      },
      upendclick(commentno,e){
       const ccno=commentno
        e.target.parentElement.parentElement.children[0].children[0].disabled = true;
        if(this.updatetext=='') this.updatetext = e.target.parentElement.parentElement.children[0].children[0].value
       axios.post("http://localhost:8082/itjobgo/portfolio/updatecomment.do",{pcommentcontent:this.updatetext,pcommentNo:ccno})
       .then(()=>{
           this.$store.dispatch("FETCH_COMMNET",this.$route.params.id);
           this.updatetext='';
       })
      },
      declick(commentno){
        let delfirm=confirm("삭제 하시겠습니까?")
        if(delfirm){
          const cno=commentno;
        this.$store.dispatch("FETCH_COMMENTDEL",cno).then(()=>{
           this.$store.dispatch("FETCH_COMMNET",this.$route.params.id);
        })
        }
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
        this.pcomment="",
        this.$store.dispatch("FETCH_COMMNET",this.$route.params.id);
      
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
<template>
<b-container fluid>
      <!-- <b-row >
        <div class="submenuimage ">
            <p>Q&A</p>
        </div>
      </b-row> -->  



    <!-- 상세페이지 본문 시작 -->
    <div class="container">
        <b-col>
            <b-card class="viewcontainer">
                <b-form>
                    <b-row>
                        <b-col class="qnawriter">작성자 : {{qnaBoardView.qnaWriter}}<br></b-col>
                        <p class="qnadate">{{formatDate(qnaBoardView.qnaDate)}} 작성</p>
                    </b-row>
                        
                    <b-row>
                        <b-col class="qnatitle"><b>{{qnaBoardView.qnaTitle}}</b></b-col>
                    </b-row>
                        <hr>
                    <b-row>
                        <b-col class="qnacontent">{{qnaBoardView.qnaContent}}</b-col>                
                    </b-row> 
                        <hr><br>
                    <b-row v-if="attachment">
                        <b-col class="qnaphoto">첨부파일</b-col>
                        <b-col><b-button class="qnaphotofile" @click="qbattachmentdown(attachment)">{{attachment.originalfilename}}</b-button></b-col>
                    </b-row>

                </b-form>
          </b-card>
        </b-col>

            <b-row>
                <b-col class="btndiv">
                    <b-button to="/qnaBoard">목록으로 </b-button> 
                    <b-button v-if="userData.memberSq===qnaBoardView.memberNum"
                        class="btn_center" @click="updateqna">수정</b-button>
                    <b-button v-if="userData.memberSq===qnaBoardView.memberNum||userData.memberEmail==='admin@kh.com'"
                        class="btn_center" @click="deleteqna">삭제</b-button>
                </b-col>
            </b-row>


      <b-form v-if="userData.memberSq!=null"><b-row ><b-col><b-card class="text-center"><b-row><b-col cols="2"><b-form-group label="댓글"/></b-col>
      <b-col><b-form-textarea ref="qnacomment" v-model="qbcomment" /></b-col>
      <b-col cols="1"><b-button @click="qnacomment">전송</b-button></b-col>
      </b-row></b-card></b-col></b-row></b-form>

    <!-- 댓글창 -->
      <b-row v-for="qnacomment in commentlist" :key="qnacomment.id"><b-col><b-card class="text-center"><b-row><b-col cols="2"><b-form-group label="답글"/></b-col>
      <b-col><b-form-textarea readonly :value="qnacomment.qbcommentContent" /></b-col>
      <b-col cols="1">{{new Date(qnacomment.qbcommentDate).toLocaleDateString()}}</b-col>
      <template v-if="qnacomment.memberSq==userData.memberSq">
        <b-col cols="1">
           <div @click="declick(qnacomment.qbcommentNo)">삭제</div> 
           <div @click="upclick(qnacomment)">수정</div> 
        </b-col>
      </template>
      </b-row></b-card></b-col>
      </b-row>
   
        <div>댓글 테스트 확인용 >>> {{commentlist}}</div>

    </div>

   <!-- <div>
       게시판 객체 : {{qnaBoardView}}<br>
       멤버 객체 : {{userData}}<br>
   </div> -->
      

    <!-- 삭제 모달창 -->
    <ModalView v-if="showModal" @close="showModal=false">
    <template>
        <div slot="header">
            정말 삭제하시겠습니까?
        </div>
        <div slot="body" class="modalf">
            <b-button @click="yesDeleteqna">
                삭제하기
            </b-button>
            <b-button @click="noDeleteqna">
                취소하기
            </b-button>
        </div>
        <div slot="footer"></div>
    </template>
    </ModalView>


</b-container>
</template>

<script>

import ModalView from '../common/ModalView.vue';
import { mapState } from 'vuex';
import axios from 'axios';
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";
import vueMoment from 'vue-moment';
Vue.use(vueMoment);
import Vue from 'vue'

// import axios from 'axios'; 댓글

export default {

    data(){
        return{
            showModal:false,
            qnaBoardNo:0,
            qbcomment:'',
        }
    },

    components :{
        ModalView,
    },

    methods:{
    
            // axios.post("http://localhost:8082/itjobgo/portfolio/comment.do",formData2)
            // .then((data)=>{
            //     console.log(data)})
            //     .catch((error)=>
            //     console.log(error))
            
            // },
    
            //1.삭제버튼~
            deleteqna(){
                this.showModal=!this.showModal;
            },
                //(삭제YES)
            yesDeleteqna(){
                let no=this.$route.params.id   
                this.$store.dispatch("FETCH_QNABOARD_DELETE",no);
                //삭제 후 페이지 이동
                this.$router.push({name:'qnaBoard'});
            },
            noDeleteqna(){
                //(삭제NO)
                this.showModal=!this.showModal;
            },
    
            //2.수정버튼~
            updateqna(){
                //alert("수정버튼")
                //수정도 router.js에 등록됨. name값을 이용해서 페이지 전환
                let no=this.$route.params.id
            console.log("수정버튼(params) :"+ no);
            // console.log("글번호 :  : " + communityBoardNo)
            this.$router.push({name:'qnaModify',params:{id:no}})
            },

            //첨부파일 다운로드
            qbattachmentdown(attachment){
            location.href="http://localhost:8082/itjobgo/qna/qnafiledownload?oriName="+attachment.originalfilename+"&reName="+attachment.renamedfilename;
            },

            //댓글등록
            qnacomment(){
                let formData2=new FormData();
                formData2.append('qbcommentNo',this.qnaBoardView.qnaboardNo);
                formData2.append('qbcommentContent',this.qbcomment);
                formData2.append('memberSq',this.userData.memberSq);
                formData2.append('memberName',this.userData.memberName)
                // for(let key of formData2.entries()){
                //   console.log(`${key}`);
                // }
            axios.post("http://localhost:8082/itjobgo/qna/qnacomment",formData2)
            .then((data)=>{
                console.log(data)
                this.qbcomment="",
                this.$store.dispatch("FETCH_QNABOARD_COMMENT",this.$route.params.id);
            
            })
            
            .catch((error)=>
                console.log(error))
            
            },

            //날짜표시
            formatDate(value){
            return this.$moment(value).format("YYYY-MM-DD");
            },
 
            //댓글삭제
            // declick(commentno){
            //     let delfirm=confirm("삭제 하시겠습니까?")
            //     if(delfirm){
            //     const cno=commentno;
            //     this.$store.dispatch("FETCH_COMMENTDEL",cno)
            //     return  this.$store.dispatch("FETCH_COMMNET",this.$route.params.id)
            //     }else{
            //     return
            //     }




    },
    
    
    created(){
        const qnaBoardNo=this.$route.params.id;
        this.$store.dispatch("FETCH_QNABOARD_VIEW",qnaBoardNo)
        this.$store.dispatch("FETCH_QNABOARD_ATTACHMENT",qnaBoardNo)
        this.$store.dispatch("FETCH_QNABOARD_COMMENT",this.$route.params.id);
        console.log(qnaBoardNo);
    },

    computed:{

        ...mapState({
            qnaBoardView:state=>state.qnaBoardView,
            attachment:state=>state.qbAttachment2,
            commentlist:state=>state.qnacomment,
        }),
        ...loadUserState(['userData'])

        },

}

</script>

<style>

.modalf{
  display: flex;
  justify-content: space-around;
}
.btn_center{
    margin-left:1%;
}
.contents_view{
    border:1px red solid;
}
.qnatitle{
    font-size: 18px;
}
.qnawriter{
    font-size: 14px;
}
.qnadate{
    font-size: 14px;
    margin-left: -120px;
    color: grey;   
}
.qnaphotofile{
    margin-left: -85%;
}
.viewcontainer{
    margin: 3%;
}
.btndiv{
    margin-left: 38%;
    margin-bottom: 3%;
}


</style>
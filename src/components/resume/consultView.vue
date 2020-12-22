<template>
 <div class="consult_resume">
  <body>
    <div class="container-fluid">
      <div class="submenuimage">
          <p class="subtitle">Consult Resume Detail</p>
      </div>
      <div>
          <v-tabs centered color="grey darken-3">
              <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
              <v-tab to="/resume/resumeList">입사지원서 보기</v-tab>
              <v-tab active to="/resume/consultresume">입사지원서 컨설팅</v-tab>
              <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
              <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs>
      </div>

        <!-- 상세페이지 본문 시작 -->
            <div class="container">
                <b-col>
                    <b-card class="viewcontainer">
                        <b-form>
                            <b-row>
                                <b-col class="rboardwriter">작성자 : {{rboardDetail.rboardWriter}}<br></b-col>
                                <p class="rboarddate">{{formatDate(rboardDetail.rboardDate)}} 작성</p>
                            </b-row>
                                
                            <b-row>
                                <b-col class="consulttitle"><b>{{rboardDetail.rboardTitle}}</b></b-col>
                            </b-row>
                                <hr>
                            <b-row>
                                <b-col class="consultcontent">{{rboardDetail.rboardContent}}</b-col>                
                            </b-row> 
                                <hr><br>
                            <b-row v-if="rboardAttachment.rboardNo!=null">
                                <b-col class="consultphoto">첨부파일</b-col>
                                <b-col><b-button class="qnaphotofile" @click="rboardAttachmentDown(rboardAttachment)">{{rboardAttachment.originalFilename}}</b-button></b-col>
                            </b-row>

                        </b-form>
                </b-card>
                </b-col>

                    <b-row>
                        <b-col class="btndiv">
                            <b-button to="../../resume/consultresume">목록으로</b-button> 
                            <b-button v-if="userData.memberSq===rboardDetail.rboardId"
                                class="btn_center" @click="updateConsult">수정</b-button>
                            <b-button v-if="userData.memberSq===rboardDetail.rboardId||userData.memberEmail==='admin@kh.com'"
                                class="btn_center" @click="deleteConsult">삭제</b-button>
                        </b-col>
                    </b-row>

            </div>

            <!-- 댓글창 -->
            <b-container>
            <b-row v-for="comment in commentlist" :key="comment.id">
                <b-col>
                <b-card class="text-center">
                    <b-row><b-col cols="2">{{comment.memberName}}
                    <br>{{comment.qbcommentDate | moment('YYYY.MM.DD HH:mm:ss')}}
                    </b-col>
                    <!-- 쓴사람과 아닐떄는 일반 댓글로 보여주지않기 -->
                    <b-col v-if="comment.memberSq!=userData.memberSq">{{comment.qbCommentContent}}</b-col>
                    <!-- 자기 댓글은 수정할수있는 input 박스로 보여주기 -->
                    <b-form v-if="userData.memberSq!=null && comment.memberSq==userData.memberSq">

                    <b-col>
                        <b-row>
                        <b-col>
                            <b-form-textarea :disabled="commentcheck" :value="comment.qbCommentContent" 
                            @input="updateInput" id="commentUptxt"/>
                        </b-col>
                                <template v-if="comment.memberSq==userData.memberSq">
                                    <b-col>
                                    <b-button v-if="userData.memberSq===comment.memberSq"
                                        @click="upclick($event)"  id="update-btn">수정</b-button> 
                                    <b-button v-if="userData.memberSq===comment.memberSq || userData.memberEmail === 'admin@kh.com'"
                                        @click="declick(comment.qboardCommentNo)" id="deltet-btn">삭제</b-button> 
                                    <b-button 
                                        @click="upendclick(comment.qboardCommentNo,$event)" id="updateEnd-btn">확인</b-button> 
                                    </b-col>
                                </template>
                            </b-row>
                        </b-col>
                    </b-form>
                    </b-row></b-card></b-col>
                </b-row>
        <!-- 댓글쓰기 -->
            <b-form v-if="userData.memberSq!=null">
                <b-row >
                <b-col>
                    <b-card class="text-center">
                    <b-row>
                        <b-col><b-form-textarea rows="8" ref="comment"
                                v-model="qbcomment" placeholder="댓글을 남겨보세요" /></b-col>
                        <b-col cols="1"><b-button
                                @click="comment" id="comment_insert_btn">등록</b-button></b-col>
                    </b-row>
                    </b-card></b-col>
                </b-row>
            </b-form>
            </b-container>
            <!-- 삭제 모달창 -->
            <ModalView v-if="showModal" @close="showModal=false">
            <template>
                <div slot="header">
                    정말 삭제하시겠습니까?
                </div>
                <div slot="body" class="modalf">
                    <b-button @click="yesDeleteConsult">
                        삭제하기
                    </b-button>
                    <b-button @click="noDeleteConsult">
                        취소하기
                    </b-button>
                </div>
                <div slot="footer"></div>
            </template>
            </ModalView>
    </div>
  </body>
 </div>
</template>



<script>

import ModalView from '../common/ModalView.vue';
import { mapState } from 'vuex';
import axios from 'axios';
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

import Vue from 'vue'
import vueMoment from 'vue-moment';
Vue.use(vueMoment);

var moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

export default {

    data(){
        return{
            showModal:false,
            qnaBoardNo:0,
            qbcomment:'',

            commentModal:false,
            commentcheck:true,
            changeval:'',
            boolcheck:false,
            updatetext:'',
        }
    },

    watch:{
      commentlist:{
        handler(newValue){
          this.changeval=newValue[0].qbCommentContent;
        },deep:true,
      }
    },

    components :{
        ModalView,
    },

    methods:{

            // 날짜변환 함수
            formatDate(value) {
                // console.log(value);
                return this.$moment(value).format('YYYY년 MM월 DD일');
            },     
            
            // 게시글 수정버튼
                updateConsult(){
                let no=this.$route.params.id
                console.log("수정버튼(params) :"+ no);
                this.$router.push({name:'updateConsult',params:{id:no}})
            },

            // 삭제버튼~
            deleteConsult(){
                this.showModal=!this.showModal;
            },
                //(삭제YES)
            yesDeleteConsult(){
                let rboardNo=this.$route.params.id   
                this.$store.dispatch("FETCH_RBOARD_DELETE",rboardNo);
                //삭제 후 페이지 이동
                this.$router.push({name:'consultresume'});
            },
            noDeleteConsult(){
                //(삭제NO)
                this.showModal=!this.showModal;
            },

            //댓글등록
            comment(){
                //새로고침 1초컷
                setTimeout(() => {
                let formData2=new FormData(); 
                  formData2.append('qboardNo',this.qnaboard2.qboardNo);
                  formData2.append('qbCommentContent',this.qbcomment);
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
                  }, 1000)
            })
                
            .catch((error)=>
              console.log(error))
                
            },

            //코멘트 모달 취소
            cancleModal(){
            this.commentModal=!this.commentModal;
        
            },

            //첨부파일 다운로드
            rboardAttachmentDown(rboardAttachment){
            location.href="http://localhost:8082/itjobgo/resume/rboardFileDownload?oriName="+rboardAttachment.originalFilename+"&reName="+rboardAttachment.renamedFilename;
            },

 
            //댓글삭제
            declick(commentno){
                let delfirm=confirm("댓글을 삭제 하시겠습니까?")
                if(delfirm){
                const qno=commentno;
                this.$store.dispatch("FETCH_QNABOARD_COMMENTDEL",qno)
                return  this.$store.dispatch("FETCH_QNABOARD_COMMENT",this.$route.params.id);
                }else{
                return
                }
            },

            //댓글수정
            handleInput: function (event) {
            // 할당 전에 어떤 처리하기
            this.comment.ntCommentContent = event.target.value;
            this.updateComment=this.comment.ntCommentContent;

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

            upendclick(commentno,e){
            const qqno=commentno
                e.target.parentElement.parentElement.children[0].children[0].disabled = true;
                if(this.updatetext=='') this.updatetext = e.target.parentElement.parentElement.children[0].children[0].value
            axios.post("http://localhost:8082/itjobgo/qna/updateComment",{qbCommentContent:this.updatetext,qboardCommentNo:qqno})
            .then((data)=>{
                console.log(data)
                    // this.commentcheck=true;
                this.$store.dispatch("FETCH_QNABOARD_COMMENT",this.$route.params.id);
                this.updatetext='';
            })
            },
 

    },

    created(){
        const rboardNo=this.$route.params.id;
        this.$store.dispatch("FETCH_RBOARD_VIEW", rboardNo)
        this.$store.dispatch("FETCH_RBOARD_ATTACHMENT", rboardNo)
        // this.$store.dispatch("FETCH_QNABOARD_VIEW",qnaboardNo)
        // this.$store.dispatch("FETCH_QNABOARD_ATTACHMENT",qnaboardNo)
        // this.$store.dispatch("FETCH_QNABOARD_COMMENT",this.$route.params.id);
    },

    mounted() {
        
            //모든 화면이 렌더링된 후 호출 된다.
    },

    computed:{

        ...mapState({ //store
            rboardDetail:state=>state.rboardDetail,
            rboardAttachment:state=>state.rboardAttachment,

            commentlist:state=>state.qnacomment}),
        
        ...loadUserState(['userData'])
        },

}

</script>

<style scoped>

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
.submenuimage{
    width: 100%;
    height:180px;
    background-color:#F4EEFF;
    text-align: center;
    line-height: 180px;
}

.consult_resume{
  display : flex;
  flex-direction: column;
  justify-content: center;
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
#writecontain > .btn{
  background-color: #424874;
}
.overflow .v-card{
  box-shadow: 0 0 black !important;
  margin-bottom: 12%;
}

</style>
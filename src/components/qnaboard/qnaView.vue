<template>
<b-container fluid>

      <b-row >
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">Q&A</p>
        </div>
      </b-row>

    <!-- 상세페이지 본문 시작 -->
    <div class="container">
        <b-col>
            <b-card class="viewcontainer">
                <b-form>
                    <b-row>
                        <b-col class="qnawriter">{{qnaboard2.qnaWriter}}<br>
                        <p class="qnadate">{{formatDate(qnaboard2.qnaDate)}} 작성</p>
                        <p class="qnareadcount">조회수 ({{qnaboard2.boardCount}})</p>
                        <hr>
                        </b-col>
                    </b-row>

                    <h6 class="qnatitleno">NO. {{qnaboard2.qboardNo}}</h6>
                    <b-row> 
                        <b-col class="qnatitle">
                            <br><b>{{qnaboard2.qnaTitle}} </b>
                            <v-icon v-if="qnaboard2.commentCount >0" class="icon">mdi-message-text</v-icon>
                            <small v-if="qnaboard2.commentCount >0"> ({{qnaboard2.commentCount}})</small>
                        </b-col>
                    </b-row>
                        <hr>


                    <!-- 이미지 -->
                    <!-- max-width="350px" -->
                    <!-- <v-img
                    class="white--text align-end siteimg"
                    max-height="800px"
                    max-width="800px"
                    :src="`http://localhost:8082/itjobgo/qna/selectImg${attachment.qboardNo}`"
                    >
                    <v-card-title></v-card-title>
                    </v-img> -->

                    <b-row>
                        <b-col class="qnacontent">{{qnaboard2.qnaContent}}</b-col>                
                    </b-row> 
                        <br><hr>
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
                    <b-button v-if="userData.memberSq===qnaboard2.memberNum"
                        class="btn_center" @click="updateqna">수정</b-button>
                    <b-button v-if="userData.memberSq===qnaboard2.memberNum||userData.memberEmail==='admin@kh.com'"
                        class="btn_center" @click="deleteqna">삭제</b-button>
                </b-col>
            </b-row>

    </div>

    <!-- 댓글창 -->
    <b-container>
    <b-row v-for="comment in commentlist" :key="comment.id">
        <b-col>
          <b-card class="text-center">
            <b-row><b-col class="memberName" cols="2">{{comment.memberName}}
            <br><small>{{comment.qbcommentDate | moment('YYYY.MM.DD HH:mm:ss')}}</small>
            </b-col>
            <!-- 쓴사람과 아닐떄는 일반 댓글로 보여주지않기 -->
            <b-col class="contentcm" v-if="comment.memberSq!=userData.memberSq">{{comment.qbCommentContent}}</b-col>
            <!-- 자기 댓글은 수정할수있는 input 박스로 보여주기 -->
            <b-form v-if="userData.memberSq!=null && comment.memberSq==userData.memberSq">

              <b-col>
                <b-row>
                  <b-col>
                    <b-form-textarea :disabled="commentcheck" :value="comment.qbCommentContent" 
                    @input="updateInput" id="commentUptxt"/>
                  </b-col>
                        <template v-if="comment.memberSq==userData.memberSq">
                            <b-col class="btndiv_comment">
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

   <!-- 댓글 테스트 :  {{commentlist}} -->
</b-container>
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
                updateqna(){
            //alert("수정버튼")
            //수정도 router.js에 등록됨. name값을 이용해서 페이지 전환
                    let no=this.$route.params.id
                console.log("수정버튼(params) :"+ no);
            // console.log("글번호 :  : " + communityBoardNo)
                this.$router.push({name:'qnaModify',params:{id:no}})
            },

            // 삭제버튼~
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
            qbattachmentdown(attachment){
            location.href="http://localhost:8082/itjobgo/qna/qnafiledownload?oriName="+attachment.originalfilename+"&reName="+attachment.renamedfilename;
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
        const qnaboardNo=this.$route.params.id;
        this.$store.dispatch("FETCH_QNABOARD_VIEW",qnaboardNo)
        this.$store.dispatch("FETCH_QNABOARD_ATTACHMENT",qnaboardNo)
        this.$store.dispatch("FETCH_QNABOARD_COMMENT",this.$route.params.id);
    },

    mounted() {
        
            //모든 화면이 렌더링된 후 호출 된다.
    },

    computed:{

        ...mapState({ //store
            qnaboard2:state=>state.qnaboard2,
            attachment:state=>state.qbAttachment2,
            commentlist:state=>state.qnacomment}),
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
    margin-top: -75px;
    margin-left: 65px;
    font-size: 22px;
}
.qnatitleno{
    color:rgb(92, 92, 92);
    margin-top: -10px;
}
.qnacontent{
    margin-left: 2%;
    margin-top: 2%;
    margin-bottom: 20%;
    
}
.qnawriter{
    font-size: 18px;
}
.qnadate{
    font-size: 15px;
    margin-top: 5px;
    color: grey;   
}
.qnareadcount{
    font-size: 15px;
    color: grey;   
    margin-top: -3.6%;
    margin-left: 92%;
}
.qnaphoto{
    margin-bottom: 2%;
    font-size: 16px;
    color: rgb(75, 75, 75);   
}
.qnaphotofile{
    margin-left: -85%;
    width: 150px;
}
.viewcontainer{
    margin-top: 5%;
    margin-bottom: 5%;
    width: 100%;
}
.btndiv{
    margin-left: 42%;
    margin-bottom: 1%;
}
.submenuimage{
    width: 100%;
    height:180px;
    background-color:#F4EEFF;
    text-align: center;
    line-height: 180px;
}
.subtitle{
  font-family: 'Barlow Semi Condensed', sans-serif;
  color:#4e5157 ;
  font-size: 50px;
}
#deltet-btn{
    margin-left: 3%;
    margin-right: 2%;
}
.btndiv_comment{
   width: 220px;
}
#commentUptxt{
    width: 620px;
    height: 100px;
}
.memberName{
    text-align: left;
    font-size: 17px;
    margin-left: 1%;
    margin-top: 1%;
    color:rgb(59, 59, 59);
}
.icon{
    margin-left: 1.5%;
}
.contentcm{
    border-left: 1px rgb(212, 208, 208) solid;
    padding-left: 25px;
    margin-top: 1%;
    margin-left: 1%;
    text-align: left;
}

</style>
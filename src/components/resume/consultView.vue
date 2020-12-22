<template>
 <div class="consult_resume">
  <body>
    <div class="container-fluid">
      <div class="submenuimage">
          <p class="subtitle">입사지원서 컨설팅</p>
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
                    <br>{{comment.rboardCommentDate | moment('YYYY.MM.DD HH:mm:ss')}}
                    </b-col>
                    <!-- 쓴사람과 아닐떄는 일반 댓글로 보여주지않기 -->
                    <b-col v-if="comment.memberSq!=userData.memberSq">{{comment.rboardCommentContent}}</b-col>
                    <!-- 자기 댓글은 수정할수있는 input 박스로 보여주기 -->
                    <b-form v-if="userData.memberSq!=null && comment.memberSq==userData.memberSq">

                    <b-col>
                        <b-row>
                        <b-col>
                            <b-form-textarea :disabled="commentcheck" :value="comment.rboardCommentContent" 
                            @input="updateInput" id="commentUptxt"/>
                        </b-col>
                                <template v-if="comment.memberSq==userData.memberSq">
                                    <b-col>
                                    <b-button v-if="userData.memberSq===comment.memberSq"
                                        @click="upclick($event)"  id="update-btn">수정</b-button> 
                                    <b-button v-if="userData.memberSq===comment.memberSq || userData.memberEmail === 'admin@kh.com'"
                                        @click="declick(comment.rboardCommentno)" id="deltet-btn">삭제</b-button> 
                                    <b-button 
                                        @click="upendclick(comment.rboardCommentno,$event)" id="updateEnd-btn">확인</b-button> 
                                    </b-col>
                                </template>
                            </b-row>
                        </b-col>
                    </b-form>
                    </b-row></b-card></b-col>
                </b-row>
        <!-- 댓글쓰기 -->
            <b-form v-if="userData.memberSq!=null">
                <b-row v-if="userData.memberEmail === 'admin@kh.com' || userData.memberSq===rboardDetail.rboardId || userData.memberLevel==2">
                <b-col>
                    <b-card class="text-center">
                    <b-row>
                        <b-col><b-form-textarea rows="8" ref="comment"
                                v-model="rboardComment" placeholder="댓글을 남겨보세요" /></b-col>
                        <b-col cols="1"><b-button
                                @click="comment" id="comment_insert_btn">등록</b-button></b-col>
                    </b-row>
                    </b-card></b-col>
                </b-row>
                <b-row v-else> 
                    <p class="p1">이력서 컨설팅 전문가, 작성자, 관리자만 댓글 작성이 가능합니다.</p>
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
            rboardNo:0,
            rboardComment:'',
            commentModal:false,
            commentcheck:true,
            changeval:'',
            boolcheck:false,
            updatetext:'',
        }
    },

    // watch:{
    //   commentlist:{
    //     handler(newValue){
    //       this.changeval=newValue[0].rboardCommentContent;
    //     },deep:true,
    //   }
    // },

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
                //console.log("수정버튼(params) :"+ no);
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
                let formData2=new FormData(); 
                  formData2.append('rboardNo',this.rboardDetail.rboardNo);
                  formData2.append('rboardCommentContent',this.rboardComment);
                  formData2.append('memberSq',this.userData.memberSq);
                  formData2.append('memberName',this.userData.memberName)
                    // for(let key of formData2.entries()){
                    //   console.log(`${key}`); 
                    // }
            axios.post("http://localhost:8082/itjobgo/resume/insertRboardComment",formData2)
            .then((data)=>{
                console.log(data)
                this.rboardComment=""
                this.$store.dispatch("FETCH_RBOARD_COMMENT",this.$route.params.id);
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
                const rboardCommentNo=commentno;
                this.$store.dispatch("FETCH_RBOARD_COMMENTDEL",rboardCommentNo).then(()=>{
                    this.$store.dispatch("FETCH_RBOARD_COMMENT",this.$route.params.id);
                })

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
            const rbno=commentno
                e.target.parentElement.parentElement.children[0].children[0].disabled = true;
                if(this.updatetext=='') this.updatetext = e.target.parentElement.parentElement.children[0].children[0].value
            axios.post("http://localhost:8082/itjobgo/resume/updateRboardComment",{rboardCommentContent:this.updatetext,rboardCommentno:rbno})
            .then((data)=>{
                console.log(data)
                    // this.commentcheck=true;
                this.$store.dispatch("FETCH_RBOARD_COMMENT",this.$route.params.id);
                this.updatetext='';
            })
            },
 

    },

    created(){
        const rboardNo=this.$route.params.id;
        this.$store.dispatch("FETCH_RBOARD_VIEW", rboardNo)
        this.$store.dispatch("FETCH_RBOARD_ATTACHMENT", rboardNo)
        this.$store.dispatch("FETCH_RBOARD_COMMENT",rboardNo);
    },

    mounted() {
        
            //모든 화면이 렌더링된 후 호출 된다.
    },

    computed:{

        ...mapState({ //store
            rboardDetail:state=>state.rboardDetail,
            rboardAttachment:state=>state.rboardAttachment,
            commentlist:state=>state.rboardComment}),
        
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
.submenuimage {
  background-image: url("../../assets/images/resume.jpeg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}

.consult_resume{
  display : flex;
  flex-direction: column;
  justify-content: center;
}

.subtitle {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
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

.p1{
    color : red;
    font-weight: bold;
    margin-left: 30%;
}


* {
  font-family: "Noto Sans KR", sans-serif;
}

#nameAndDate{
  /* position: absolute; */
  position: relative;
  left:10px;
  top:0px;
  margin:-15px;
}

#profileImage{
  position:absolute;
  top:-15px;
  left:20px;
  height: 70px;
  width:70px;
  border-radius: 70px;
  border:none;
}
#commentUptxt{
  width:800px;
  height:150px;

}
#update-btn{
  background-color: #424874;
  height:40px;
  width:70px;
  position: relative;
  top:107px;
   border:none
}
#update-btn2{
  background-color: #424874;
  height:40px;
  width:70px;
  position: relative;
  top:30px;
   border:none
}
#updateEnd-btn{
    background-color: #394867;
  height:40px;
  width:70px;
  position: relative;
  top:107px;
  border:none
}

#deltet-btn{
  background-color:#9BA4B4;
  height:40px;
  width:70px;
  position: relative;
  top:107px;
   border:none

}

#link_a{
  font-weight: bold;
  background-color: #4e5157;
  border:none;
  position: relative;
  left :-470px;
  width:100px;
  height: 50px;
}

#comment_insert_btn{
  background-color: #424874;
  border:none;
  width:70px;
  height: 40px;
  position: relative;
  top:163px;
  left:-20px;
}

#modal-yes{
  background-color: #424874;
  width:100px;
  position: relative;
  left:50px;
  border:none;
}

#modal-no{
  background-color: #9BA4B4;
  width:100px;
  position: relative;
  left:-50px;
  border:none;
}


#content {
  /* background-color: #E6E6FA; */
  /* padding:10px; */
  overflow: auto;
  white-space: pre-wrap;
  text-align: left;
}

#textarea-test{
  height:100%;
}


#update-btn{
background-color: #424874;
border: none;
}
#delete-btn2{
background-color: #9BA4B4;
  height:40px;
  width:70px;
  position: relative;
  top:30px;
   border:none;

}

#prev{
 position: relative;
 left: -393px;
 /* background-color: red; */
}

#next{
 position: relative;
 left: -392px;
 /* background-color: red; */
}

#list{
 position: relative;
  padding-top:10px;
 left: 460px;
 height: 45px;
 width: 80px;
 align-items: center;
 font-size: 17px;
 border:none;
 font-weight: bold;
background-color: #4975cc;
}


#attachment-btn{
  background-color: rgb(16, 172, 99);
  border: none;
  position: absolute;
  left:0px;
  /* width:100px; */
}

#attachment-title{
  text-align: left;
  font-weight: bold;
}
#attachment{
  /* border: 1px red solid; */
  position: relative;
  left:-174px;
  top:25px;
}

#writer{
  /* border : 1px blue solid; */
    font-size: 15px;
  margin-top: -27px;
    text-align: right;
}


#boardDate{
  text-align: left;
    /* border: 1px red solid; */
  /* margin-top: -10px; */
  font-size: 15px;
  margin-top: -27px;
  font-size:6px;
  position: relative;
}

#title{
  text-align: left;
  /* border: 1px red solid; */
  font-weight: bolder;
  font-size:18px;
  margin-bottom: 10px;
}
#text-card{
  /* border: 1px solid blue; */
  border:none;
  /* width: 1000px; */
  /* height: 1000px; */
  /* position: relative; */
  /* left : 200px; */
}

#date{
    text-align: right;
    /* margin-top: 100px; */
    position: relative;
    right:150px;
}


#selected{
  width:100px;
}
.submenuimage{
    width: 100%;
    height:180px;
    background-color:#F4EEFF;
    text-align: center;
    line-height: 180px;
}


#my-table{
  text-align: center;
}

#main-container{
  margin-top: 0px;
  /* padding-top: -100px; */
}

#header-image{
  width:100%;
}
.table_ect{
  margin-bottom:20px;
  margin-left: 20px;
  margin-right: 50px;
  margin-top: 10px;
}
.sidebar{
  margin-top: 30px;
}
.st_search{
  float: right;
}
.st_pagebar{
  margin-top: 3%;
    position:absolute;
    left:40%;
}
.sub-header{
  margin-left: 25px;
  margin-top: 25px;
}
.st_nav4{
  margin-left: 10px;
  position: relative;
}
#st_write2{
  position: relative;
  top: 0px;
  left: -100px;
  margin-right: 3.5%;
  background-color: #424874;
  border:none;
  color:white;
  width:90px;
}

#st_write3{
  position: relative;
  top: 0px;
  left: -135px;
  margin-right: 3.5%;
  background-color: #9BA4B4;
  border:none;
  color:white;
  width:90px;
}

#list-btn{
  width:100px;
  color:white;
  position: relative;
  left:0px;
}

.detail_{
    margin-top:6%;
    margin-right: 2%;
}
.detail_write{
    height: 400px;
}
.detail_top{
    margin-left: 12px;
}
.detail_btn{
    margin-left: 10px;
}
.detail_btn_div{
    text-align: center;
    margin-top: 3%;
}
#detailbtn1{
  background-color:  #424874;
  border: 1px  #424874 solid;
}

.submenuimage{
  width: 100%;
  height:180px;
  background-color:#F4EEFF;
  text-align: center;
  line-height: 180px; 
}
#writecontain{
  margin-bottom: 10%;
  
}
.modalf{
  display: flex;
  justify-content: space-around;
}
</style>
<template>
<b-container fluid>
      <b-row >
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">ItNewsInfo</p>
      </div>
        <!-- 탭 -->   
        <div class="container">
          <!-- <v-tabs
          centered
          color="grey darken-3"
          >
            <v-tab to="/noticeList"><b>공지사항</b></v-tab>
            <v-tab to="/itNewsList"><b>IT소식</b></v-tab>
            <v-tab to="/communityBoardList" ><b>자유게시판</b></v-tab>
            <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs> -->
        </div>
      </b-row>
      <b-row>
        <b-col><b-card class="text-center" id="text-card">

    <b-container>
      <b-form>
        <b-row>
   
          <b-col id="title"> 제목: {{itNewsView.newsTitle}}</b-col>
        </b-row>
        <b-row>
          <b-col id="boardDate"> 작성일 : {{formatDate(itNewsView.newsDate)}}</b-col>
          <br>

          <!-- 뉴스기사 바로가기 -->
          <!-- <a href="" v-on:click.stop.prevent="openWindow(itNewsView.newsRefSite)" id="link_a">링크 바로가기</a> -->
          <!-- <b-button  v-on:click.stop.prevent="openWindow(itNewsView.newsRefSite)" id="link_a">바로 보기</b-button> -->
        <!-- 이미지 -->
          <!-- max-width="350px" -->
        <div class="container">
        <v-img
          class="white--text align-end"
          id="images"

          :src="`http://localhost:8082/itjobgo/itnews/imagesrequest${itNewsView.newsSq}`"
        >
        </v-img>
        </div>

        </b-row>
      

          <b-row>
          <b-col > <pre id="content">{{itNewsView.newsContent}}</pre></b-col>
        </b-row>

        <!-- <b-row v-if="attachment">
          <b-col cols="2" id="attachment-title"><b-form-group  label="첨부된 파일" readonly/></b-col>
          <b-col cols="2" id="attachment"><b-button id="attachment-btn" @click="attachmentdown(attachment)">{{attachment.originalfilename}}</b-button></b-col>
        </b-row> -->
      </b-form>
    </b-container>
        
          <b-row >
            <b-col>
              <b-button  v-if="userData.memberSq===itNewsView.memberNum"
                                                                               @click="update" id="update-btn2">수정</b-button>
              <b-button   v-if="userData.memberSq===itNewsView.memberNum || userData.memberEmail === 'admin@kh.com'" 
                                                                                @click="pdelete" id="delete-btn2">삭제</b-button>
            </b-col>
          </b-row>

      <b-row id=" writecontain" align-h="end">
        <b-col>
          <!-- <b-button to="/communityBoardList" id="prev">이전 </b-button>
          <b-button to="/communityBoardList" id="next">다음 </b-button> -->
            <b-button  v-on:click.stop.prevent="openWindow(itNewsView.newsRefSite)" id="link_a">기사 원문</b-button>
          <b-button to="/itNewsList" id="list">목록 </b-button>
          
        </b-col>
      </b-row>
      
            </b-card></b-col>
      </b-row>

<!-- 댓글 영역 -->
   <b-container>
      <b-row v-for="comment in commentlist" :key="comment.id">
        <b-col>
          <b-card class="text-center">
            
            <b-row>

              
              <b-col cols="2" id="nameAndDate2">{{comment.memberName}}
            <br>{{comment.itCommentDate | moment('YYYY.MM.DD HH:mm:ss')}}
            </b-col> 
            <!-- 쓴사람과 아닐떄는 일반 댓글로 보여주지않기 -->
            <b-col v-if="comment.memberSq!=userData.memberSq">{{comment.itCommentContent}}</b-col>
            
            <!-- 자기 댓글은 수정할수있는 input 박스로 보여주기 -->
            <b-form v-if="userData.memberSq!=null && comment.memberSq==userData.memberSq">
       
              <b-col>
                <b-row>
                  <b-col>
                    <b-form-textarea :disabled="commentcheck" :value="comment.itCommentContent" @input="updateInput" id="commentUptxt"/>
                  </b-col>
            
      
                  <template v-if="comment.memberSq==userData.memberSq">
                  
                      <b-col>
                      <b-button v-if="userData.memberSq===comment.memberSq"
                                                                                                @click="upclick($event)"  id="update-btn">수정</b-button> 
                      <b-button v-if="userData.memberSq===comment.memberSq || userData.memberEmail === 'admin@kh.com'"
                                                                                                @click="declick(comment.itCommentNo)" id="deltet-btn">삭제</b-button> 
                      <b-button 
                                                                                                @click="upendclick(comment.itCommentNo,$event)" id="updateEnd-btn">확인</b-button> 
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
                <b-col><b-form-textarea rows="8" ref="comment" v-model="ITcomment" placeholder="댓글을 남겨보세요" /></b-col>
                 <b-col cols="1"><b-button @click="comment" id="comment_insert_btn">등록</b-button></b-col>
              </b-row>
            </b-card></b-col></b-row></b-form>

      </b-container>

<!-- 게시판 삭제 모달 -->
  <ModalView v-if="showModal" @close="showModal = false">
    <template>
      <div slot="header">
        정말 게시판 글을 삭제하시겠습니까?
      </div>
      <div slot="body" class="modalf"> 
        <b-button id="modal-yes" @click="ydele">네</b-button>
         <b-button id="modal-no" @click="ndele">아니오</b-button>
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

var moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

export default {
    data(){
        return {
            showModal:false,
            pboardno:0,
            ITcomment:'',
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
          this.changeval=newValue[0].cbCommentContent;
        },deep:true,
      }
    },
    components:{
      ModalView,
    },
    methods: {

    // 날짜변환 함수
      formatDate(value) {
        // console.log(value);
        return this.$moment(value).format('YYYY년 MM월 DD일');
      },
      openWindow: function (link) {
       window.open(link);
      },      
    
      update(){
        // 수정버튼 눌렸을때 처리하는 로직
        // 새로운 수정 컴포넌트로 이동
        let no=this.$route.params.id
        this.$router.push({name:'ItNewsUpdate',params:{id:no}})

      },

      updateInput(event){
      this.updatetext=event;
      },


      pdelete(){
          this.showModal=!this.showModal;
      },

      ydele(){
        let no=this.$route.params.id
         this.$store.dispatch("FETCH_ITNEWS_DELETE",no)
         this.$router.push({name:'ItNewsList'})
        
        
      },
      comment(){
        let formData2=new FormData();

        formData2.append('itnewsNo',this.itNewsView.newsSq);
        formData2.append('itCommentContent',this.ITcomment);
        formData2.append('memberSq',this.userData.memberSq);
        formData2.append('memberName',this.userData.memberName)

      axios.post("http://localhost:8082/itjobgo/itnews/insertComment",formData2)
      .then((data)=>{
        console.log(data)
        this.ITcomment="",
        this.$store.dispatch("FETCH_ITNEWS_COMMENT_LIST",this.$route.params.id);
      
      })
     
      .catch((error)=>
        console.log(error))
     
      },

      //게시판 삭제 모달 취소
      ndele(){
        this.showModal=!this.showModal;
      },
      //코멘트 모달 취소
      cancleModal(){
        this.commentModal=!this.commentModal;
        
      // },
      //첨부파일 다운로드 
      // attachmentdown(attachment){
      //   location.href="http://localhost:8082/itjobgo/community/filedownload?oriName="+attachment.originalfilename+"&reName="+attachment.renamedfilename;
      },
      //댓글삭제
      declick(commentno){
        let delfirm=confirm("댓글을 삭제 하시겠습니까?")
        if(delfirm){
          const cno=commentno;
        this.$store.dispatch("FETCH_ITNEWS_COMMENT_DELETE",cno).then(()=>{
             this.$store.dispatch("FETCH_ITNEWS_COMMENT_LIST",this.$route.params.id);
        })
        }
      },
    //   //댓글수정
    //   handleInput: function (event) {
    //   // 할당 전에 어떤 처리하기
    //   this.comment.cbCommentContent = event.target.value;
    //   this.updateComment=this.comment.cbCommentContent;

    // },
    
      //댓글수정
      // 할당 전에 어떤 처리하기
      handleInput: function (event) {
      this.comment.ntCommentContent = event.target.value;
      this.updateComment=this.comment.ntCommentContent;

    },

      upclick(e){
        console.log(e)
       if(e.target.parentElement.parentElement.children[0].children[0].disabled==true){
         e.target.parentElement.parentElement.children[0].children[0].disabled = false
       }else e.target.parentElement.parentElement.children[0].children[0].disabled = true
       
        console.log()//
       this.commentcheck=false;
      },

      upendclick(commentno,e){
       const ccno=commentno
         e.target.parentElement.parentElement.children[0].children[0].disabled = true;
        if(this.updatetext=='') this.updatetext = e.target.parentElement.parentElement.children[0].children[0].value
       axios.post("http://localhost:8082/itjobgo/itnews/updateComment",{itCommentContent:this.updatetext,itCommentNo:ccno})
       .then((data)=>{
        console.log(data)
            // this.commentcheck=true;
           this.$store.dispatch("FETCH_ITNEWS_COMMENT_LIST",this.$route.params.id);
           this.updatetext='';
       })
      },
      

    }, //method
    created() {
          if (this.userData.memberSq != undefined) {
      axios
        .get(
          "http://localhost:8082/itjobgo/member/loadPhoto?memberSq=" +
            this.userData.memberSq,
          { responseType: "arraybuffer" }
        )
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));

          this.previewImage = url;
        });
    }
        const newsSq=this.$route.params.id;
        this.$store.dispatch("FETCH_ITNEWS_VIEW",newsSq)
        // this.$store.dispatch("FETCH_COMMUNITYBOARD_ATTACHMENT",newsSq)
        this.$store.dispatch("FETCH_ITNEWS_COMMENT_LIST",this.$route.params.id);
        
    },
    computed: {
     
        ...mapState({
            itNewsView:state=>state.itNewsView,
            // attachment:state=>state.cbAttachment2,        
            commentlist:state=>state.ITcomment    
        }),
         ...loadUserState(['userData'])
      
       
        
    }
    

}
    

</script>

<style scoped>
/* @import '../../assets/css/BoardView.css'; */

@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@1,600&display=swap');
#nameAndDate2{
  /* position: absolute; */
  position: relative;
  left:15px;
  margin:-15px;

}

#profileImage2{
  position:absolute;
  top:10px;
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
  height:50px;
  width:70px;
  position: relative;
  top:100px;
   border:none
}
#update-btn2{
  background-color: #424874;
  height:50px;
  width:70px;
  position: relative;
  top:30px;
   border:none
}
#updateEnd-btn{
    background-color: #394867;
  height:50px;
  width:70px;
  position: relative;
  top:100px;
  border:none
}

#deltet-btn{
  background-color:#9BA4B4;
  height:50px;
  width:70px;
  position: relative;
  top:100px;
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
  height: 50px;
  position: relative;
  top:147px;
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
  height:50px;
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
 left: 460px;
 height: 50px;
 width: 80px;
 align-items: center;
 font-size: 19px;
 border:none;
 font-weight: bold;
 padding-top:10px;
 /* margin-top: 10px; */
background-color: #4975cc;
}


#attachment-btn{
  background-color: orange;
  border: none;
  position: relative;
  left:-25px;
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
#subtitle{
font-family: 'Barlow Semi Condensed', sans-serif;
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
.subtitle{
    font-family: 'Masque';
    color:#4e5157 ;
    font-size: 50px;
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

#images{
   height: auto; 
    width: auto; 
    object-fit:cover;
    max-width: 500px; 
    max-height: 700px;
    
}


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
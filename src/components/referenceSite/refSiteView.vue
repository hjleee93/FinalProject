<template>

<b-container fluid>
  
      <!-- 메인 이미지 -->
      <b-row>
          <div class="submenuimage">
             <p class="subtitle">Reference</p>
          </div>
      </b-row>
              
        <div class="container">          

          <!-- <div>
            <h4 class="sub-header-ref">분야별 웹 사이트</h4>
            <v-btn to="/refWrite" exact  id="st_write_ref">글쓰기</v-btn>
          </div> -->

    <div class="overflow-auto">

    <div class="site_ect">
    <!-- /.row -->
    <div class="row card-align">
    <!-- card -->

      <b-form>
        <b-row>
          {{userData}}
          <b-col id="title"> 제목: {{refListView.refTitle}}</b-col>
        </b-row>
        <b-row>
          <b-col id="boardDate"> 날짜: {{formatDate(refListView.refDate)}}</b-col>

          <!-- 링크 바로가기 -->
          <a href="" v-on:click.stop.prevent="openWindow(refListView.refSiteAddr)" id="link_a">링크 이동</a>
          
        <!-- 이미지 -->
          <!-- max-width="350px" -->
        <v-img
          class="white--text align-end"
          height="250px"
          :src="`http://localhost:8082/itjobgo/ref/selectsiteImg${refListView.refNo}`"
        
        >
        <v-card-title></v-card-title>
        </v-img>

        </b-row>
        <b-row>
        </b-row>

          <b-row>
          <b-col > <pre id="content">{{refListView.refContent}}</pre></b-col>
        </b-row>

        <!-- <b-row v-if="attachment">
          <b-col cols="2" id="attachment-title"><b-form-group  label="첨부된 파일" readonly/></b-col>
          <b-col cols="2" id="attachment"><b-button id="attachment-btn" @click="attachmentdown(attachment)">{{attachment.originalfilename}}</b-button></b-col>
        </b-row> -->
      </b-form>

      <form @submit.prevent="updateStatus" enctype="multipart/form-data">     
          <b-row >
            <b-col>
              <b-button  v-if="userData.memberSq===refListView.memberNum"
                        @click="update" id="update-btn2">수정</b-button>
              <b-button   v-if="userData.memberSq===refListView.memberNum || userData.memberEmail === 'admin@kh.com'" 
                        @click="pdelete" id="delete-btn2">삭제</b-button>
              <b-button v-if="userData.memberEmail==='admin@kh.com' && refListView.status === 'N'"
                        type="submit" exact id="status-btn2">사이트 승인</b-button>
            </b-col>
          </b-row>
      </form>

      <b-row id=" writecontain" align-h="end">
        <b-col>
          <b-button to="/refSite" id="list">목록 </b-button>
        </b-col>
      </b-row>
      


          </div>
        </div>
      </div>
    </div>

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
// import axios from 'axios';
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

import axios from 'axios';

import Vue from 'vue'
import vueMoment from 'vue-moment';
Vue.use(vueMoment);

// var moment = require('moment');
// require('moment-timezone'); 
// moment.tz.setDefault("Asia/Seoul"); 

  export default {
    
    data() {
      return {
        showModal:false,
        perPage: 4,
        currentPage: 1,
      }
    },

    components:{
      ModalView,
    },

    
    methods: {

        //관리자 승인처리 STATUS 'N'->'Y'
        updateStatus(){
        let formData=new FormData(); 
        formData.append('refNo',this.refListView.refNo);
      
      axios.post("http://localhost:8082/itjobgo/ref/refStatus",formData)

        .then((data)=>console.log(data))
        .catch((error)=>
        console.log(error))
        console.log(formData);
        //저장완료, 화면전환 이동!
        this.$router.push({name:'refSiteStatus'})
      },


      update(){
        // 수정버튼 눌렸을때 처리하는 로직
        // 새로운 수정 컴포넌트로 이동
        let no=this.$route.params.id
        this.$router.push({name:'refUpdate',params:{id:no}})

      },

      //링크 새로 열기
      openWindow: function (link) {
       window.open(link);
      },

        // 날짜변환 함수
    formatDate(value) {
      // console.log(value);
      return this.$moment(value).format("YYYY-MM-DD");
    },

      //글삭제, 모달
      pdelete(){
          this.showModal=!this.showModal;
      },
      ydele(){
        let no=this.$route.params.id
         this.$store.dispatch("FETCH_REF_DELETE",no)
         this.$router.push({name:'refSite'})
      
      },


    },

    created() {      
        const refNo=this.$route.params.id;
        this.$store.dispatch("FETCH_REF_VIEW",refNo)
        //this.$store.dispatch("FETCH_REF_ATTACHMENT",refNo)
    },


    computed:{
      ...mapState({
            refListView:state=>state.refListView,
            refAttachment:state=>state.refAttachment,  
        }),
         ...loadUserState(['userData'])
    },





}
</script>



<style scoped >
* {
   font-family: 'Nanum Gothic', sans-serif;
}
.site_ect{
  margin-bottom:20px;
  margin-left: 20px;
  margin-right: 50px;
  margin-top: 20px;
}
.sub-header-ref{
  position: relative;
  left:18px;
  top:70px;
  margin-bottom: 3%;
}
#st_write_ref{
  left:990px;
  position: relative;
  top: 5px;
  background-color: #424874;
  border:none;
  color:white;
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
#status-btn2{
  margin-left: 2%;
}
</style>
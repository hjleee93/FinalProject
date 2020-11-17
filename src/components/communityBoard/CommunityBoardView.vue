<template>

  <body>
    <div class="container-fluid">
    <div class="row">
        <!-- <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"> -->
          <!-- 메인 이미지 -->
              <div class="submenuimage ">
                  <p class="subtitle" id="subtitle">Community</p>
              </div>

      <!-- 탭 -->   
        <div class="container">
        <v-tabs
        centered
        color="grey darken-3"
        >
          <v-tab to="/noticeList"><b>공지사항</b></v-tab>
          <v-tab to="/itNewsList"><b>IT소식</b></v-tab>
          <v-tab to="/communityBoardList"><b>자유게시판</b></v-tab>
          <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
        </v-tabs>

          <h2 class="sub-header">{{communityboardView.boardTitle}}</h2>
          <br>

          <div align="right">
              <b-button @click="updateBoard" id="st_write2">수정하기</b-button>
              <b-button @click="deleteBoard" id="st_write3">삭제하기</b-button>
          </div>  

          <!-- 삭제  modal-->
            <ModalView v-if="showModal" @close="showModal = false">
            <template>
              <div slot="header">
                정말 삭제하시겠습니까?
              </div>

              <div slot="body">
                <b-button @click="yesDelete">
                  삭제하기
                </b-button>
                <b-button @click="noDelete">
                  취소하기
                </b-button>
              </div>

              <div slot="footer"></div>
            </template>
          </ModalView>

          <div class="overflow-auto">
            <div id="content-div">
              
              {{communityboardView.boardContent}}


            <br>
            (임시)게시판 객체 : {{communityboardView}}
   
            </div>
              <div id="date">작성날짜 : {{communityboardView.boardDate}}</div>
            <b-button type="button" id="list-btn" to="/communityBoardList" exact>목록으로</b-button>
        </div>
    </div>
         
</div>

</div>

</body>

</template>

<script>
import { mapState } from 'vuex';
import ModalView from '../common/ModalView.vue';

export default {

    data(){

      return{
        showModal:false,
        communityBoardNo:0,
        
      
      }
    },
    created(){
      const communityBoardNo=this.$route.params.id;
      console.log(communityBoardNo);
      this.$store.dispatch("FETCH_COMMUNITYBOARD_VIEW",communityBoardNo)
    },

    computed:{
      ...mapState({
        communityboardView:state=>state.communityboardView       
      })
    },

    methods:{
      //수정버튼
      updateBoard(){
        alert("수정버튼 눌림")
      },
     //삭제버튼
      deleteBoard(){
         alert("왜안돼")
        this.showModal=!this.showModal;
         
      }, 
      //삭제버튼(네)
      yesDelete(){
        let no=this.$route.params.id;
        console.log(no);
        this.$store.dispatch("FETCH_COMMUNITYBOARD_DELETE",no);
        this.$router.push({name:'CommunityBoardList'});
      },
      //삭제버튼(아니오)
      noDelete(){
        this.showModal=!this.showModal;
      }


    },//methods 끝

    components :{
      ModalView,

    }

  }//export

</script>

<style>
  @import '../../assets/css/BoardView.css';
</style>
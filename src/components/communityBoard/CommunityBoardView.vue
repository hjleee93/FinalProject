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

          <h2 class="sub-header">글제목</h2>
          <br>

          <div align="right">
              <b-button variant="primary" id="st_write2"
              to="/communityBoardUpdate" exact>수정하기</b-button>
          </div>  

          <div class="overflow-auto">
 

            <div id="content-div">
              게시판 정보 : {{communityboardView}}
   
            </div>

        <div id="date">2020-10-20</div>
            <b-button type="button" id="list-btn" to="/communityBoardList" exact>목록으로</b-button>
        </div>
    </div>
         
</div>

</div>

</body>

</template>

<script>
import { mapState } from 'vuex';

  export default {
    date(){
      return{

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
    }





  }//export
</script>

<style>
@import '../../assets/css/BoardView.css';


</style>
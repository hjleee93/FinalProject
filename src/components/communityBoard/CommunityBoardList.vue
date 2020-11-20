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
        
          <h2 class="sub-header">자유게시판(테스트입니다)</h2>
          <br>

        <!-- 버튼 -->
          <v-btn   to="/communityBoardForm" exact  id="st_write">
               글쓰기
           </v-btn>

          <!-- 임시버튼 -->
          <v-btn to="/communityBoardView" exact  id="st_write">
               상세페이지
           </v-btn>

          <div class="overflow-auto">

         <!-- 테이블 -->
        <v-card>
          <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
       
              >
              </v-text-field>
          </v-card-title>

              <v-data-table
                :headers="headers"
                :items=communityboard
                :search="search"
                @click:row="handleClick"
                item-key="name"
              >
              </v-data-table>
        </v-card>
  </div>
      
        </div>
</div>
<!-- <ul>
  <li v-for="com in community " :key="com.id" > {{com.boardContent}}</li>
</ul> -->


<!-- 임시테스트 테이블 -->
    </div>
  </body>
</template>

<script>
import { mapState } from 'vuex';
import vueMoment from 'vue-moment';
import Vue from 'vue'

Vue.use(vueMoment);


  export default {

    created: function(){
      this.$store.dispatch("FETCH_COMMUNITYBOARD")
    // axios
    //           .get(`http://localhost:8082/itjobgo/community/communityBoardList`)
    //          .then(response=>{
    //            this.community=response.data;

    //            console.log(response);
               
    //            })
               //
    // },
    },
    computed:{
        ...mapState({
            communityboard:state=>state.communityboard
        })
    },

      methods: {
    handleClick(value){
      // alert(value.boardSq);
      this.$router.push({name:'CommunityBoardView',params:{id:value.boardSq}});
      console.log(value);
      console.log(value.boardSq);
    
    }
  },

    data() {
      return {
      // community: [],
      // boardDate: communityboardView.boardDate | moment('YYYY-MM-DD') ,
      search: '',
        headers: [
          {
            text: '분류',
            align: 'start',
            filterable: false,
            value: 'boardDivision',
          },
          { text: '제목', value: 'boardTitle' },
          //수정중입니다.
          // { text: '작성날짜', value: '[boardDate | moment("YYYY-MM-DD")]' ,dataType: "Date" },
        ],
        
      }
    },
    
    }


  
</script>

<style>
@import '../../assets/css/BoardList.css';


</style>
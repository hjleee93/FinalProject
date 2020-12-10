<template>

  <body>
    <div class="container-fluid">
      <div class="row">

        <!-- <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"> -->
          <!-- 메인 이미지 -->
              <div class="submenuimage ">
                  <p class="subtitle" id="subtitle">Notice</p>
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
        
          <h2 class="sub-header">자유게시판</h2>
          <br>
        <!-- 버튼 -->
        
       
          <v-btn   to="/noticeForm" exact  id="st_write" v-if="userData.memberSq!=null">
               글쓰기
           </v-btn>
          <div class="overflow-hidden">


         <!-- 테이블 -->
        <v-card>
          <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
          </v-card-title>

              <v-data-table
                :headers="headers"
                :items="noticeList"
                :search="search"
                item-key="noticeSq"
                single-line
                hide-details
              >
                <!-- :server-items-length="communityboard.length" -->
  
 
            <template v-slot:item="props">
              <tr @click="handleClick(props.item.noticeSq)">
                <td class="text-xs-right">{{props.item.noticeSq }}</td>
                <td class="text-xs-right">{{props.item.noticeDivision }}</td>
                <td class="text-xs-right">{{props.item.noticeTitle }}</td>
                <td class="text-xs-right">{{formatDate(props.item.noticeDate)}}</td>
                <td class="text-xs-right">{{props.item.noticeReadCount }}</td>
              </tr>
           </template>

              </v-data-table>

            </v-card>
            <!-- <div>객체(임시) : {{communityboard}}</div>
            <div>날짜 [0] 인덱스 (임시) : {{communityboard[0].boardDate | moment('YYYY-MM-DD')}}</div> -->

          
           </div>
      </div>
</div>

    </div>
  </body>
</template>


<script>
import { mapState } from 'vuex';
import Vue from 'vue'
import vueMoment from 'vue-moment';
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

Vue.use(vueMoment);


  export default {

    created: function(){
      this.$store.dispatch("FETCH_NOTICE")

    },
    computed:{
        ...mapState({
        
            noticeList:state=>state.noticeList,
    
        }),
      ...loadUserState(['userData'])
      
       
        
    },

methods: {
    handleClick(value){
      this.$router.push({name:'NoticeView',params:{id:value}});
      // console.log(this.$moment(value.boardDate).format('YYYY-MM-DD'));

    },
  // 날짜변환 함수
    formatDate(value) {
      // console.log(value);
      return this.$moment(value).format("YYYY-MM-DD");
      
    }
  },//method 끝

    data() {
      return {
      search: '',
        headers: [
          {
            text: '번호',
            align: 'start',
            filterable: false,
            value: 'noticeSq',
          },
          { text: '분류', value: 'noticeDivision'}, 
          { text: '제목', value: 'noticeTitle' },
          { text: '작성날짜', value: 'noticeDate' },
          { text: '조회수', value: 'noticeReadCount'}
          
          
        ],
        
      }
    },
    
    }


  
</script>

<style>
@import '../../assets/css/BoardList.css';

.example::-webkit-scrollbar {
  display: none;
}
</style>
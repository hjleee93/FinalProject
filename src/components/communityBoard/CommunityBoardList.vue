<template>

  <body>
    <div class="container-fluid">
      <!-- <div class="row"> -->

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
        
          <h2 class="sub-header">자유게시판</h2>
          <br>
        <!-- 버튼 -->
        
       
          <v-btn   to="/communityBoardForm" exact  id="st_write">
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
                :items="communityboard"
                :search="search"
                :server-items-length="communityboard.length"
                item-key="boardSq"
                @click:row="handleClick"
              >
              <!-- 수정중 -->
          <!-- <template slot="items" slot-scope="props">
            <tr>
              <td>{{props.item.boardSq}}</td>
              <td class="text-xs-right">{{ formatDate(props.item.boardDate) }}</td>
              <td class="text-xs-right">{{ props.item.boardDivision }}</td>
              <td class="text-xs-right">{{ props.item.boardTitle }}</td>
              <td class="text-xs-right">{{ props.item.boardWriter }}</td>
              <td class="text-xs-right">{{ props.item.boardCount }}</td>
            </tr>
          </template> -->

             <!-- <template slot="items" slot-scope="props">
                <td>{{ formatDate(props.item.boardDate) }}</td>
             </template> -->

                 <!-- <template v-slot:item.boardDate="{ item }">
                      {{ formatDate(item.boardDate) }}
                  </template> -->

              </v-data-table>
            </v-card>
            <div>객체(임시) : {{communityboard}}</div>
            <div>날짜 [0] 인덱스 (임시) : {{communityboard[0].boardDate | moment('YYYY-MM-DD')}}</div>

          
           </div>
      </div>
<!-- </div> -->

    </div>
  </body>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue'
import vueMoment from 'vue-moment';

Vue.use(vueMoment);


  export default {

    created: function(){
      this.$store.dispatch("FETCH_COMMUNITYBOARD")

    },
    computed:{
        ...mapState({
        
            communityboard:state=>state.communityboard,
    
        }),

        
    },

methods: {
    handleClick(value){
      this.$router.push({name:'CommunityBoardView',params:{id:value.boardSq}});
      console.log(this.$moment(value.boardDate).format('YYYY-MM-DD'));

    },
  // 날짜변환 함수
    formatDate(value) {
      console.log(value);
      return this.$moment(value.boardDate).format("YYYY-MM-DD");
      
    },


  //날짜변환 함수 2
  format (date) {
      date = new Date(date)
      const day = `${date.getUTCDate()}`.padStart(2, '0')
      const month = `${date.getUTCMonth() + 1}`.padStart(2, '0')
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
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
            value: 'boardSq',
          },
          { text: '작성날짜', value: 'boardDate' },
          { text: '제목', value: 'boardTitle' },
          { text: '작성자', value : 'boardWriter'}, 
          //수정중입니다.
          // { text: '작성날짜', value: '[boardDate | this.$moment("YYYY-MM-DD")]'},
          { text: '분류', value: 'boardDivision'}, 
          { text: '조회수', value: 'boardCount' }
          
          
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
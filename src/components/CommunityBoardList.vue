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
            ></v-text-field>
        </v-card-title>
          <v-data-table
            :headers="headers"
            :items="tableList"
            :search="search"
          ></v-data-table>
        </v-card>
  </div>
      
        </div>

      </div>

<!-- 임시테스트 테이블 -->
<!-- <div> 여기가 데이터 찍혀야 {{datas.boardContent}}</div> -->
<div>
<ul>
  <li v-for="com in community " :key="com.id" > {{com.boardContent}}</li>
</ul>
  
</div>

<!-- 임시테스트 테이블 -->
    </div>
  </body>
</template>

<script>
import axios from 'axios';
  export default {

    created: function(){
    // using JSONPlaceholder
    const baseURI = 'http://localhost:8082/itjobgo';
    axios.get(`${baseURI}/community/communityBoardList`)
    .then(response=>this.community=response.data);
    },


    //    console.log(response.data);
    //    console.log(response.data[0]);
    //    console.log(response.data[0].boardContent);
    //    console.log(response.data[1].boardContent);
    //   //  console.log(response.data.boardContent);

    //     this.community.boardSq = response.data[0].boardSq;
    //     this.community.boardContent = response.data[0].boardContent;

    // )};
        // console.log(this.community.boardContent);
 
        // this.datas.boardContent=data.data.boardContent;
        // this.datas.boardContent='김주은입니다.';
        
        // console.log(this.datas.boardContent);

      // ).catch((error)=>{
      //   console.log(error);
      // })
    // },

    data() {
      return {
      community: [],
      search: '',
        headers: [
          {
            text: '분류',
            align: 'start',
            filterable: false,
            value: 'category',
          },
          { text: '내용', value: 'content' },
          { text: '작성자', value: 'writer' },
          { text: '작성날짜', value: 'date' },
        ],
        tableList: [

          {
            category: '질문',
            content: '아두이노 어떻게 하나요',
            writer: '김민지',
            date:'2020-10-18'
          },

          {
            category: '홍보',
            content: '지원자 모집합니다 c언어 개발자',
            writer: '김주은',
            date:'2020-12-15'
          },

          {
            category: '요청',
            content: '학습 내용 공유 부탁드려요',
            writer: '김현주',
            date:'2020-05-18'
          },
                    {
            category: '질문',
            content: '아두이노 어떻게 하나요',
            writer: '김민지',
            date:'2020-10-18'
          },

          {
            category: '홍보',
            content: '지원자 모집합니다 c언어 개발자',
            writer: '김주은',
            date:'2020-12-15'
          },

          {
            category: '요청',
            content: '학습 내용 공유 부탁드려요',
            writer: '김현주',
            date:'2020-05-18'
          },
                    {
            category: '질문',
            content: '아두이노 어떻게 하나요',
            writer: '김민지',
            date:'2020-10-18'
          },

          {
            category: '홍보',
            content: '지원자 모집합니다 c언어 개발자',
            writer: '김주은',
            date:'2020-12-15'
          },

          {
            category: '요청',
            content: '학습 내용 공유 부탁드려요',
            writer: '김현주',
            date:'2020-05-18'
          },
                    {
            category: '질문',
            content: '아두이노 어떻게 하나요',
            writer: '김민지',
            date:'2020-10-18'
          },

          {
            category: '홍보',
            content: '지원자 모집합니다 c언어 개발자',
            writer: '김주은',
            date:'2020-12-15'
          },

          {
            category: '요청',
            content: '학습 내용 공유 부탁드려요',
            writer: '김현주',
            date:'2020-05-18'
          },
                    {
            category: '질문',
            content: '아두이노 어떻게 하나요',
            writer: '김민지',
            date:'2020-10-18'
          },

          {
            category: '홍보',
            content: '지원자 모집합니다 c언어 개발자',
            writer: '김주은',
            date:'2020-12-15'
          },

          {
            category: '요청',
            content: '학습 내용 공유 부탁드려요',
            writer: '김현주',
            date:'2020-05-18'
          },
                    {
            category: '질문',
            content: '아두이노 어떻게 하나요',
            writer: '김민지',
            date:'2020-10-18'
          },

          {
            category: '홍보',
            content: '지원자 모집합니다 c언어 개발자',
            writer: '김주은',
            date:'2020-12-15'
          },

          {
            category: '요청',
            content: '학습 내용 공유 부탁드려요',
            writer: '김현주',
            date:'2020-05-18'
          },
        
        ],
      }
    },


  }
</script>

<style>
@import '../assets/css/BoardList.css';


</style>
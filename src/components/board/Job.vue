<template>
  <body>
    <div class="container-fluid">
      <div class="row">
      <!-- <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"> -->
      <!-- 메인 이미지 -->
      <div class="submenuimage ">
        <p class="subtitle" id="subtitle">JOB</p>
      </div>
    <div class="container">     
    <!-- 탭 -->   
    <v-tabs
    centered
    color="grey darken-3"
    >
    <v-tab><b>웹 개발</b></v-tab>
    <v-tab><b>응용프로그램 개발</b></v-tab>
    <v-tab><b>퍼블리싱</b></v-tab>
    <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
  </v-tabs>

    <!-- 게시판시작 -->
    <div>
      <h4 class="sub-header">구인 정보</h4>
      
    </div>

    <div class="overflow">
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
   </div>
  </body>
</template>

<script>
  export default {
    data() {
      return {
      search: '',
        headers: [
          { text: '기업명', value: 'name' },
          { text: '제목', value: 'title' },
          { text: '지원자격', value: 'ability' },
          { text: '근무조건', value: 'Condition' },
          { text: '마감일·등록일', value: 'deadline' },
        ],
        tableList: [
          {
            name: '가나',
            title: '웹개발자 모집',
            ability: '신입/학력 무관',
            Condition:'정규직/서울 강남구/3,600만원~',
            deadline:'~11/16(17일전 등록)'
          },
          {
            name: '파하',
            title: '웹개발자 모집',
            ability: '신입/학력 무관',
            Condition:'정규직/서울 강남구/3,600만원~',
            deadline:'~11/16(17일전 등록)'
          },
          {
            name: '마바',
            title: '백엔드 모집',
            ability: '신입/학력 무관',
            Condition:'정규직/서울 강남구/3,600만원~',
            deadline:'~11/17(17일전 등록)'
          },
               {
            name: '사아',
            title: '웹디자인 모집',
            ability: '신입/학력 무관',
            Condition:'정규직/서울 강남구/3,600만원~',
            deadline:'~11/12(17일전 등록)'
          },
               {
            name: '타카',
            title: '웹개발자 모집',
            ability: '신입/학력 무관',
            Condition:'정규직/서울 강남구/3,600만원~',
            deadline:'~10/11(17일전 등록)'
          },
               {
            name: '자차',
            title: '웹개발자 모집',
            ability: '신입/학력 무관',
            Condition:'정규직/서울 강남구/3,600만원~',
            deadline:'~11/16(17일전 등록)'
          },
        ],
      }
    },
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@1,600&display=swap');
* {
   font-family: 'Nanum Gothic', sans-serif;
}
.overflow .v-card{
  box-shadow: 0 0 black !important;
}
.submenuimage{
    width: 100%;
    height:180px;
    background-color:#F4EEFF;
    text-align: center;
    line-height: 180px;
}
#subtitle{
 font-family: 'Barlow Semi Condensed', sans-serif;
}
.subtitle{
  font-family: 'Masque';
  color:#4e5157 ;
  font-size: 50px;
}
/* 
#st_write{
  position: relative;
  top: 9px;
  left:1080px;
  width:70px;
  margin-bottom: 10px;
  right: -40px;
  margin-right: 3.5%;
  background-color: #424874;
  border:none;
  color:white;
} */
.sub-header{
  position: relative;
  left:-15px;
  top:45px;
}
</style>
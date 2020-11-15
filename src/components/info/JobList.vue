<template>
  <body>
    <div class="container-fluid">
      <div class="row">
      
      <!-- 메인 이미지 -->
      <div class="submenuimage ">
        <p class="subtitle" id="subtitle">구인정보</p>
      </div>
    <div class="container">     
    <!-- 탭 -->   
    <v-tabs
    color="grey darken-3"
    
    >
    <v-tab><b>웹 개발</b></v-tab>
    <v-tab><b>응용프로그램 개발</b></v-tab>
    <v-tab><b>퍼블리싱</b></v-tab>
    <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
  </v-tabs>

    <!-- 게시판시작 -->
    

    <div class="overflow">
    <!-- 테이블 -->
    <v-card>
      <v-card-title class="search-bar">
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
let test = 'minji'
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
            name: test,
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
.overflow .v-card{
  margin-bottom: 50px;
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

.sub-header{
  position: relative;
  padding-top:45px;
  text-align: center;
}
.v-slide-group__content{
 justify-content:center;
}

.search-bar{
  
      width: 30%;
    margin-left: 72%;
}
</style>
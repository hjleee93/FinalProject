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
// let test = 'minji'
var convert = require('xml-js')

  export default {
    data() {
      return {
      search: '',
      
        headers: [
          { text: '기업명', value: this.rcmJson.wantedRoot.wanted.company._text },
          { text: '제목', value: 'title' },
          { text: '지원자격', value: 'ability' },
          { text: '근무조건', value: 'Condition' },
          { text: '마감일·등록일', value: 'deadline' },
        ]
      }
    },
    created () {
      
    this.$http.get('http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=100&occupation=214200|214201|214202|214302|022|023|024|025|056' + this.$route.params.keyword)//추천 채용정보
      .then((response) => {
        var xml = response.data
        var json = convert.xml2json(xml, { compact: true })
        this.rcmJson = JSON.parse(json);            
      })
  
  }
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
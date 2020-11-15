<template>

  
    <div class="container-fluid">
      <div class="row">

        <!-- <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"> -->
          <!-- 메인 이미지 -->
              <div class="submenuimage ">
                  <p class="subtitle" id="subtitle">Q&A</p>
              </div>
              
        <div class="container">
          
    <!-- 탭 -->   
    <v-tabs
    centered
    color="grey darken-3"
    >
      <v-tab><b>category1</b></v-tab>
      <v-tab><b>category2</b></v-tab>
      <v-tab><b>category3</b></v-tab>
      <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
    </v-tabs>

    <!-- 게시판시작 -->
    <div>
      <h4 class="sub-header">질문/답변 게시판</h4>
      <v-btn to="/write_qna" exact  id="st_write">글쓰기</v-btn></div>
    <div class="overflow">
         <!-- 테이블 -->
        <v-card >
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
            :items="qna"
            :search="search"
          ></v-data-table>
        </v-card>
        

  </div>
      
        </div>

      </div>
    </div>
  

</template>

<script>
import axios from 'axios';
  export default {

    created : function(){

      axios
      .get('http://localhost:8082/itjobgo/qna/qnaboardlist')
      .then(Response=>{
        this.qna=Response.data;
        console.log(Response);
      })
    }
    ,
    data() {
      return { 

      qna:[],
      search: '',
        headers: [
          {
            text: '분류',
            align: 'start',
            filterable: false,
            value: 'qnaCategory', //spring vo값 적기
          },
          { text: 'NO', value: 'qnaSeq' },          
          { text: '제목', value: 'qnaTitle' },
          { text: '작성자', value: 'qnaWriter' },
          { text: '내용', value: 'qnaContent' },
          { text: '답변여부', value: 'qnaAnswerYn' },
          { text: '작성일', value: 'qnaDate' },
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
}
.sub-header{
  position: relative;
  left: 10px;
  top:45px;
}

</style>
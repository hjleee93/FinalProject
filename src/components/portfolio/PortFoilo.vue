<template>

  <body>
    <div class="container-fluid">
      <div class="row">
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">portfolio</p>
      </div>
        <div class="container">      
        <br>
        <div>
          <h4 class="sub-header">포트폴리오</h4>
          <v-btn to="/portfolioenroller" exact  id="st_write1">글쓰기</v-btn>
        </div>

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
    </div>
  </body>
</template>

<script>
  export default {
    data() {
      return {
      search: '',
        headers: [
          {
            text: "번호",
            align: 'start',
            filterable: false,
            value: 'num',
          },
          { text: '제목', value: 'title' },
          { text: '작성자', value: 'writer' },
          { text: '답변', value: 'status' },
          { text: '조회수', value: 'count' },
        ],
        tableList: [

          {
            num: 1,
            title:'포폴첨삭부탁드려요',
            writer: 'admin',
            status: '대기',
            count:1
          },

         {
            num: 2,
            title:'포폴첨삭부탁드려요',
            writer: 'admin',
            status: '대기',
            count:1
          },
          {
            num: 3,
            title:'포폴첨삭부탁드려요',
            writer: 'admin',
            status: '대기',
            count:1
          },
          {
            num: 4,
            title:'포폴첨삭부탁드려요',
            writer: 'admin',
            status: '대기',
            count:1
          },
          {
            num:5,
            title:'포폴첨삭부탁드려요',
            writer: 'admin',
            status: '대기',
            count:1
          },
          {
            num: 6,
            title:'포폴첨삭부탁드려요',
            writer:'admin',
            status: '대기',
            count:1
          },
          {
            num: 7,
            title:'포폴첨삭부탁드려요',
            writer: 'admin',
            status: '대기',
            count:1
          },
          {
            num: 8,
            title:'포폴첨삭부탁드려요',
            writer: 'admin',
            status: '대기',
            count:1
          },

        
        ],
      }
    },
  }
</script>

<style>
#subtitle{
font-family: 'Barlow Semi Condensed', sans-serif;
}
.submenuimage{
  width: 100%;
  height:180px;
  background-color:#ffffff;
  text-align: center;
  line-height: 180px; 
}
.subtitle{
  font-family: 'Masque';
  color:#4e5157 ;
  font-size: 50px;
}
#st_write1{
  position: relative;
  top: 0px;
  left:1050px;
  width:70px;
  margin-bottom: 10px;
  right: -40px;
  margin-right: 3.5%;
  background-color: #424874;
  border:none;
  color:white;
}

</style>
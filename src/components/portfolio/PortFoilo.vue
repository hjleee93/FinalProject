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
        <!-- vuetify에 data table에 items를 선언한 배열 변수로 지정해준다 -->
          <v-data-table
            :headers="headers"
            :items="testtable"
            :search="search"
            item-key="name"
            @click:row="handleClick"
          >
          </v-data-table>
        </v-card>
        
        </div>
       </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
      search: '',
        headers: [
          {
            text: "번호",
            align: 'start',
            filterable: false,
            value: 'pboardNo',
          },
          // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다

          { text: '제목', value: 'pboardTitle'},
          { text: '작성자', value: 'pboardWriter'  },
          { text: '답변', value: 'pboardStatus' },
          { text: '조회수', value: 'pboardCount' },
        ],
        // spring에서 데이터를 받을 변수 배열형태를 선언한다

         testtable:[],
      }
    },
    methods: {
      handleClick(value){
        alert('row클릭');
        console.log(value)
      }
    },
    created() {
      //https://www.youtube.com/watch?v=PN8un6a1x1s 참조할수 있는 유튜브 주소
      //라이프사이클의 생성주기를 이용해서 axios를 사용한다 
      //url에는 spring의 매핑주소를 적고 
      //받아오는 데이터를 선언한 배열 변수에 넣어준다 
      axios.get("http://localhost:8082/itjobgo/portfolio/portfolioList.do")
      .then(({data})=>this.testtable=data)
    //    .then(({data})=>{
    //   let test='';
    //   for(test in data){
    //  console.log(data[test]);
    //  this.testtable=data;
    //  console.log(this.testtable);
    //   }
    //     })
    // .then(res=>{
    //   this.testtable=res.data;
    //   console.log(this.testtable);
    // })
                // 내일 물어보는게 좋을듯
      .catch(({error}) =>{
        console.log(error);
      })
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
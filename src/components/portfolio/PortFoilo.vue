<template>

  <body>
    <div class="container-fluid">
      <div class="row">
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">포트폴리오</p>
      </div>
        <div class="container">      
        <br>
      
        <b-row id="writecontain" align-h="end">
           
          <b-button  to="/portfolioenroller" >글쓰기</b-button>
        </b-row>
        
        <div class="overflow-hidden">
         <!-- 테이블 -->
        <v-card class="tableborder">
          
        <v-card-title class="search-bar">
          포트폴리오
           <v-spacer></v-spacer>
            <v-spacer></v-spacer>
             <v-spacer></v-spacer>
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
          class="row-pointer"
            :headers="headers"
            :items=pboard
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
import { mapState } from 'vuex';
//계속 라이브러리를 로딩해야하는 단점이있다 
// import axios from 'axios';

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

          { text: '분류', value: 'pboardDivision'},
          { text: '제목', value: 'pboardTitle'},
          { text: '작성자', value: 'pboardWriter'  },
          { text: '답변', value: 'pboardStatus' },
          { text: '조회수', value: 'pboardCount' },
        ],
        // spring에서 데이터를 받을 변수 배열형태를 선언한다

         
      }
    },
    computed: {
      ...mapState({
        pboard:state=>state.pboard
      })
    },
    
    methods: {
      handleClick(value){
     
        this.$router.push({name:'Portinfo',params:{id:value.pboardNo,number:value.pboardId}})
      },
     
    },
    created() {
      this.$store.dispatch("FETCH_PBOARD")
      
               
     
    },
    
  }
</script>

<style scoped>

* {
  font-family: "Noto Sans KR", sans-serif;
}
.tableborder{
  border: 1px solid black;
}
.submenuimage {
  background-image: url("../../assets/images/code-1839406_1920.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.subtitle {
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
  font-size: 50px;
}
#writecontain{
  margin-bottom: 5%;
}
#writecontain > .btn{
  background-color: #424874;
}
.example::-webkit-scrollbar {
  display: none;
}

.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}


</style>
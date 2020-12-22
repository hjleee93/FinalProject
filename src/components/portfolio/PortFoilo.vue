<template>

  <body>
    <div class="container-fluid">
      <div class="row">
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">portfolio</p>
      </div>
        <div class="container">      
        <br>
      
        <b-row id="writecontain" align-h="between">
             <b-col><b-button to="/portfolioenroller" >글쓰기</b-button> </b-col>
            <b-col><b-button id="modal" to="/portfolioenroller" >글쓰기</b-button></b-col>
        </b-row>
        
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
.submenuimage{
  width: 100%;
  height:180px;
  background-color:#F4EEFF;
  text-align: center;
  line-height: 180px; 
}
.subtitle{
  font-family: 'Masque';
  color:#4e5157 ;
  font-size: 50px;
}
#writecontain{
  margin-bottom: 10%;
}
#writecontain > .btn{
  background-color: #424874;
}
.example::-webkit-scrollbar {
  display: none;
}
.modal{
  margin-left:1000px ;
}
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}

</style>
<template>

  <body>
    <div class="container-fluid">
      <div class="row">
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">portfolio</p>
      </div>
        <div class="container">      
        <br>
        <b-row>
          <b-col>   <h4 class="sub-header">포트폴리오</h4></b-col>
        </b-row>
        <b-row id="writecontain" align-h="end">
           <b-button to="/portfolioenroller" >글쓰기</b-button>
        </b-row>
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
        alert(value.pboardNo);
        this.$router.push({name:'Portinfo',params:{id:value.pboardNo}})
        console.log(value)
      }
    },
    created() {
      this.$store.dispatch("FETCH_PBOARD")
      //https://www.youtube.com/watch?v=PN8un6a1x1s 참조할수 있는 유튜브 주소
      //라이프사이클의 생성주기를 이용해서 axios를 사용한다 
      //url에는 spring의 매핑주소를 적고 
      //받아오는 데이터를 선언한 배열 변수에 넣어준다 
       //console.log(this)

      //리턴값이 하나면 한줄로 {}생략가능하다.
      //화살표함수 사용시 this는 해당 컴포넌트의this를 가지고 올수 있다.
      //화살표함수를 사용안하고 콜백함수를 사용하면 undefind가 나온다
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
#writecontain{
  margin-bottom: 10%;
}
#writecontain > .btn{
  background-color: #424874;
}


</style>
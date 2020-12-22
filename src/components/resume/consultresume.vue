<template>
 <div class="consult_resume">
  <body>
    <div class="container-fluid">
      <div class="submenuimage">
          <p class="subtitle">Consult Resume</p>
      </div>
      <div>
          <v-tabs centered color="grey darken-3">
              <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
              <v-tab to="/resume/resumeList">입사지원서 보기</v-tab>
              <v-tab active to="/resume/consultresume">입사지원서 컨설팅</v-tab>
              <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
              <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs>
      </div>
      <div class="container">      
        <br>
        <!-- 관리자 승인 버튼 -->
        <b-row id="consultApproval" align-h="end">
           <!-- <b-button to="/resume/consultant" v-if="userData.memberEmail==='admin@kh.com'">관리자 승인</b-button> -->
           <b-button to="/resume/consultant" v-if="userData.memberEmail==='admin@kh.com'">관리자 승인</b-button>
        </b-row>
        <br>
        <!-- 글쓰기 버튼  -->
        <b-row id="writecontain" align-h="end">
           <b-button to="/resume/consultresumeenroll" >글쓰기</b-button>
        </b-row>

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
        <!-- vuetify에 data table에 items를 선언한 배열 변수로 지정해준다 -->
          <v-data-table
            :headers="headers"
            :items=rboard
            :search="search"
            item-key="name"
            @click:row="handleClick"
          >
          </v-data-table>
        </v-card>

       </div>
      </div>
    </div>
  </body>
 </div>
</template>

<script>
import { mapState } from 'vuex';
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

  export default {
    data() {
      return {
      search: '',
        headers: [
          {
            text: "번호",
            align: 'start',
            filterable: false,
            value: 'rboardNo',
          },
          // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다

          { text: '제목', value: 'rboardTitle'},
          { text: '작성자', value: 'rboardWriter'  },
          { text: '답변', value: 'rboardStatus' },
          { text: '조회수', value: 'rboardCount' },
        ],
        // spring에서 데이터를 받을 변수 배열형태를 선언한다

         
      }
    },
    computed:{

        ...mapState({ //store
            rboard:state=>state.rboard
            }),
        
        ...loadUserState(['userData'])
    },

    methods: {
      handleClick(value){
     
        this.$router.push({name:'consultView',params:{id:value.rboardNo}})
        console.log(value)
      }
    },
    created() {
      this.$store.dispatch("FETCH_RBOARD")
      
    },
    
  }
</script>


<style scoped>
.consult_resume{
  display : flex;
  flex-direction: column;
  justify-content: center;
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
.overflow .v-card{
  box-shadow: 0 0 black !important;
  margin-bottom: 12%;
}
* {
  font-family: "Noto Sans KR", sans-serif;
}
</style>
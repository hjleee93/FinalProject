<template>
<b-container fluid>

      <b-row >
         <div class="submenuimage ">
        <p class="subtitle">Q&A</p>
        </div>
      </b-row>

    <div class="container">
    
    <!-- 탭 -->   
    <v-tabs
    centered
    color="grey darken-3"
    >
      <v-tab to='/qnaBoard'><b>ALL</b></v-tab>
      <v-tab to='/qnaBoardfront'><b>FrontEnd</b></v-tab>
      <v-tab to='/qnaBoardback'><b>BackEnd</b></v-tab>
      <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
    </v-tabs>

    <!-- 서브제목 -->
      <h4 class="sub-header">질문/답변 게시판</h4>
      <v-btn to="/qnaWrite" exact  id="st_write" v-if="userData.memberSq!=null">글쓰기</v-btn>

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
            :items="qnaboard1"
            :search="search"
            item-key="qboardNo"
            single-line
            hide-details
          >

          <template v-slot:item="props">
                <tr @click="handleClick(props.item.qboardNo)">
                  <td class="text-xs-right">{{props.item.qboardNo }}</td>
                  <td class="text-xs-right">{{props.item.qnaWriter }}</td>
                  <td class="text-xs-right">{{props.item.qnaTitle }}
                    <v-icon v-if="props.item.commentCount >0">mdi-message-text</v-icon>
                  </td>
                  <td v-if="props.item.qnaAnswerYn==='N'" class="text-xs-right">
                    <v-btn class="mx-2 answerbtn1" dark small>답변대기</v-btn>
                      </td>
                  <td v-else class="text-xs-right">
                    <v-btn class="mx-2 answerbtn2" dark small>답변 [{{props.item.commentCount}}]</v-btn>
                      </td>
                  <td class="text-xs-right">{{formatDate(props.item.qnaDate)}}</td>
                  <td class="text-xs-right">{{props.item.boardCount }}</td>
                </tr>
          </template>  
          <!-- <td v-if="props.item.deadline.includes('채용시까지')"> -->
        </v-data-table>

        </v-card>
       
      </div>
    </div>

</b-container>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue';
import vueMoment from 'vue-moment';
Vue.use(vueMoment);
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

  export default {

    created : function(){
      this.$store.dispatch("FETCH_QNABOARD")
    
    },
    computed:{
        ...mapState({
            qnaboard1:state=>state.qnaboard1
        }),
        ...loadUserState(['userData'])
    },

    methods:{
      handleClick(value){
        this.$router.push({name:'qnaView',params:{id:value}});
      },

    formatDate(value){
      return this.$moment(value).format("YYYY-MM-DD");
    }

    },
    
    data() {
      return { 
      
      search: '',
        headers: [
          {
            text: 'NO',
            align: 'start',
            filterable: false,
            value: 'qboardNo', //spring vo값 !
          },
          { text: '작성자', value: 'qnaWriter' },
          // { text: '분류', value: 'qnaCategory' },          
          { text: '제목', value: 'qnaTitle' },
          { text: '진행상태',value: 'qnaAnswerYn' },
          { text: '작성일', value: 'qnaDate' },
          { text: '조회수', value: 'boardCount' },

        ],
      }
    },

  }
</script>

<style scoped >
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@1,600&display=swap');
* {
   font-family: 'Nanum Gothic', sans-serif;
}
.overflow .v-card{
  box-shadow: 0 0 black !important;
  margin-bottom: 12%;
}
.submenuimage{
    width: 100%;
    height:180px;
    background-color:#F4EEFF;
    text-align: center;
    line-height: 180px;
}
.subtitle{
  font-family: 'Barlow Semi Condensed', sans-serif;
  color:#4e5157 ;
  font-size: 50px;
}
#st_write{
  position: relative;
  top: 9px;
  left:1020px;
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
  bottom: -45px;
  left:  15px;
  margin-top: 20px;
  text-align: left;
}
.answerbtn1 {
  background-color: #a250b3 !important;
}
.answerbtn2 {
  background-color:#9BA4B4 !important;
}

</style>
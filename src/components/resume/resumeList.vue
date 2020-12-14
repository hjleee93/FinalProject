<template>
 <div class="resume_List">
  <body>
    <div class="container-fluid">
      <div class="submenuimage">
          <p class="subtitle">ResumeList</p>
      </div>
      <div>
          <v-tabs centered color="grey darken-3">
              <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
              <v-tab active to="/resume/resume">입사지원서 보기</v-tab>
              <v-tab to="/resume/updateresume">입사지원서 수정</v-tab>
              <v-tab to="/resume/consultresume">입사지원서 컨설팅</v-tab>
              <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
              <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs>
      </div>
      <div class="container">      

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
            :items=resumeList
            :search="search"
            item-key="name"
          >

            <template v-slot:item="props">
              <tr @click="handleClick(props.item.resumeNo)">
                <td class="text-xs-right">{{props.item.resumelistNo }}</td>
                <td class="text-xs-right">{{props.item.resumelistTitle }}</td>
                <td class="text-xs-right">{{props.item.resumelistWriter }}</td>
                <td class="text-xs-right">{{props.item.resumelistAttachment }}</td>
                <td class="text-xs-right">{{props.item.resumelistStatus }}</td>
                <td class="text-xs-right">{{props.item.resumelistCount }}</td>
                <td class="text-xs-right">{{formatDate(props.item.resumelistDate)}}</td>
              </tr>
           </template>

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
            value: 'resumelistNo',
          },
          // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다

          { text: '제목', value: 'resumelistTitle'},
          { text: '작성자', value: 'resumelistWriter'},
          { text: '첨부파일', value: 'resumelistAttachment'},
          { text: '답변', value: 'resumelistStatus' },
          { text: '조회수', value: 'resumelistCount' },
          { text: '작성일', value: 'resumelistDate' },
        ],
        // spring에서 데이터를 받을 변수 배열형태를 선언한다

         
      }
    },
    computed: {
      ...mapState({
        resumeList:state=>state.resumeList
      }),
      ...loadUserState(['userData'])  
    },
    
    methods: {
      handleClick(value){
     
        this.$router.push({name:'resume',params:{id:value}})
        console.log(value)
      },

      formatDate(value){
      return this.$moment(value).format("YYYY-MM-DD");
      } 
    },
    created() {
      const memberSq=this.userData.memberSq;
      this.$store.dispatch("FETCH_RESUMELIST", memberSq);
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


</style>
<template>
 <div class="resume_List">
  <body>
    <div>
      <div class="submenuimage">
          <p class="subtitle">Consultant LIST</p>
      </div>
      <div>
          <v-tabs centered color="grey darken-3">
              <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
              <v-tab to="/resume/resumeList">입사지원서 보기</v-tab>
              <v-tab to="/resume/consultresume">입사지원서 컨설팅</v-tab>
              <v-tab active to="/resume/consult">컨설팅 전문가 등록</v-tab>
              <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs>
      </div>

      <div class="container">
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
        <!-- vuetify에 data table에 items를 선언한 배열 변수로 지정해준다 -->
          <v-data-table
            :headers="headers"
            :items=consultant
            :search="search"
            item-key="name"
          >

            <template v-slot:item="props">
              <tr class="end">
                <td class="text-xs-right">{{props.item.consultNo }}</td>
                <td class="text-xs-right">{{props.item.memberSq }}</td>
                <td class="text-xs-right">{{props.item.consultName }}</td>
                <td class="text-xs-right">{{props.item.consultField }}</td>
                <td class="text-xs-right">{{props.item.consultWork }}</td>
                <td class="text-xs-right">{{props.item.consultAttachment }}</td>
                <td class="text-xs-right">{{formatDate(props.item.consultDate)}}</td>
                <td class="text-xs-right"><b-button pill variant="outline-primary" v-if="props.item.originalFilename!=null" @click="download(props.item.consultNo, props.item.originalFilename, props.item.renamedFilename)">증빙서류</b-button></td>
                <td class="text-xs-right"><b-button pill variant="outline-success" @click="approval(props.item.memberSq, props.item.consultNo)">승인</b-button></td>
                <td class="text-xs-right"><b-button pill variant="outline-danger" @click="refuse(props.item.memberSq, props.item.consultNo)">거절</b-button></td>
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
import axios from 'axios';
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
            value: 'consultNo',
          },
          // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다

          { text: '회원번호', value: 'memberSq'},
          { text: '이름', value: 'consultName'},
          { text: '분야', value: 'consultField'},
          { text: '경력', value: 'consultWork' },
          { text: '첨부파일', value: 'consultAttachment' },
          { text: '등록일자', value: 'consultDate' },
          { text: '', value: '' },
          { text: '', value: '' },
          { text: '', value: '' },
        ],
        // spring에서 데이터를 받을 변수 배열형태를 선언한다

         
      }
    },
    computed: {
      ...mapState({
        consultant:state=>state.consultant
        
      }),
      ...loadUserState(['userData'])  
    },
    
    methods: {
    //   handleClick(value){
    //     this.$router.push({name:'resume',params:{id:value}})
    //     console.log(value)
    //   },
      download(consultNo, originalFilename, renamedFilename){
          //this.$store.dispatch("FETCH_CONSULT_ATTACHMENT",value);
          //let Attachment=this.consultAttachment;
          //console.log("consultNo : "+consultNo);
          //console.log("originalFilename : "+originalFilename);
          //console.log("renamedFilename : "+renamedFilename);
          location.href="http://localhost:8082/itjobgo/resume/consultFileDownload?oriName="+originalFilename+"&reName="+renamedFilename;

      },
      approval(memberSq, consultNo){
        alert("이력서 전문가 신청을 승인하겠습니까?");
        let approval="Y";

        let formData=new FormData();
        formData.append('memberSq',memberSq);
        formData.append('approval',approval);
        formData.append('consultNo',consultNo);

        axios.post("http://localhost:8082/itjobgo/member/updateConsultant.do",formData
       ,{ headers:{
          'Content-Type':'multipart/form-data'
        }}).then((res)=>{
          console.log(res.data);
          // setTimeout( () => this.$router.push({ path: '/resume/consultresume'}), 2000);
          // this.$route.push({name:'consultresume'})
          })
        .catch((error)=>
        console.log(error));

        axios.post("http://localhost:8082/itjobgo/resume/updateConsultApproval.do",formData
       ,{ headers:{
          'Content-Type':'multipart/form-data'
        }}).then((res)=>{
          console.log(res.data);
          // setTimeout( () => this.$router.push({ path: '/resume/consultresume'}), 2000);
          // this.$route.push({name:'consultresume'})
          })
        .catch((error)=>
        console.log(error));
      },

      refuse(memberSq, consultNo){
        alert("이력서 전문가 신청을 거절하겠습니까?");
        let approval="R";

        let formData=new FormData();
        formData.append('memberSq',memberSq);
        formData.append('approval',approval);
        formData.append('consultNo',consultNo);

        axios.post("http://localhost:8082/itjobgo/resume/updateConsultApproval.do",formData
       ,{ headers:{
          'Content-Type':'multipart/form-data'
        }}).then((res)=>{
          console.log(res.data);
          // setTimeout( () => this.$router.push({ path: '/resume/consultresume'}), 2000);
          // this.$route.push({name:'consultresume'})
          })
        .catch((error)=>
        console.log(error));
      },

      formatDate(value){
      return this.$moment(value).format("YYYY-MM-DD");
      } 
    },



    created() {
      this.$store.dispatch("FETCH_CONSULTANT");
    },
    
  }
</script>


<style scoped>
.consult_resume{
  display : flex;
  flex-direction: column;
  justify-content: center;
}
.submenuimage {
  /* background-image: url("../../assets/images/resume.jpeg"); */
  background-image: url("../../assets/images/consult1.png");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.subtitle {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
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
td{
  text-align: center;
}
  .search-bar {
  width: 30%;
  margin-left: 72%;
  }
/* .base_text{background-color: #424874;} */

.overflow{
  width: 1150px;
}
</style>
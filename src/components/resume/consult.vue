<template>
<!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
 <div class="Line_resume">
    <div class="submenuimage">
        <p class="subtitle">컨설팅 전문가 등록</p>
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
        <!-- 관리자 승인 버튼 -->
        <b-container class="bv-example-row">
        <b-row id="writecontain" align-h="end">
            <b-button to="/resume/consultant" v-if="userData.memberEmail==='admin@kh.com'">관리자 승인</b-button>
        </b-row>
            <b-row>
                <b-col>
                      <div>
                        <b-card bg-variant="light">
                            <b-form-group
                            label-cols-lg="3"
                            label="컨설팅 전문가 등록"
                            label-size="lg"
                            label-class="font-weight-bold pt-0"
                            class="mb-0"
                            >
                            </b-form-group>
                            <b-form-group
                            label-cols-lg="10"
                            label="관리자 승인 후 이력서, 포트폴리오 컨설팅 활동이 가능합니다."
                            label-size="md"
                            label-class="font-weight-bold pt-0"
                            class="consult_text"
                            >
                            </b-form-group>
                            <b-form-group
                                label-cols-sm="3"
                                label="이름"
                                label-align-sm="right"
                                label-for="consultName"
                            >
                                <b-form-input id="consultName" v-model="userData.memberName"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label-cols-sm="3"
                                label="전문 분야"
                                label-align-sm="right"
                                label-for="consultField"
                            >
                                <b-form-input id="consultField" v-model="consultField"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label-cols-sm="3"
                                label="업무 경력"
                                label-align-sm="right"
                                label-for="consultWork"
                            >
                                <b-form-input id="consultWork" v-model="consultWork"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label-cols-sm="3"
                                label="증빙 자료"
                                label-align-sm="right"
                                label-for="nested-country"
                            >
                                <b-form-file id="files" 
                                ref="upfiles" 
                                v-on:change="handleFile"
                                placeholder="첨부파일"
                                ></b-form-file> 
                            </b-form-group>
                            <b-button type="submit" id="submit" variant="primary" @click="insertConsult">등록</b-button>
                            <b-button type="reset" id="reset" variant="danger">취소</b-button>
                        </b-card>
                        </div>
                </b-col>
            </b-row>
        </b-container>

        <div class="container">
        <div class="overflow">
         <!-- 테이블 -->
        <v-card>
        <p>{{userData.memberName}}님이 신청한 컨설팅 전문가 등록 목록은 다음과 같습니다.</p>
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
          class="row-pointer mt-4"
            :headers="headers"
            :items=consultantOne
            :search="search"
            item-key="name"
          >

            <template v-slot:item="props">
              <tr class="end">
                <td class="text-xs-right">{{props.item.consultNo }}</td>
                <td class="text-xs-right">{{props.item.consultName }}</td>
                <td class="text-xs-right">{{props.item.consultField }}</td>
                <td class="text-xs-right">{{props.item.consultWork }}</td>
                <td class="text-xs-right">{{props.item.consultAttachment}}</td>
                <td class="text-xs-right">{{formatDate(props.item.consultDate)}}</td>
                <td class="text-xs-right" v-if="props.item.consultApproval==='N'" style="color:green">대기중</td>
                <td class="text-xs-right" v-if="props.item.consultApproval==='R'" style="color:red">신청거절</td>
                <td class="text-xs-right" v-if="props.item.consultApproval==='Y'" style="color:blue">신청승인</td>
              </tr>
           </template>

          </v-data-table>
        </v-card>
       </div>
    </div>
 </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex';
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";
export default {
    data() {
      return {
        consultField:'',
        consultWork:'',
        files:'',
        search: '',
        headers: [
          {
            text: "번호",
            align: 'start',
            filterable: false,
            value: 'consultNo',
          },
          // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다

          { text: '이름', value: 'consultName'},
          { text: '분야', value: 'consultField'},
          { text: '경력', value: 'consultWork' },
          { text: '첨부파일', value: 'consultAttachment' },
          { text: '등록일자', value: 'consultDate' },
          { text: '관리자확인', value: 'consultApproval' },
        ],
      }
    },

    computed: {
      ...mapState({
        consultantOne:state=>state.consultantOne
        
      }),
      ...loadUserState(['userData'])  
    },
    
    created() {
      const memberSq=this.userData.memberSq;
      this.$store.dispatch("FETCH_CONSULTANTONE",memberSq);
    },

    methods: {
      formatDate(value){
        return this.$moment(value).format("YYYY-MM-DD");
      }, 
      handleFile(){
        //console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        //console.log(this.files);
      },
      insertConsult(){
        let formData=new FormData();

            //첨부파일
          formData.append('upfile',this.files);

           //개인정보
          formData.append('memberSq',this.userData.memberSq);
          formData.append('consultName',this.userData.memberName);
          formData.append('consultField',this.consultField);
          formData.append('consultWork',this.consultWork);

            // for(let key of formData.entries()){
            //     console.log(`${key}`);
            // }

           axios.post("http://localhost:8082/itjobgo/resume/insertconsult.do",formData
            ,{ headers:{
            'Content-Type':'multipart/form-data'
            }})
            .then((res)=>{
                console.log(res.data);
                //setTimeout( () => this.$router.go(this.$router.currentRoute), 2000);
                })
            .catch((error)=>console.log(error));
      },
    }

}
</script>
<style scoped>
.bv-example-row{
    margin-top: 30px;
    margin-bottom: 30px;
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
#submit{
    margin-top: 20px;
    margin-left: 45%;
    background-color: #424874;
    border-color: #424874;
}
#reset{
    margin-top: 20px;
    margin-left: 10px;
    background-color: #9BA4B4;
    border-color: #9BA4B4;
}
#writecontain {
  margin-bottom: 10%;
}
#writecontain > .btn {
  background-color: #424874;
}
.overflow .v-card {
  box-shadow: 0 0 black !important;
  margin-bottom: 12%;
}
  .search-bar {
  width: 30%;
  margin-left: 72%;
  }
p{
    font-weight: bold;
}
* {
  font-family: "Noto Sans KR", sans-serif;
}
/* hover */
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
<template>
<!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
 <div class="Line_resume">
    <div class="submenuimage">
        <p class="subtitle">resume</p>
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
        <b-container class="bv-example-row">
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
                            label="관리자 승인 후 이력서 컨설팅(댓글) 활동이 가능합니다."
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
 </div>
</template>
<script>
import axios from 'axios'
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");
export default {
    data() {
      return {
        consultField:'',
        consultWork:'',
        files:'',
      }
    },
    computed: {
        ...mapState(['userData'])
    },
    methods: {
      handleFile(){
        console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        console.log(this.files);
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

            for(let key of formData.entries()){
                console.log(`${key}`);
            }

           axios.post("http://localhost:8082/itjobgo/resume/insertconsult.do",formData
            ,{ headers:{
            'Content-Type':'multipart/form-data'
            }})
            .then((res)=>{
                console.log(res.data);
                //setTimeout( () => this.$router.push({ path: '/resume/resume'}), 2000);
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
.consult_text{
    color:#424874;
}

</style>
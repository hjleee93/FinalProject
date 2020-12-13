<template>
<!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
 <div class="Design_resume">
    <div class="submenuimage">
        <p class="subtitle">resume</p>
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
        <div id="submenu">
            <b-nav pills>
                <b-nav-item to="/resume/resume">기본 이력서</b-nav-item>
                <b-nav-item to="/resume/BlindResume">블라인드 이력서</b-nav-item>
                <b-nav-item to="/resume/LineResume">라인 이력서</b-nav-item>
                <b-nav-item active to="/resume/DesignResume">디자인 이력서</b-nav-item>
            </b-nav>
        </div>
        <div>
            <b-button v-b-modal.modal-xl class="print">인쇄</b-button>
            <b-modal id="modal-xl" size="xl" title="Extra Large Modal">
                
            </b-modal>
        </div>
        
        <b-container class="bv-example-row">
            <b-row class="text-center">
                <b-col class="profile">
                    <div>
                    <b-card title="" class="person_info">
                        <b-img v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
                    </b-card>
                    </div>

                    <b-card title="개인정보" class="person_info">
                        <div>
                            <img  class="person_images" src="../../assets/images/phone.png" fluid alt="Responsive image">
                            <input type="tel" v-model="resume.telephone">
                        </div>
                        <div>
                            <img  class="person_images" src="../../assets/images/home.png" fluid alt="Responsive image">
                            <input type="text" v-model="resume.rphone">
                        </div>
                        <div>
                            <img  class="person_images" src="../../assets/images/email.png" fluid alt="Responsive image">
                            <input type="email" v-model="resume.remail">
                        </div>
                    </b-card>

                    <b-card title="학력사항" class="person_info">
                        <table class="edu_table">
                            <tr>
                            <td class="education_div">{{formatDate(resume.schoolStartDate1)}}~{{formatDate(resume.schoolFinishDate1)}}</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" placeholder="학교명"><input type="text" placeholder="전공선택" v-model="resume.major1">
                                </td>
                            </tr>
                            <tr>
                               <td>
                                   <b-form-select class="select_school" v-model="resume.education1">
                                        <b-form-select-option value="graduation">졸업</b-form-select-option>
                                        <b-form-select-option value="prograduation">졸업예정</b-form-select-option>
                                        <b-form-select-option value="student">재학</b-form-select-option>
                                        <b-form-select-option value="stopout">휴학</b-form-select-option>
                                        <b-form-select-option value="leaveschool">중퇴</b-form-select-option>
                                        <b-form-select-option value="qualificationExam">검정고시</b-form-select-option>
                                    </b-form-select>
                                </td> 
                            </tr>
                        </table>
                    </b-card>

                    <b-card title="외국어능력" class="person_info">
                    <table class="languages_table">
                        <tr>
                            <td><strong>외국어</strong></td>
                            <td><strong>수준</strong></td>
                        </tr>
                        <tr>
                            <td><input type="text" v-model="resume.languageName"></td>
                            <td><input type="text" class="languages_level" v-model="resume.languageLevel"></td>
                        </tr>
                    </table>
                    </b-card>
                </b-col>

                <b-col cols="7">
                    <b-card title="" class="name">
                        <h1>{{resume.rname}}</h1>
                        <h3>{{resume.engName}}</h3>
                    </b-card>

                    <b-card title="경력사항" class="person_info2">
                    <table class="person_table">
                        <tr> 
                        <td><strong>기간</strong></td>
                        <td>{{formatDate(resume.workStartDate)}}~
                        {{formatDate(resume.workFinishDate)}}</td>
                        
                        </tr>
                        <tr>
                            <td><strong>회사명</strong></td>
                            <td><input type="text" class="work_input" v-model="resume.workName"></td>
                        </tr>

                        <tr>
                            <td><strong>직급/직책</strong></td>
                            <td><input type="text" class="work_input" v-model="resume.workLevel"></td>
                        </tr>
                        <tr>
                            <td><strong>상태</strong></td>
                            <td>
                                <b-form-select v-model="resume.workState">
                                    <b-form-select-option value="resignation">퇴사</b-form-select-option>
                                    <b-form-select-option value="work">재직</b-form-select-option>
                                </b-form-select>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>주요직무 및 업무</strong></td>
                            <td>
                            <b-form-textarea id="textarea"  rows="3" max-rows="6" v-model="resume.workDetail"></b-form-textarea>
                            </td>
                        </tr>
                    </table>
                    </b-card>

                    <b-card title="자격증" class="person_info2">
                        <table class="license_table">
                            <tr>
                                <td><strong>자격증명</strong></td>
                                <td><strong>발급기관</strong></td>
                                <td><strong>취득일</strong></td>
                            </tr>
                            <tr>
                                <td><input type="text" v-model="resume.licenseName"></td>
                                <td><input type="text" v-model="resume.licenseAgency"></td>
                                <td>{{formatDate(resume.licenseDate)}}</td>
                            </tr>
                        </table>
                    </b-card>

                    <b-card title="프로젝트" class="person_info2">
                        <table class="project_table">
                            <tr>
                                <td><strong>구분</strong></td>
                                <td colspan="2"><strong>기간</strong></td>
                                <td><strong>프로젝트명</strong></td>
                            </tr>
                            <tr>
                                
                                
                            </tr>
                            <tr>
                                <td>
                                    <b-form-select class="select_project" v-model="resume.projectPart">
                                        <b-form-select-option value="person">개인</b-form-select-option>
                                        <b-form-select-option value="team">팀</b-form-select-option>
                                        <b-form-select-option value="order">발주</b-form-select-option>
                                    </b-form-select>
                                </td>
                                <td>{{formatDate(resume.projectStartDate)}}</td>
                                <td>{{formatDate(resume.projectFinishDate)}}</td>
                                <td><input type="text" v-model="resume.projectName"></td>
                            </tr>
                            <tr>
                                <td><strong>주요 업무 및 성과</strong></td>
                                <td colspan="4">
                                <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="resume.projectDetail"></b-form-textarea>
                                </td>
                            </tr>
                        </table>
                    </b-card>

                    <b-card title="주요활동" class="person_info2">
                        <table>
                            <tr>
                                <td><strong>구분</strong></td>
                                <td colspan="2"><strong>기간/일자</strong></td>
                                <td><strong>기관명</strong></td>
                            </tr>
                            <tr>
                                <td>
                                <b-form-select v-model="resume.activity">
                                        <b-form-select-option value="award">수상경력</b-form-select-option>
                                        <b-form-select-option value="volunteer">봉사활동</b-form-select-option>
                                        <b-form-select-option value="social">사회활동</b-form-select-option>
                                        <b-form-select-option value="intern">인턴</b-form-select-option>
                                        <b-form-select-option value="club">동아리 및 교내활동</b-form-select-option>
                                </b-form-select>
                                </td>
                                <td>{{formatDate(resume.activityStartDate)}}</td>
                                <td>{{formatDate(resume.activityFinishDate)}}</td>
                                <td><input type="text" v-model="resume.activityAgency"></td>
                            </tr>
                            <tr>
                                <td><strong>주요 업무 및 성과</strong></td>
                                <td colspan="4">
                                <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="resume.activityDetail"></b-form-textarea>
                                </td>
                            </tr>
                        </table>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
 </div>
</template>
<script>
import { mapState } from 'vuex';
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

export default {
    data(){
        return {
            
        }
    },
    created() {
        const memberSq=this.userData.memberSq;
        this.$store.dispatch("FETCH_RESUME", memberSq);
    },
    computed: {
        ...mapState({
            resume:state=>state.resume,
        }),
         ...loadUserState(['userData'])  
    },
    methods:{
    formatDate(value){
      return this.$moment(value).format("YYYY-MM-DD");
    }
    }
}

</script>
<style scoped>
.print{
    margin-left: 80%;
}
.Design_resume{
    display : flex;
    flex-direction: column;
    justify-content: center;
}
#submenu{
        margin-top:20px;
        margin-bottom: 20px;
        display : flex;
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
.bv-example-row{
    margin-top: 50px;
    margin-bottom: 100px;
}
.text-center{
    background-color: #F1F6F9 ;
}
.profile{
    /* background-color: #9BA4B4 ; */
    background-color:#F4EEFF ;
}
.person_info{
    background-color:#F4EEFF;
    border:none;
    font-family: a아시아헤드3;
}
.person_info2{
    background-color: #F1F6F9;
    border:none;
    font-family: a아시아헤드3;
}
b-card{
    margin-top: 20px;
}

div{
    margin-top: 20px;
}

.name{
    width: 100%;
    height: 150px;
    background-color:#F4EEFF;
    border:none;
    font-family: a아시아헤드4;
}

.person_images{
    width: auto; height: auto;
    max-width: 30px;
    max-height: 30px;
    margin-right: 10px;
}

.edu_table{

    text-align: center;
    margin-left: 10%;
}
.edu_table input{
    width: 150px;
}
.select_school{
    width: 100px;
}
.work_table{
    margin-left: 10%;
    text-align: left;
}
.license_table{
    margin-left: 3%;
    text-align: left;
}
.languages_table{
    margin-left: 15%;
    text-align: center;
}
.languages_table input{
    width: 170px;
    margin-left: 10px;
}
.languages_table .languages_level{
    width: 50px;
}
</style>
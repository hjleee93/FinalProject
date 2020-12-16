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
            <v-tab active to="/resume/resumeList">입사지원서 보기</v-tab>
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
                <b-nav-item active to="/resume/LineResume">라인 이력서</b-nav-item>
                <b-nav-item to="/resume/DesignResume">디자인 이력서</b-nav-item>
            </b-nav>
        </div>
        <div>
            <b-button v-b-modal.modal-xl class="print">인쇄</b-button>
            <b-modal id="modal-xl" size="xl" title="Extra Large Modal">
                    
            </b-modal>
        </div>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <form>
                        <table class="person_table">
                            <div class="name">{{resume.rname}}</div>
                            <div class="resumetitle">개인정보</div>
                            <div class="hr"></div>
                                <tr>
                                    <th class="person_title"><strong>생년월일</strong></th>
                                    <td>{{formatDate(resume.birth)}}</td> 
                                </tr>
                                <tr>
                                    <th class="person_title" rowspan="2"><strong>주소</strong></th>
                                    <td><input class="personinfo" type="text" placeholder="도로명 주소" v-model="resume.address"></td> 
                                </tr>
                                <tr>
                                    <td><input class="personinfo" type="text" placeholder="상세주소1" v-model="resume.addressDetail"></td>
                                </tr>
                                <tr>
                                    <th class="person_title"><strong>일반전화</strong></th>
                                    <td><input class="personinfo" type="tel" v-model="resume.telephone"></td> 
                                </tr>
                                <tr>
                                    <th class="person_title"><strong>휴대전화</strong></th> 
                                    <td><input class="personinfo" type="tel" v-model="resume.rphone"></td> 
                                </tr>
                                <tr>
                                    <th class="person_title"><strong>이메일</strong></th>
                                    <td colspan="2"><input class="email" type="text" v-model="resume.remail"></td>
                                </tr>
                                <div class="hr"></div>
                                </table>

                                
                                <table class="edu_table">
                                <div class="resumetitle">학력사항</div>
                                <div class="hr"></div>
                                <tr>
                                    <td class="education_div">{{formatDate(resume.schoolStartDate1)}}~{{formatDate(resume.schoolFinishDate1)}}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" placeholder="학교명" v-model="resume.schoolName1"><input type="text" placeholder="전공선택" v-model="resume.major1">
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
                                <div class="hr"></div>
                                </table>


                                <table class="work_table">
                                <div class="resumetitle">경력사항</div>
                                <div class="hr"></div>
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
                                    <td>주요직무 및 업무</td>
                                    <td>
                                    <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="resume.workDetail"></b-form-textarea>
                                    </td>
                                </tr>
                                <div class="hr"></div>
                                </table>


                                <table>
                                <div class="resumetitle">자격증</div>
                                <div class="hr"></div>
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
                                <div class="hr"></div>
                                </table>

                                <table>
                                <div class="resumetitle">참여 프로젝트</div>
                                <div class="hr"></div>
                                <tr>
                                    <td><strong>구분(개인/팀/발주)</strong></td>
                                    <td colspan="2"><strong>기간</strong></td>
                                    <td><strong>프로젝트명</strong></td>
                                    <td><strong>수행업무</strong></td>
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
                                    <td><input type="text" v-model="resume.projectWork"></td>
                                </tr>
                                <tr>
                                    <td><strong>주요 업무 및 성과</strong></td>
                                    <td colspan="4">
                                    <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="resume.projectDetail"></b-form-textarea>
                                    </td>
                                </tr>
                                <div class="hr"></div>
                            </table>
                    </form>
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
.Line_resume{
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
#insertresume{
    display: flex;
}

table{
    width: 700px;
    text-align: center;
    table-layout: fixed;
    word-wrap: break-word;
}
.person_table{
    width: 500px;
    text-align: left;
}
.person_table th{
    width: 50px;
}
.edu_table{
    text-align: left;
}
.work_table{
    text-align: left;
}

.work_input{
    width: 250px;
}

.person_title{
    width: 100px;
}
b-form-select{
    width: 130px;
}
div .name{
    width: 100px;
    font-size:30px;
    font-weight: bold;
    margin-top:30px;
    margin-bottom: 15px;
    text-align: center;
}
div .resumetitle{
    width: 200px;
    font-size:20px; 
    font-weight: bold;
    margin-top:30px;
    margin-bottom: 15px;
    text-align: left;
}

.hr{
    width: 900px;
    height: 5px;
    background-color: #424874;
    margin-top:20px;
    margin-bottom: 20px;
}

.hr2{
    width: 900px;
    height: 3px;
    background-color: #424874;
    margin-top:20px;
    margin-bottom: 20px; 
}
input{
    width: 180px;
    /* border: none; */
}
.personinfo{
    width : 400px;
}
.email{
    width: 195px;
}

.emailselect{
    width: 180px;
}
.select_project{
    width: 100px;
}
.education_div{
    width: 500px;
}

.select_school{
    width: 200px;
    margin-left: 10px;
}
button{
    margin-top:20px;
    margin-bottom: 20px;
}
#submit{
    margin-left: 45%;
    background-color: #424874;
    border-color: #424874;
}
#reset{
    margin-left: 10px;
    background-color: #9BA4B4;
    border-color: #9BA4B4;
}
</style>
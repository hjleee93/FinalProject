<template>
<!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
 <div class="insert_resume">
    <div class="submenuimage">
        <p class="subtitle">Insert Resume</p>
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
            <b-nav-item active to="/resume/resume">기본 이력서</b-nav-item>
            <b-nav-item to="/resume/BlindResume">블라인드 이력서</b-nav-item>
            <b-nav-item to="/resume/LineResume">라인 이력서</b-nav-item>
            <b-nav-item to="/resume/DesignResume">디자인 이력서</b-nav-item>
        </b-nav>
    </div>

    <b-container class="bv-example-row">
    <b-row>
        <b-col>
            <form @submit.prevent="insertResume"  enctype="multipart/form-data">
                <table id="resumetable">
                <div class="resumetitle"><p>개인정보</p></div>
                    <tr>
                        <td rowspan="7" class="resumetitle2">이미지파일</td>
                    </tr>
                    <tr>
                        <td><strong>이름</strong></td>
                        <td><input type="text" placeholder="이름" id="name" readonly v-model="resume.rname"></td> 
                        <td><strong>영문</strong></td>
                        <td><input type="text" placeholder="영문 이름" id="engName" v-model="resume.engName"></td> 
                    </tr>
                    <tr>
                        <td><strong>생년월일</strong></td>
                        <td class="date">{{formatDate(resume.birth)}}</td> 
                        <td><strong>성별</strong></td> 
                        <td>
                            <b-form-group class="gender" inline="true">
                                <b-form-radio name="gender" value="M" v-model="resume.gender">남</b-form-radio>
                                <b-form-radio name="gender" value="F" v-model="resume.gender">여</b-form-radio>
                            </b-form-group>    
                        </td> 
                    </tr>
                    <tr>
                        <td rowspan="3"><strong>주소</strong></td>
                        <td colspan="4"><b-form-input
                            class="readonly-input postcode"
                            type="text"
                            id="sample6_postcode"
                            v-model="resume.postcode"
                            placeholder="우편번호"
                        ></b-form-input>
                        </td> 
                        <!-- <td colspan="2"><input class="address" type="text" placeholder="우편번호" v-model="result.address"></td>  -->
                    </tr>
                    <tr>
                        <td colspan="3">
                        <!-- <td colspan="3"><input class="address" type="text" placeholder="도로명 주소" v-model="addressDetail"></td> -->
                        <b-form-input                    
                            class="readonly-input addr"
                            type="text"
                            id="sample6_address"
                            v-model="resume.address"
                            placeholder="도로명 주소"
                        ></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <!-- <td colspan="3"><input class="address" type="text" placeholder="상세주소" v-model="addressDetail"></td> -->
                        <td colspan="4">
                        <b-form-input
                            class="readonly-input addrDtl"
                            type="text"
                            id="sample6_detailAddress"
                            placeholder="상세주소를 입력해주세요"
                            v-model="resume.addressDetail"
                        ></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>일반전화</strong></td>
                        <td><input type="tel" id="telephone" v-model="resume.telephone"></td> 
                        <td><strong>휴대전화</strong></td> 
                        <td><input type="tel" readonly v-model="resume.rphone" id="phone"></td> 
                    </tr>
                    <tr>
                        <td class="resumetitle2"><b-form-file v-on:change="handleFile" id="files" ref="upfiles"></b-form-file></td>

                        <td><strong>이메일</strong></td>
                        <td colspan="3"><input type="email" id="email" readonly  v-model="resume.remail"></td>
                    </tr>
                </table>
                <table>
                    <div class="resumetitle"><p>학력사항</p></div> 
                    <tr>
                        <td class="school"><strong>학력구분</strong></td>
                        <td><strong>학교명</strong></td>
                        <td colspan="2"><strong>기간</strong></td>
                        <td><strong>전공학과</strong></td>
                        <td><strong>상태</strong></td>
                    </tr>
                    <tr>
                        <td>
                            <b-form-select class="school" v-model="resume.school1">
                                <b-form-select-option value="middleshcool">중학교</b-form-select-option>
                                <b-form-select-option value="highscool">고등학교</b-form-select-option>
                                <b-form-select-option value="college">대학교(2/3년)</b-form-select-option>
                                <b-form-select-option value="university">대학교(4년)</b-form-select-option>
                                <b-form-select-option value="master">대학원(석사)</b-form-select-option>
                                <b-form-select-option value="doctor">대학원(박사)</b-form-select-option>
                            </b-form-select>
                        </td>
                        <td><input type="text" placeholder="학교명" id="schoolName1" v-model="resume.schoolName1"></td>
                        <td class="date">{{formatDate(resume.schoolStartDate1)}}</td>
                        <td class="date">{{formatDate(resume.schoolFinishDate1)}}</td>
                        <td><input type="text" placeholder="전공" v-model="resume.major1"></td>
                        <td>
                            <b-form-select class="school" v-model="resume.education1">
                                <b-form-select-option value="graduation">졸업</b-form-select-option>
                                <b-form-select-option value="prograduation">졸업예정</b-form-select-option>
                                <b-form-select-option value="studying">재학</b-form-select-option>
                                <b-form-select-option value="stopout">휴학</b-form-select-option>
                                <b-form-select-option value="leaveschool">중퇴</b-form-select-option>
                                <b-form-select-option value="qualificationExam">검정고시</b-form-select-option>
                            </b-form-select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b-form-select class="school" v-model="resume.school2">
                                <b-form-select-option value="middleschool">중학교</b-form-select-option>
                                <b-form-select-option value="highscool">고등학교</b-form-select-option>
                                <b-form-select-option value="college">대학교(2/3년)</b-form-select-option>
                                <b-form-select-option value="university">대학교(4년)</b-form-select-option>
                                <b-form-select-option value="master">대학원(석사)</b-form-select-option>
                                <b-form-select-option value="doctor">대학원(박사)</b-form-select-option>
                            </b-form-select>
                        </td>
                        <td><input type="text" placeholder="학교명" id="schoolName2" v-model="resume.schoolName2"></td>
                        <td class="date">{{formatDate(resume.schoolStartDate2)}}</td>
                        <td class="date">{{formatDate(resume.schoolFinishDate2)}}</td>
                        <td><input type="text" placeholder="전공" v-model="resume.major2"></td>
                        <td>
                            <b-form-select class="school" v-model="resume.education2">
                                <b-form-select-option value="graduation">졸업</b-form-select-option>
                                <b-form-select-option value="prograduation">졸업예정</b-form-select-option>
                                <b-form-select-option value="studying">재학</b-form-select-option>
                                <b-form-select-option value="stopout">휴학</b-form-select-option>
                                <b-form-select-option value="leaveschool">중퇴</b-form-select-option>
                                <b-form-select-option value="qualificationExam">검정고시</b-form-select-option>
                            </b-form-select>
                        </td>
                    </tr>
                </table>
                <table>
                    <div class="resumetitle"><p>경력사항</p></div>
                    <tr> 
                        <td colspan="2"><strong>기간</strong></td>
                        <td><strong>회사명</strong></td>
                        <td><strong>직급/직책</strong></td>
                        <td><strong>상태</strong></td>
                    </tr>
                    <tr>
                        <td class="date">{{formatDate(resume.workStartDate)}}~</td>
                        <td class="date">{{formatDate(resume.workFinishDate)}}</td>
                        <td><input type="text" id="workName" v-model="resume.workName"></td>
                        <td><input type="text" id="workState" v-model="resume.workLevel"></td>
                        <td>
                            <b-form-select class="select" v-model="resume.workState">
                                <b-form-select-option value="resignation">퇴사</b-form-select-option>
                                <b-form-select-option value="work">재직</b-form-select-option>
                            </b-form-select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">주요직무 및 업무</td>
                        <td colspan="3">
                        <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="resume.workDetail"></b-form-textarea>
                        </td>
                    </tr>
                </table>
                <table>
                    <div class="resumetitle"><p>자격증</p></div>
                    <tr>
                        <td><strong>자격증명</strong></td>
                        <td><strong>발급기관</strong></td>
                        <td><strong>취득일</strong></td>
                    </tr>
                    <tr>
                        <td><input type="text" id="licenseName" v-model="resume.licenseName"></td>
                        <td><input type="text" id="licenseAgency" v-model="resume.licenseAgency"></td>
                        <td class="date">{{formatDate(resume.licenseDate)}}</td>
                    </tr>
                </table>
                <table>
                    <div class="resumetitle"><p>외국어능력</p></div>
                    <tr>
                        <td><strong>외국어</strong></td>
                        <td><strong>수준</strong></td>
                        <td><strong>공인시험</strong></td>
                        <td><strong>점수/등급</strong></td>
                        <td><strong>응시일</strong></td>
                    </tr>
                    <tr>
                        <td><input type="text" id="languageName" v-model="resume.languageName"></td>
                        <td><input type="text" id="languageLevel" v-model="resume.languageLevel"></td>
                        <td><input type="text" id="languageTest" v-model="resume.languageTest"></td>
                        <td><input type="text" id="languageScore" v-model="resume.languageScore"></td>
                        <td class="date">{{formatDate(resume.languageDate)}}</td>
                    </tr>
                </table>
                <table>
                    <div class="resumetitle"><p>주요 활동 및 수상</p></div>
                    <tr>
                        <td><strong>구분</strong></td>
                        <td colspan="2"><strong>기간/일자</strong></td>
                        <td><strong>기관명</strong></td>
                        <td><strong>내용/내역</strong></td>
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
                        <td class="date">{{formatDate(resume.activityStartDate)}}</td>
                        <td class="date">{{formatDate(resume.activityFinishDate)}}</td>
                        <td><input type="text" id="activityAgency" v-model="resume.activityAgency"></td>
                        <td><input type="text" id="activityDetail" v-model="resume.activityWork"></td>
                    </tr>
                    <tr>
                        <td><strong>주요 활동 및 성과</strong></td>
                        <td colspan="4">
                        <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="resume.activityDetail"></b-form-textarea>
                        </td>
                    </tr>
                </table>
                <table>
                    <div class="resumetitle"><p>참여 프로젝트</p></div>
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
                        <td class="date">{{formatDate(resume.projectStartDate)}}</td>
                        <td class="date">{{formatDate(resume.projectFinishDate)}}</td>
                        <td><input type="text" id="projectName" v-model="resume.projectName"></td>
                        <td><input type="text" id="projectWork" v-model="resume.projectWork"></td>
                    </tr>
                    <tr>
                        <td><strong>주요 업무 및 성과</strong></td>
                        <td colspan="4">
                        <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="resume.projectDetail"></b-form-textarea>
                        </td>
                    </tr>
                </table>
                <table>
                    <div class="resumetitle"><p>해외경험</p></div>
                    <tr>
                        <td><strong>구분</strong></td>
                        <td colspan="2"><strong>기간/일자</strong></td>
                        <td><strong>국가</strong></td>
                        <td><strong>기관/경험</strong></td>
                    </tr>
                    <tr>
                        <td>
                        <b-form-select v-model="resume.abroad">
                                <b-form-select-option value="award">해외연수</b-form-select-option>
                                <b-form-select-option value="volunteer">해외봉사</b-form-select-option>
                                <b-form-select-option value="social">해외취업</b-form-select-option>
                        </b-form-select>
                        </td>
                        <td class="date">{{formatDate(resume.abroadStartDate)}}</td>
                        <td class="date">{{formatDate(resume.abroadFinishDate)}}</td>
                        <td><input type="text" id="abroadCountury" v-model="resume.abroadCountury"></td>
                        <td><input type="text" id="abroadAgency" v-model="resume.abroadAgency"></td>
                    </tr>
                    <tr>
                        <td><strong>주요활동</strong></td>
                        <td colspan="4">
                        <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="resume.abroadDetail"></b-form-textarea>
                        </td>
                    </tr>
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
.resume{
    display : flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
input{
    text-align: center;
}
#submenu{
    margin-top:20px;
    margin-bottom: 20px;
    display : flex;
    justify-content: center;
}
#insertresume{
    display: flex;
    align-content: center;
}

#resumetable{
    table-layout: fixed;
}
.print{
    margin-left: 80%;
}
 tr, td {
    width: 50px;
    border: 2px solid grey;
    margin : 0 auto;
    border-collapse: collapse;
    text-align: center;
 }
.personalTitle{
    width: 50px;
 }
.imagefile{
    width: 50px;
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

.saveresume{
   margin-left: 80%;
}

.savebtn{
    margin-right: 10px;
}
div .resumetitle{
 width: 250px;
 background-color:#394867;
 font-size:20px; 
 margin-top:30px;
 margin-bottom: 15px;
 margin-left: 20px;
 text-align: center;
 color: #F1F6F9;
 border-radius: 30px;
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
.date{
    width: 100px;
}
</style>
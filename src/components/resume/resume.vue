<template>
  <!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
  <div class="insert_resume">
    <div class="submenuimage noprint">
      <p class="subtitle">BASIC RESUME</p>
    </div>
    <div class="noprint">
      <v-tabs centered color="grey darken-3">
        <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
        <v-tab to="/resume/resumeList">입사지원서 보기</v-tab>
        <v-tab to="/resume/consultresume">입사지원서 컨설팅</v-tab>
        <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
        <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
      </v-tabs>
    </div>

    <div id="submenu" class="noprint">
      <b-nav tabs align="center" class="resume_title noprint">
        <b-nav-item active
          ><router-link
            :to="{ name: 'resume', params: { id: resume.resumeNo } }"
            >기본 이력서</router-link
          ></b-nav-item
        >
        <b-nav-item
          ><router-link
            :to="{ name: 'DesignResume', params: { id: resume.resumeNo } }"
            >디자인 이력서</router-link
          ></b-nav-item
        >
        <b-nav-item
          ><router-link
            :to="{ name: 'LineResume', params: { id: resume.resumeNo } }"
            >라인 이력서</router-link
          ></b-nav-item
        >
        <!-- <b-nav-item><router-link :to="{name: 'BlindResume', params: {id: resume.resumeNo }}">블라인드 이력서</router-link></b-nav-item> -->
      </b-nav>
    </div>
    <b-container class="text-center noprint">
      작성한 정보로 제작된 기본 이력서입니다.
      <b-button @click="printResume" class="print noprint">인쇄</b-button>
    </b-container>

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <div class=" noprint">
            <p
              class="resumetitle mx-3 text-center"
              style="display:inline-block"
            >
              이력서제목
            </p>
            <span>{{ resume.rtitle }}</span>
          </div>
          <div class="resumetitle"><p>개인정보</p></div>
          <table class="resumetable">
            <tr>
              <td rowspan="6" class="resumetitle2">
                <div v-if="userData.memberPic == null">
                  <div
                    class="imagePreviewWrapper"
                    :style="{ 'background-image': `url(${previewImage})` }"
                  ></div>
                </div>
              </td>
            </tr>
            <tr>
              <td><strong>이름</strong></td>
              <td>
                {{ resume.rname }}
              </td>
              <td><strong>영문</strong></td>
              <td>
                {{ resume.engName }}
              </td>
            </tr>
            <tr>
              <td><strong>생년월일</strong></td>
              <td class="date">{{ formatDate(resume.birth) }}</td>
              <td><strong>성별</strong></td>

              <td v-if="resume.gender == 'M'">
                남
              </td>
              <td v-else>
                여
              </td>
            </tr>
            <tr>
              <td><strong>주소</strong></td>
              <td colspan="3">
                {{ resume.postcode }}) {{ resume.address }}
                {{ resume.addressDetail }}
              </td>
            </tr>

            <tr>
              <td><strong>일반전화</strong></td>
              <td>
                <input type="tel" id="telephone" v-model="resume.telephone" />
              </td>
              <td><strong>휴대전화</strong></td>
              <td>
                <input type="tel" readonly v-model="resume.rphone" id="phone" />
              </td>
            </tr>
            <tr>
              <td><strong>이메일</strong></td>
              <td colspan="3">
                {{ resume.remail }}
              </td>
            </tr>
          </table>

          <div class="resumetitle"><p>학력사항</p></div>
          <table class="resumetable">
            <tr>
              <td class="school"><strong>학력구분</strong></td>
              <td><strong>학교명</strong></td>
              <td colspan="2"><strong>기간</strong></td>
              <td><strong>전공학과</strong></td>
              <td><strong>상태</strong></td>
            </tr>
            <tr>
              <td v-if="resume.school1 == 'middleshcool'">
                중학교
              </td>
              <td v-else-if="resume.school1 == 'highscool'">
                고등학교
              </td>

              <td v-else-if="resume.school1 == 'college'">
                초대졸(전문학사)
              </td>
              <td v-else-if="resume.school1 == 'university'">
                대졸(학사)
              </td>

              <td v-else-if="resume.school1 == 'master'">
                석사
              </td>
              <td v-else-if="resume.school1 == 'doctor'">
                박사
              </td>

              <td>
                {{ resume.schoolName1 }}
              </td>
              <td colspan="2" class="date">
                {{ formatDate(resume.schoolStartDate1) }} ~
                {{ formatDate(resume.schoolFinishDate1) }}
              </td>
              <td>
                {{ resume.major1 }}
              </td>
              <td v-if="resume.education1 == 'graduation'">
                졸업
              </td>
              <td v-else-if="resume.education1 == 'prograduation'">
                졸업예정
              </td>
              <td v-else-if="resume.education1 == 'student'">
                재학
              </td>
              <td v-else-if="resume.education1 == 'stopout'">
                휴학
              </td>
              <td v-else-if="resume.education1 == 'leaveschool'">
                중퇴
              </td>
              <td v-else-if="resume.education1 == 'qualificationExam'">
                검정고시
              </td>
            </tr>
            <tr>
              <td v-if="resume.school2 == 'middleshcool'">
                중학교
              </td>
              <td v-else-if="resume.school2 == 'highscool'">
                고등학교
              </td>

              <td v-else-if="resume.school2 == 'college'">
                초대졸(전문학사)
              </td>
              <td v-else-if="resume.school2 == 'university'">
                대졸(학사)
              </td>

              <td v-else-if="resume.school2 == 'master'">
                석사
              </td>
              <td v-else-if="resume.school2 == 'doctor'">
                박사
              </td>
              <td>
                {{ resume.schoolName2 }}
              </td>
              <td colspan="2" class="date">
                {{ formatDate(resume.schoolStartDate2) }} ~
                {{ formatDate(resume.schoolFinishDate2) }}
              </td>
              <td>
                {{ resume.major2 }}
              </td>
              <td v-if="resume.education2 == 'graduation'">
                졸업
              </td>
              <td v-else-if="resume.education2 == 'prograduation'">
                졸업예정
              </td>
              <td v-else-if="resume.education2 == 'student'">
                재학
              </td>
              <td v-else-if="resume.education2 == 'stopout'">
                휴학
              </td>
              <td v-else-if="resume.education2 == 'leaveschool'">
                중퇴
              </td>
              <td v-else-if="resume.education2 == 'qualificationExam'">
                검정고시
              </td>
            </tr>
          </table>

          <div class="resumetitle"><p>경력사항</p></div>
          <table class="resumetable">
            <tr>
              <td colspan="2"><strong>기간</strong></td>
              <td><strong>회사명</strong></td>
              <td><strong>직급/직책</strong></td>
              <td><strong>상태</strong></td>
            </tr>
            <tr>
              <td colspan="2" class="date">
                {{ formatDate(resume.workStartDate) }} ~
                {{ formatDate(resume.workFinishDate) }}
              </td>
              <td>
                {{ resume.workName }}
              </td>
              <td>
                {{ resume.workLevel }}
              </td>
              <td
                class="career-content"
                v-if="resume.workState == 'resignation'"
              >
                퇴사
              </td>
              <td class="career-content" v-else-if="resume.workState == 'work'">
                재직
              </td>
            </tr>
            <tr>
              <td colspan="2">주요직무 및 업무</td>
              <td colspan="3">
                {{ resume.workDetail }}
              </td>
            </tr>
          </table>

          <div class="resumetitle"><p>자격증</p></div>
          <table class="resumetable">
            <tr>
              <td><strong>자격증명</strong></td>
              <td><strong>발급기관</strong></td>
              <td><strong>취득일</strong></td>
            </tr>
            <tr>
              <td>
                {{ resume.licenseName }}
              </td>
              <td>
                {{ resume.licenseAgency }}
              </td>
              <td class="date">{{ formatDate(resume.licenseDate) }}</td>
            </tr>
          </table>

          <div class="resumetitle"><p>외국어능력</p></div>
          <table class="resumetable">
            <tr>
              <td><strong>외국어</strong></td>
              <td><strong>수준</strong></td>
              <td><strong>공인시험</strong></td>
              <td><strong>점수/등급</strong></td>
              <td><strong>응시일</strong></td>
            </tr>
            <tr>
              <td>
                {{ resume.languageName }}
              </td>
              <td>
                {{ resume.languageLevel }}
              </td>
              <td>
                {{ resume.languageTest }}
              </td>
              <td>
                <input
                  type="text"
                  id="languageScore"
                  v-model="resume.languageScore"
                />
              </td>
              <td class="date">{{ formatDate(resume.languageDate) }}</td>
            </tr>
          </table>

          <div class="resumetitle"><p>주요 활동 및 수상</p></div>
          <table class="resumetable">
            <tr>
              <td><strong>구분</strong></td>
              <td colspan="2"><strong>기간/일자</strong></td>
              <td><strong>기관명</strong></td>
              <td><strong>내용/내역</strong></td>
            </tr>
            <tr>
              <td v-if="resume.activity == 'award'">
                수상경력
              </td>
              <td v-else-if="resume.activity == 'volunteer'">
                봉사활동
              </td>
              <td v-else-if="resume.activity == 'social'">
                사회활동
              </td>
              <td v-else-if="resume.activity == 'intern'">
                인턴
              </td>
              <td v-else-if="resume.activity == 'club'">
                동아리 및 교내활동
              </td>
              <td colspan="2" class="date">
                {{ formatDate(resume.activityStartDate) }} ~

                {{ formatDate(resume.activityFinishDate) }}
              </td>
              <td>
                {{ resume.activityAgency }}
              </td>
              <td>
                {{ resume.activityWork }}
              </td>
            </tr>
            <tr>
              <td><strong>주요 활동 및 성과</strong></td>
              <td colspan="4">
                {{ resume.activityDetail }}
              </td>
            </tr>
          </table>

          <div class="resumetitle"><p>참여 프로젝트</p></div>
          <table class="resumetable">
            <tr>
              <td><strong>구분(개인/팀/기획)</strong></td>
              <td colspan="2"><strong>기간</strong></td>
              <td><strong>프로젝트명</strong></td>
              <td><strong>수행업무</strong></td>
            </tr>
            <tr>
              <td v-if="resume.projectPart == 'team'">
                그룹
              </td>
              <td v-else-if="resume.projectPart == 'person'">
                개인
              </td>
              <td v-else-if="resume.projectPart == 'order'">
                기획
              </td>
              <td colspan="2" class="date">
                {{ formatDate(resume.projectStartDate) }} ~
                {{ formatDate(resume.projectFinishDate) }}
              </td>
              <td>
                {{ resume.projectName }}
              </td>
              <td>
                {{ resume.projectWork }}
              </td>
            </tr>
            <tr>
              <td><strong>주요 업무 및 성과</strong></td>
              <td colspan="4">
                {{ resume.projectDetail }}
              </td>
            </tr>
          </table>

          <div class="resumetitle"><p>해외경험</p></div>
          <table class="resumetable">
            <tr>
              <td><strong>구분</strong></td>
              <td colspan="2"><strong>기간/일자</strong></td>
              <td><strong>국가</strong></td>
              <td><strong>기관/경험</strong></td>
            </tr>
            <tr>
              <td v-if="resume.abroad == 'award'">
                해외연수
              </td>
              <td v-else-if="resume.abroad == 'volunteer'">
                해외봉사
              </td>
              <td v-else-if="resume.abroad == 'social'">
                해외취업
              </td>

              <td colspan="2" class="date">
                {{ formatDate(resume.abroadStartDate) }} ~
                {{ formatDate(resume.abroadFinishDate) }}
              </td>
              <td>
                <input
                  type="text"
                  id="abroadCountury"
                  v-model="resume.abroadCountury"
                />
              </td>
              <td>
                {{ resume.abroadAgency }}
              </td>
            </tr>
            <tr>
              <td><strong>주요활동</strong></td>
              <td colspan="4">
                {{ resume.abroadDetail }}
              </td>
            </tr>
          </table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

export default {
  data: () => ({
    previewImage: null,
    resumePhoto: null,
    files: "",
  }),
  created() {
    const resumeNo = this.$route.params.id;
    this.$store.dispatch("FETCH_RESUME", resumeNo);

    axios
      .get(
        "http://localhost:8082/itjobgo/resume/selectAttachment?resumeNo=" +
          resumeNo,
        { responseType: "arraybuffer" }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));

        this.previewImage = url;
      });
  },

  computed: {
    ...mapState({
      resume: (state) => state.resume,
    }),
    ...loadUserState(["userData"]),
  },
  methods: {
    printResume() {
      window.print();
    },
    formatDate(value) {
      return this.$moment(value).format("YYYY-MM-DD");
    },
  },
};
</script>
<style scoped>
@media print {
  .noprint {
    display: none;
  }
}

* {
  font-family: "Noto Sans KR", sans-serif;
}

.resume {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
/* 개인정보 */

.resumetable {
  table-layout: fixed;
  width: 100%;
}
.resumetitle2 {
  width: 30%;
}
input {
  text-align: center;
}
#submenu {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
#insertresume {
  display: flex;
  align-content: center;
}

.print {
  margin-left: 80%;
}
tr,
td {
  width: 50px;
  border: 2px solid grey;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: center;
}
.personalTitle {
  width: 50px;
}
.imagefile {
  width: 50px;
}
.submenuimage {
  background-image: url("../../assets/images/resume.jpeg");
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

.saveresume {
  margin-left: 80%;
}

.savebtn {
  margin-right: 10px;
}
div .resumetitle {
  width: 250px;
  background-color: #394867;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 15px;
  margin-left: 20px;
  text-align: center;
  color: #f1f6f9;
  border-radius: 30px;
}
button {
  margin-top: 20px;
  margin-bottom: 20px;
}
#submit {
  margin-left: 45%;
  background-color: #424874;
  border-color: #424874;
}
#reset {
  margin-left: 10px;
  background-color: #9ba4b4;
  border-color: #9ba4b4;
}
.date {
  width: 100px;
}

#rtitle {
  width: 700px;
  height: 40px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}

.imagePreviewWrapper {
  display: block;
  width: 150px;
  height: 200px;
  padding: 9px;
  margin: 30px auto 10px;
  border: 1px solid #ddd;
  background: #fff;
  background-size: cover;
  background-position: center center;
}

input[type="file"] {
  position: absolute;

  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.resume_title * {
  color: #4e5157;
  font-size: 15px;
  font-weight: bold;
}
select {
  border: none;
  text-align: center;
  width: 150px;
}
textarea {
  border: none;
  resize: none;
}
</style>

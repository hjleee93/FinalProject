<template>
  <!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
  <div class="Line_resume">
    <div class="submenuimage noprint">
      <p class="subtitle">LINE RESUME</p>
    </div>
    <div class="noprint">
      <v-tabs centered color="grey darken-3">
        <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
        <v-tab active to="/resume/resumeList">입사지원서 보기</v-tab>
        <v-tab to="/resume/consultresume">입사지원서 컨설팅</v-tab>
        <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
        <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
      </v-tabs>
    </div>
    <div id="submenu" class="noprint">
      <b-nav tabs align="center" class="resume_title noprint">
        <b-nav-item
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
        <b-nav-item active
          ><router-link
            :to="{ name: 'LineResume', params: { id: resume.resumeNo } }"
            >라인 이력서</router-link
          ></b-nav-item
        >
        <!-- <b-nav-item><router-link :to="{name: 'BlindResume', params: {id: resume.resumeNo }}">블라인드 이력서</router-link></b-nav-item> -->
      </b-nav>
    </div>

    <b-container class="text-center noprint">
      <span>기본 이력서를 바탕으로 제작된 라인형식의 이력서 입니다.</span>
      <b-button @click="printResume" class="print noprint">인쇄</b-button>
    </b-container>

    <b-container class="bv-example-row pl-5">
      <table class="person_table">
        <div class="name">{{ resume.rname }}</div>
        <div class="resumetitle">개인정보</div>
        <div class="hr"></div>
        <tr>
          <th class="person_title"><strong>생년월일</strong></th>
          <td>{{ formatDate(resume.birth) }}</td>
        </tr>
        <tr>
          <th class="person_title"><strong>주소</strong></th>
          <td>{{ resume.address }} {{ resume.addressDetail }}</td>
        </tr>

        <tr>
          <th class="person_title"><strong>일반전화</strong></th>
          <td>
            {{ resume.telephone }}
          </td>
        </tr>
        <tr>
          <th class="person_title"><strong>휴대전화</strong></th>
          <td>
            {{ resume.rphone }}
          </td>
        </tr>
        <tr>
          <th class="person_title"><strong>이메일</strong></th>
          <td>
            {{ resume.remail }}
          </td>
        </tr>
        <div class="hr"></div>
      </table>

      <table class="edu_table">
        <div class="resumetitle">학력사항</div>
        <div class="hr"></div>
        <tr>
          <td class="education_div">
            {{ formatDate(resume.schoolStartDate1) }}~{{
              formatDate(resume.schoolFinishDate1)
            }}
          </td>
        </tr>
        <tr>
          <td>
            {{ resume.schoolName1 }}
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
        <div class="hr"></div>
      </table>

      <table class="work_table">
        <div class="resumetitle">경력사항</div>
        <div class="hr"></div>
        <tr>
          <td><strong>기간</strong></td>
          <td>
            {{ formatDate(resume.workStartDate) }}~
            {{ formatDate(resume.workFinishDate) }}
          </td>
        </tr>
        <tr>
          <td><strong>회사명</strong></td>
          <td>
            {{ resume.workName }}
          </td>
        </tr>

        <tr>
          <td><strong>직급/직책</strong></td>
          <td>
            {{ resume.workLevel }}
          </td>
        </tr>
        <tr>
          <td><strong>상태</strong></td>
          <td class="career-content" v-if="resume.workState == 'resignation'">
            퇴사
          </td>
          <td class="career-content" v-else-if="resume.workState == 'work'">
            재직
          </td>
        </tr>
        <tr>
          <td><strong>주요직무 및 업무</strong></td>
          <td>
            {{ resume.workDetail }}
          </td>
        </tr>
        <div class="hr"></div>
      </table>

      <div class="resumetitle">자격증</div>
      <div class="hr"></div>
      <table class="certi_table">
        <tr>
          <td><strong>자격증명</strong></td>
          <td><strong>발급기관</strong></td>
          <td><strong>취득일</strong></td>
        </tr>
        <tr>
          <td>{{ resume.licenseName }}</td>
          <td>{{ resume.licenseAgency }}</td>
          <td>{{ formatDate(resume.licenseDate) }}</td>
        </tr>
      </table>

      <div class="hr"></div>

      <div class="resumetitle">참여 프로젝트</div>
      <div class="hr"></div>

      <table class="project-table">
        <tr>
          <td><strong>구분(개인/팀/기획)</strong></td>
          <td v-if="resume.projectPart == 'team'">
            그룹
          </td>
          <td v-else-if="resume.projectPart == 'person'">
            개인
          </td>
          <td v-else-if="resume.projectPart == 'order'">
            기획
          </td>
        </tr>

        <tr>
          <td><strong>기간</strong></td>
          <td>
            {{ formatDate(resume.projectStartDate) }}~
            {{ formatDate(resume.projectFinishDate) }}
          </td>
        </tr>
        <tr>
          <td><strong>프로젝트명</strong></td>
          <td>{{ resume.projectName }}</td>
        </tr>
        <tr>
          <td><strong>수행업무</strong></td>
          <td>{{ resume.projectWork }}</td>
        </tr>
        <tr>
          <td><strong>주요 업무 및 성과</strong></td>
          <td>
            {{ resume.projectDetail }}
          </td>
        </tr>
      </table>

      <div class="hr"></div>
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
    formatDate(value) {
      return this.$moment(value).format("YYYY-MM-DD");
    },
    //인쇄 메소드
    printResume() {
      window.print();
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
.print {
  float: right;
  background-color: #0278ae;
  border: none;
}

* {
  font-family: "Noto Sans KR", sans-serif;
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
.submenuimage {
  width: 100%;
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
.Line_resume {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#submenu {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
#insertresume {
  display: flex;
}

table {
  width: 700px;
  text-align: center;
  table-layout: fixed;
  word-wrap: break-word;
}
.person_table {
  width: 500px;
  text-align: left;
}
.person_table th {
  width: 50px;
}
.edu_table {
  text-align: left;
}
.work_table {
  text-align: left;
}

.work_input {
  width: 250px;
}

.person_title {
  width: 100px;
}
b-form-select {
  width: 130px;
}
div .name {
  width: 100px;
  font-size: 30px;
  font-weight: bold;

  text-align: left;
}
div .resumetitle {
  width: 200px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 15px;
  text-align: left;
}

.hr {
  width: 900px;
  height: 5px;
  background-color: #424874;
  margin-top: 20px;
  margin-bottom: 20px;
}

.hr2 {
  width: 900px;
  height: 3px;
  background-color: #424874;
  margin-top: 20px;
  margin-bottom: 20px;
}
input {
  width: 180px;
  /* border: none; */
}
.personinfo {
  width: 400px;
}
.email {
  width: 195px;
}

.emailselect {
  width: 180px;
}
.select_project {
  width: 100px;
}
.education_div {
  width: 500px;
}

.select_school {
  width: 200px;
  margin-left: 10px;
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
.resume_title * {
  color: #4e5157;
  font-size: 15px;
  font-weight: bold;
}
select {
  border: none;
}
textarea {
  border: none;
  resize: none;
}
.certi_table,
.project-table {
  text-align: left;
}
</style>

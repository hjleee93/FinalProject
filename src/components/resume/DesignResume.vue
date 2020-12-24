<template>
  <!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
  <div class="Design_resume ">
    <div class="submenuimage noprint">
      <p class="subtitle">DESIGN RESUME</p>
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
        <b-nav-item
          ><router-link
            :to="{ name: 'resume', params: { id: resume.resumeNo } }"
            >기본 이력서</router-link
          ></b-nav-item
        >
        <b-nav-item active
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
      기본 이력서를 바탕으로 제작된 디자인 이력서 입니다.
      <b-button @click="printResume" class="print noprint">인쇄</b-button>
    </b-container>

    <b-container class="bv-example-row" id="resumeContainer">
      <div class="resumen-name text-center pb-4">
        <div class="rname">
          <h1 class="rname">{{ resume.rname }}</h1>
        </div>
        <h4>{{ resume.engName }}</h4>
      </div>
      <b-row class="text-center">
        <b-col class="profile" cols="5">
          <div>
            <b-card title="" class="person_info">
              <div
                class="imagePreviewWrapper"
                :style="{ 'background-image': `url(${previewImage})` }"
              ></div>
            </b-card>
          </div>

          <b-card title="CONTACT ME" class="person_info ">
            <div class=" contact my-2">
              <img
                class="person_images text-center"
                src="../../assets/images/phone.png"
                fluid
                alt="Responsive image"
              />
              {{ resume.telephone }}
            </div>
            <div class="contact my-2">
              <img
                class="person_images"
                src="../../assets/images/home.png"
                fluid
                alt="Responsive image"
              />
              {{ userData.memberAddr }} {{ userData.memberAddrDtl }}
            </div>
            <div class="contact my-2">
              <img
                class="person_images"
                src="../../assets/images/email.png"
                fluid
                alt="Responsive image"
              />
              {{ resume.remail }}
            </div>
          </b-card>

          <b-card title="EDUCATION" class="person_info">
            <table class="edu_table">
              <!-- 고등학교 -->
              <tr>
                <td class="school-name">{{ resume.schoolName2 }}</td>

                <td class="education_div">
                  {{ formatDate(resume.schoolStartDate2) }}~{{
                    formatDate(resume.schoolFinishDate2)
                  }}
                </td>
              </tr>
              <!-- 중학교 -->
              <tr>
                <td class="school-name">{{ resume.schoolName1 }}</td>

                <td class="education_div">
                  {{ formatDate(resume.schoolStartDate1) }}~{{
                    formatDate(resume.schoolFinishDate1)
                  }}
                </td>
              </tr>
            </table>
          </b-card>

          <b-card title="LANGUAGE" class="person_info">
            <table class="languages_table">
              <tr>
                <td><input type="text" v-model="resume.languageName" /></td>
                <td>
                  <input
                    type="text"
                    class="languages_level text-center"
                    v-model="resume.languageLevel"
                  />
                  - <input v-model="resume.languageScore" />
                </td>
              </tr>
            </table>
          </b-card>
        </b-col>

        <b-col cols="7">
          <b-card title="CAREER" class="person_info2" style="margin-top:32px">
            <div class="text-center">
              <table class="person_table ">
                <tr>
                  <td class="career-title"><strong>기간</strong></td>
                  <td class="career-content">
                    {{ formatDate(resume.workStartDate) }}~
                    {{ formatDate(resume.workFinishDate) }}
                  </td>
                </tr>
                <tr>
                  <td class="career-title"><strong>회사명</strong></td>
                  <td class="career-content">
                    {{ resume.workName }}
                  </td>
                </tr>

                <tr>
                  <td class="career-title"><strong>직급/직책</strong></td>
                  <td class="career-content">
                    {{ resume.workLevel }}
                  </td>
                </tr>
                <tr>
                  <td class="career-title"><strong>상태</strong></td>

                  <td
                    class="career-content"
                    v-if="resume.workState == 'resignation'"
                  >
                    퇴사
                  </td>
                  <td
                    class="career-content"
                    v-else-if="resume.workState == 'work'"
                  >
                    재직
                  </td>
                </tr>
                <tr>
                  <td class="career-title"><strong>주요 업무</strong></td>
                  <td class="career-content">
                    {{ resume.workDetail }}
                  </td>
                </tr>
              </table>
            </div>
          </b-card>

          <b-card title="CERTIFICATE" class="person_info2">
            <table class="license_table ">
              <tr class="my-3">
                <td style="width:120px"><strong>자격증명</strong></td>
                <td style="width:200px"><strong>발급기관</strong></td>
                <td style="width:120px"><strong>취득일</strong></td>
              </tr>
              <tr>
                <td>{{ resume.licenseName }}</td>
                <td>{{ resume.licenseAgency }}</td>
                <td>{{ formatDate(resume.licenseDate) }}</td>
              </tr>
            </table>
          </b-card>

          <b-card title="PROJECT" class="person_info2">
            <table class="project_table">
              <tr>
                <td><strong>구분</strong></td>
                <td colspan="2"><strong>기간</strong></td>
                <td><strong>프로젝트명</strong></td>
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
                <td>{{ formatDate(resume.projectStartDate) }}~</td>

                <td>{{ formatDate(resume.projectFinishDate) }}</td>
                <td>{{ resume.projectName }}</td>
              </tr>
              <tr>
                <td><strong>주요 업무 및 성과</strong></td>
                <td colspan="4">
                  {{ resume.projectDetail }}
                </td>
              </tr>
            </table>
          </b-card>

          <b-card title="EXPERIENCE" class="person_info2">
            <table class="ex_table">
              <tr>
                <td><strong>구분</strong></td>
                <td colspan="2"><strong>기간/일자</strong></td>
                <td><strong>기관명</strong></td>
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

                <td>{{ formatDate(resume.activityStartDate) }}</td>
                <td>{{ formatDate(resume.activityFinishDate) }}</td>
                <td>{{ resume.activityAgency }}</td>
              </tr>
              <tr>
                <td><strong>주요 업무 및 성과</strong></td>
                <td colspan="4">
                  {{ resume.activityDetail }}
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
import axios from "axios";
import { mapState } from "vuex";
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

export default {
  data: () => ({
    previewImage: null,
    resumePhoto: null,
    files: "",
    mainProps: {
      blank: true,
      blankColor: "#777",
      width: 200,
      height: 200,
      class: "m1",
    },
  }),
  created() {
    const resumeNo = this.$route.params.id;
    this.$store.dispatch("FETCH_RESUME", resumeNo);

    axios
      .get(
        "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/itjobgo/resume/selectAttachment?resumeNo=" +
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
.subtitle {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
  font-size: 50px;
}
.profile {
  border-right: 2px solid #4e5157;
}
/* 이름 */
.rname {
  font-size: 3.5rem;
}
.resumen-name {
  border-bottom: 3px solid #4e5157;
}
.card-title {
  font-size: 25px;
  padding-bottom: 8px;
  color: #0278ae;
  /* border-bottom: 3px solid #4e5157; */
}
.print {
  float: right;
  background-color: #0278ae;
  border: none;
}
.Design_resume {
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
.bv-example-row {
  margin-bottom: 100px;
}

.person_info {
  /* background-color: #f4eeff; */
  border: none;
}
.person_info2 {
  border: none;
  margin-bottom: 20px;
}
b-card {
  margin-top: 20px;
}

.name {
  width: 100%;
  height: 150px;

  border: none;
}

.person_images {
  width: auto;
  height: auto;
  max-width: 20px;
  max-height: 20px;
  margin-right: 10px;
}
/* Education */
.school-name {
  width: 40%;
}
.edu_table {
  text-align: center;
  margin-left: 10%;
}
.edu_table > tr {
  height: 50px !important;
}
.edu_table input {
  width: 150px;
}
.select_school {
  width: 100px;
}
.work_table {
  margin-left: 10%;
  text-align: left;
}
.license_table,
.project_table,
.ex_table {
  margin: 0 auto;
}
.languages_table {
  margin-left: 15%;
  text-align: center;
}
.languages_table input {
  width: 50%;
  margin-left: 10px;
}
.languages_table .languages_level {
  width: 50px;
}
.imagePreviewWrapper {
  display: block;
  width: 200px;
  height: 250px;
  padding: 9px;
  margin: 30px auto 10px;
  border-radius: 50px;
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
/* career */
.career-title {
  text-align: right;
  width: 100px;
  padding-right: 20px;
}
.career-content {
  text-align: left;
  width: 200px;
}
.person_table {
  display: inline-block;
}
.person_table tr,
.license_table tr,
.project_table tr,
.ex_table tr {
  height: 35px;
}
</style>

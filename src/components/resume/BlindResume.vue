<template>
  <!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
  <div class="blind_resume">
    <div class="submenuimage">
      <p class="subtitle">Consult Resume</p>
    </div>
    <div class="resume_menu">
      <v-tabs centered color="grey darken-3">
        <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
        <v-tab active to="/resume/resumeList">입사지원서 보기</v-tab>
        <v-tab to="/resume/consultresume">입사지원서 컨설팅</v-tab>
        <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
        <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
      </v-tabs>
    </div>
    <div id="submenu">
      <b-nav tabs align="center" class="resume_title">
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
        <b-nav-item
          ><router-link
            :to="{ name: 'LineResume', params: { id: resume.resumeNo } }"
            >라인 이력서</router-link
          ></b-nav-item
        >
        <b-nav-item active
          ><router-link
            :to="{ name: 'BlindResume', params: { id: resume.resumeNo } }"
            >블라인드 이력서</router-link
          ></b-nav-item
        >
      </b-nav>
    </div>

    <div>
      <b-button v-b-modal.modal-xl class="print">인쇄</b-button>
      <b-modal id="modal-xl" size="xl" title="Extra Large Modal"> </b-modal>
    </div>

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <form>
            <table id="resumetable">
              <tr>
                <td colspan="6" class="blind_title">
                  <strong>1. 인적사항</strong>
                </td>
              </tr>
              <tr>
                <td><strong>지원구분</strong></td>
                <td>
                  <b-form-select>
                    <b-form-select-option value="newEmployee"
                      >신입</b-form-select-option
                    >
                    <b-form-select-option value="workedEmployee"
                      >경력</b-form-select-option
                    >
                  </b-form-select>
                </td>
                <td><strong>지원직무</strong></td>
                <td><input type="text" /></td>
                <td><strong>접수번호</strong></td>
                <td><input type="number" /></td>
              </tr>
              <tr>
                <td><strong>성명</strong></td>
                <td colspan="5">
                  <input
                    type="text"
                    placeholder="이름"
                    v-model="resume.rname"
                  />
                </td>
              </tr>
              <tr>
                <td><strong>현주소</strong></td>
                <td colspan="5">
                  <input
                    type="text"
                    placeholder="도로명 주소"
                    v-model="resume.address"
                  />
                </td>
              </tr>
              <tr>
                <td rowspan="2"><strong>연락처</strong></td>
                <td colspan="2">
                  <input
                    type="tel"
                    placeholder="본인휴대폰"
                    v-model="resume.rphone"
                  />
                </td>
                <td rowspan="2"><strong>전자우편</strong></td>
                <td rowspan="2" colspan="2">
                  <input type="email" v-model="resume.remail" />
                </td>
              </tr>
              <td colspan="2">
                <input
                  type="tel"
                  placeholder="비상연락처"
                  v-model="resume.telephone"
                />
              </td>
              <tr></tr>
              <tr>
                <td><strong>최종학교소재지</strong></td>
                <td colspan="2"><input type="text" /></td>
                <td>가점항목</td>
                <td colspan="2">
                  <b-form-checkbox>장애대상</b-form-checkbox>
                  <b-form-checkbox>보훈대상자</b-form-checkbox>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td colspan="6" class="blind_title">
                  <strong>2. 교육사항</strong>
                </td>
              </tr>
              <tr>
                <td><strong>교육구분</strong></td>
                <td><strong>과목명 및 교육과정</strong></td>
                <td><strong>교육시간</strong></td>
              </tr>
              <tr>
                <td>
                  <b-form-radio-group
                    id="radio-group-2"
                    name="radio-sub-component"
                  >
                    <b-form-radio value="school">학교교육</b-form-radio>
                    <b-form-radio value="academy">직업훈련</b-form-radio>
                    <b-form-radio value="etc">기타</b-form-radio>
                  </b-form-radio-group>
                </td>
                <td><input type="text" placeholder="과목명/교육과정" /></td>
                <td><input type="text" placeholder="교육시간" /></td>
              </tr>
              <tr>
                <td colspan="3"><strong>직무관련 주요내용</strong></td>
              </tr>
              <tr>
                <td colspan="3">
                  <b-form-textarea
                    id="textarea"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td colspan="6" class="blind_title">
                  <strong>3. 자격사항</strong>
                </td>
              </tr>
              <tr>
                <td><strong>자격증명</strong></td>
                <td><strong>발급기관</strong></td>
                <td><strong>취득일</strong></td>
              </tr>
              <tr>
                <td><input type="text" v-model="resume.licenseName" /></td>
                <td><input type="text" v-model="resume.licenseAgency" /></td>
                <td>{{ formatDate(resume.licenseDate) }}</td>
              </tr>
              <tr>
                <td colspan="1">주요직무 및 업무</td>
                <td colspan="2">
                  <b-form-textarea
                    id="textarea"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td colspan="6" class="blind_title">
                  <strong>4. 경험 혹은 경력사항</strong>
                </td>
              </tr>
              <tr>
                <td><strong>구분</strong></td>
                <td><strong>소속조직</strong></td>
                <td><strong>역할</strong></td>
                <td colspan="2"><strong>활동기간</strong></td>
                <td><strong>활동내용</strong></td>
              </tr>
              <tr>
                <td>
                  <b-form-radio-group
                    id="radio-group-2"
                    name="radio-sub-component"
                  >
                    <b-form-radio value="school">경험</b-form-radio>
                    <b-form-radio value="academy">경력</b-form-radio>
                  </b-form-radio-group>
                </td>
                <td><input type="text" v-model="resume.workName" /></td>
                <td><input type="text" v-model="resume.workLevel" /></td>
                <td>{{ formatDate(resume.workStartDate) }}</td>
                <td>{{ formatDate(resume.workFinishDate) }}</td>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <td colspan="6"><strong>직무관련 주요내용</strong></td>
              </tr>
              <tr>
                <td colspan="6">
                  <b-form-textarea
                    id="textarea"
                    rows="3"
                    max-rows="6"
                    v-model="resume.workDetail"
                  ></b-form-textarea>
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
        "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/resume/selectAttachment?resumeNo=" +
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
  },
};
</script>
<style scoped>
.print {
  margin-left: 80%;
}
.blind_resume {
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

#resumetable {
  table-layout: fixed;
}

.resume_form {
  width: 100%;
}
tr,
td {
  border: 2px solid grey;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: center;
}
table {
  margin-top: 30px;
  margin-bottom: 30px;
}
.blind_title {
  background-color: lightblue;
  text-align: left;
  font-size: 20px;
}
p {
  font-weight: border;
  font-size: 20px;
  font-family: a아시아헤드4;
}

.gender {
  display: inline;
}
.resumetitle2 {
  width: 100px;
}
.submenuimage {
  width: 100%;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.subtitle {
  font-family: "Masque";
  color: #4e5157;
  font-size: 50px;
}
div .resumetitle {
  width: 180px;
  background-color: #394867;
  font-size: 17px;
  margin-top: 30px;
  margin-bottom: 15px;
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

.school {
  width: 150px;
}

.resume_title * {
  color: #4e5157;
  font-size: 15px;
  font-weight: bold;
}
</style>

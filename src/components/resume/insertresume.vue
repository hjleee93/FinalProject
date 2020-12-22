<template>
  <!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
  <div class="insert_resume">
    <div class="submenuimage">
      <p class="subtitle">입사지원서 등록</p>
    </div>
    <div>
      <v-tabs centered color="grey darken-3">
        <v-tab active to="/resume/insertresume">입사지원서 등록</v-tab>
        <v-tab to="/resume/resumeList">입사지원서 보기</v-tab>
        <v-tab to="/resume/consultresume">입사지원서 컨설팅</v-tab>
        <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
        <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
      </v-tabs>
    </div>

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <form @submit.prevent="insertResume" enctype="multipart/form-data">
            <div class="resumetitle"><p>이력서제목</p></div>
            <div>
              <input
                type="text"
                id="rtitle"
                v-model="rtitle"
                placeholder="이력서 제목을 입력하세요"
              />
            </div>
            <div class="resumetitle"><p>개인정보</p></div>
            <table class="resumetable">
              <tr>
                <td rowspan="7" class="resumetitle2">
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
                  <input
                    type="text"
                    placeholder="이름"
                    id="name"
                    readonly
                    v-model="userData.memberName"
                  />
                </td>
                <td><strong>영문</strong></td>
                <td>
                  <input
                    type="text"
                    placeholder="영문 이름"
                    id="engName"
                    v-model="engName"
                  />
                </td>
              </tr>
              <tr>
                <td><strong>생년월일</strong></td>
                <td><input type="date" id="birth" v-model="birth" /></td>
                <td><strong>성별</strong></td>
                <td>
                  <b-form-group class="gender" inline="true">
                    <b-form-radio name="gender" value="M" v-model="gender"
                      >남</b-form-radio
                    >
                    <b-form-radio name="gender" value="F" v-model="gender"
                      >여</b-form-radio
                    >
                  </b-form-group>
                </td>
              </tr>
              <tr>
                <td rowspan="3"><strong>주소</strong></td>

                <!-- 주소검색 -->
                <td colspan="2">
                  <b-form-input
                    class="readonly-input postcode"
                    type="text"
                    id="sample6_postcode"
                    v-model="userData.memberPostCode"
                    placeholder="우편번호"
                  ></b-form-input>
                </td>
                <td>
                  <b-button class="findPostcode" @click="daumPostcode()"
                    >우편번호 찾기</b-button
                  >
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
                    v-model="userData.memberAddr"
                    placeholder="도로명 주소"
                  ></b-form-input>
                </td>
              </tr>
              <tr>
                <!-- <td colspan="3"><input class="address" type="text" placeholder="상세주소" v-model="addressDetail"></td> -->
                <td colspan="2">
                  <b-form-input
                    class="readonly-input addrDtl"
                    type="text"
                    id="sample6_detailAddress"
                    placeholder="상세주소를 입력해주세요"
                    v-model="userData.memberAddrDtl"
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input
                    class="readonly-input addrExtra"
                    type="text"
                    id="sample6_extraAddress"
                    v-model="userData.memberAddrExtra"
                    placeholder="시/구/동/가"
                  ></b-form-input>
                </td>
              </tr>
              <tr>
                <td><strong>일반전화</strong></td>
                <td><input type="tel" id="telephone" v-model="telephone" /></td>
                <td><strong>휴대전화</strong></td>
                <td>
                  <input
                    type="tel"
                    readonly
                    v-model="userData.memberPhone"
                    id="phone"
                  />
                </td>
              </tr>
              <tr>
                <td class="resumetitle2">
                  <!-- <b-btn class="upload-photo">
                                <label for="uploadPhoto">사진선택</label>
                                    <b-form-file 
                                        v-on:change="handleFile"
                                        id="files" 
                                        ref="upfiles"
                                        v-model="resumePhoto"
                                        >
                                    </b-form-file>
                            </b-btn> -->
                  <b-btn class="upload-photo">
                    <label for="uploadPhoto">사진선택</label
                    ><b-form-file
                      ref="fileInput"
                      id="uploadPhoto"
                      v-model="resumePhoto"
                      style="display:none"
                      @input="pickFile"
                      v-on:change="handleFile"
                    ></b-form-file
                  ></b-btn>
                </td>

                <td><strong>이메일</strong></td>
                <td colspan="3">
                  <input
                    type="email"
                    id="email"
                    readonly
                    v-model="userData.memberEmail"
                  />
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
                <td>
                  <b-form-select class="school" v-model="school1">
                    <b-form-select-option value="middleshcool"
                      >중학교</b-form-select-option
                    >
                    <b-form-select-option value="highscool"
                      >고등학교</b-form-select-option
                    >
                    <b-form-select-option value="college"
                      >대학교(2/3년)</b-form-select-option
                    >
                    <b-form-select-option value="university"
                      >대학교(4년)</b-form-select-option
                    >
                    <b-form-select-option value="master"
                      >대학원(석사)</b-form-select-option
                    >
                    <b-form-select-option value="doctor"
                      >대학원(박사)</b-form-select-option
                    >
                  </b-form-select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="학교명"
                    id="schoolName1"
                    v-model="schoolName1"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id="schoolStartDate1"
                    v-model="schoolStartDate1"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id="schoolFinishDate1"
                    v-model="schoolFinishDate1"
                  />
                </td>
                <td>
                  <input type="text" placeholder="전공" v-model="major1" />
                </td>
                <td>
                  <b-form-select class="school" v-model="education1">
                    <b-form-select-option value="graduation"
                      >졸업</b-form-select-option
                    >
                    <b-form-select-option value="prograduation"
                      >졸업예정</b-form-select-option
                    >
                    <b-form-select-option value="studying"
                      >재학</b-form-select-option
                    >
                    <b-form-select-option value="stopout"
                      >휴학</b-form-select-option
                    >
                    <b-form-select-option value="leaveschool"
                      >중퇴</b-form-select-option
                    >
                    <b-form-select-option value="qualificationExam"
                      >검정고시</b-form-select-option
                    >
                  </b-form-select>
                </td>
              </tr>
              <tr>
                <td>
                  <b-form-select class="school" v-model="school2">
                    <b-form-select-option value="middleschool"
                      >중학교</b-form-select-option
                    >
                    <b-form-select-option value="highscool"
                      >고등학교</b-form-select-option
                    >
                    <b-form-select-option value="college"
                      >대학교(2/3년)</b-form-select-option
                    >
                    <b-form-select-option value="university"
                      >대학교(4년)</b-form-select-option
                    >
                    <b-form-select-option value="master"
                      >대학원(석사)</b-form-select-option
                    >
                    <b-form-select-option value="doctor"
                      >대학원(박사)</b-form-select-option
                    >
                  </b-form-select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="학교명"
                    id="schoolName2"
                    v-model="schoolName2"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id="schoolStartDate2"
                    v-model="schoolStartDate2"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id="schoolFinishDate2"
                    v-model="schoolFinishDate2"
                  />
                </td>
                <td>
                  <input type="text" placeholder="전공" v-model="major2" />
                </td>
                <td>
                  <b-form-select class="school" v-model="education2">
                    <b-form-select-option value="graduation"
                      >졸업</b-form-select-option
                    >
                    <b-form-select-option value="prograduation"
                      >졸업예정</b-form-select-option
                    >
                    <b-form-select-option value="studying"
                      >재학</b-form-select-option
                    >
                    <b-form-select-option value="stopout"
                      >휴학</b-form-select-option
                    >
                    <b-form-select-option value="leaveschool"
                      >중퇴</b-form-select-option
                    >
                    <b-form-select-option value="qualificationExam"
                      >검정고시</b-form-select-option
                    >
                  </b-form-select>
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
                <td>
                  <input
                    type="date"
                    id="workStartDate"
                    v-model="workStartDate"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id="workFinishDate"
                    v-model="workFinishDate"
                  />
                </td>
                <td><input type="text" id="workName" v-model="workName" /></td>
                <td>
                  <input type="text" id="workState" v-model="workLevel" />
                </td>
                <td>
                  <b-form-select class="select" v-model="workState">
                    <b-form-select-option value="resignation"
                      >퇴사</b-form-select-option
                    >
                    <b-form-select-option value="work"
                      >재직</b-form-select-option
                    >
                  </b-form-select>
                </td>
              </tr>
              <tr>
                <td colspan="2">주요직무 및 업무</td>
                <td colspan="3">
                  <b-form-textarea
                    id="textarea"
                    rows="3"
                    max-rows="6"
                    v-model="workDetail"
                  ></b-form-textarea>
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
                  <input type="text" id="licenseName" v-model="licenseName" />
                </td>
                <td>
                  <input
                    type="text"
                    id="licenseAgency"
                    v-model="licenseAgency"
                  />
                </td>
                <td>
                  <input type="date" id="licenseDate" v-model="licenseDate" />
                </td>
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
                  <input type="text" id="languageName" v-model="languageName" />
                </td>
                <td>
                  <input
                    type="text"
                    id="languageLevel"
                    v-model="languageLevel"
                  />
                </td>
                <td>
                  <input type="text" id="languageTest" v-model="languageTest" />
                </td>
                <td>
                  <input
                    type="text"
                    id="languageScore"
                    v-model="languageScore"
                  />
                </td>
                <td>
                  <input type="date" id="languageDate" v-model="languageDate" />
                </td>
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
                <td>
                  <b-form-select v-model="activity">
                    <b-form-select-option value="award"
                      >수상경력</b-form-select-option
                    >
                    <b-form-select-option value="volunteer"
                      >봉사활동</b-form-select-option
                    >
                    <b-form-select-option value="social"
                      >사회활동</b-form-select-option
                    >
                    <b-form-select-option value="intern"
                      >인턴</b-form-select-option
                    >
                    <b-form-select-option value="club"
                      >동아리 및 교내활동</b-form-select-option
                    >
                  </b-form-select>
                </td>
                <td>
                  <input
                    type="date"
                    id="activityStartDate"
                    v-model="activityStartDate"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id="activityFinishDate"
                    v-model="activityFinishDate"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="activityAgency"
                    v-model="activityAgency"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="activityDetail"
                    v-model="activityWork"
                  />
                </td>
              </tr>
              <tr>
                <td><strong>주요 활동 및 성과</strong></td>
                <td colspan="4">
                  <b-form-textarea
                    id="textarea"
                    rows="3"
                    max-rows="6"
                    v-model="activityDetail"
                  ></b-form-textarea>
                </td>
              </tr>
            </table>

            <div class="resumetitle"><p>참여 프로젝트</p></div>
            <table class="resumetable">
              <tr>
                <td><strong>구분(개인/팀/발주)</strong></td>
                <td colspan="2"><strong>기간</strong></td>
                <td><strong>프로젝트명</strong></td>
                <td><strong>수행업무</strong></td>
              </tr>
              <tr>
                <td>
                  <b-form-select class="select_project" v-model="projectPart">
                    <b-form-select-option value="person"
                      >개인</b-form-select-option
                    >
                    <b-form-select-option value="team">팀</b-form-select-option>
                    <b-form-select-option value="order"
                      >기획</b-form-select-option
                    >
                  </b-form-select>
                </td>
                <td>
                  <input
                    type="date"
                    id="projectStartDate"
                    v-model="projectStartDate"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id="projectFinishDate"
                    v-model="projectFinishDate"
                  />
                </td>
                <td>
                  <input type="text" id="projectName" v-model="projectName" />
                </td>
                <td>
                  <input type="text" id="projectWork" v-model="projectWork" />
                </td>
              </tr>
              <tr>
                <td><strong>주요 업무 및 성과</strong></td>
                <td colspan="4">
                  <b-form-textarea
                    id="textarea"
                    rows="3"
                    max-rows="6"
                    v-model="projectDetail"
                  ></b-form-textarea>
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
                <td>
                  <b-form-select v-model="abroad">
                    <b-form-select-option value="award"
                      >해외연수</b-form-select-option
                    >
                    <b-form-select-option value="volunteer"
                      >해외봉사</b-form-select-option
                    >
                    <b-form-select-option value="social"
                      >해외취업</b-form-select-option
                    >
                  </b-form-select>
                </td>
                <td>
                  <input
                    type="date"
                    id="abroadStartDate"
                    v-model="abroadStartDate"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id="abroadFinishDate"
                    v-model="abroadFinishDate"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="abroadCountury"
                    v-model="abroadCountury"
                  />
                </td>
                <td>
                  <input type="text" id="abroadAgency" v-model="abroadAgency" />
                </td>
              </tr>
              <tr>
                <td><strong>주요활동</strong></td>
                <td colspan="4">
                  <b-form-textarea
                    id="textarea"
                    rows="3"
                    max-rows="6"
                    v-model="abroadDetail"
                  ></b-form-textarea>
                </td>
              </tr>
            </table>
          </form>
          <div class="text-center my-3">
            <b-button
              type="submit"
              id="submit"
              variant="primary"
              @click="insertResume"
              >등록</b-button
            >
            <b-button type="reset" id="reset" variant="danger">취소</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false"></script>
<script>
import axios from "axios";
// import ModalView from '../common/ModalView.vue'
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");
import $ from "jquery";
export default {
  components: {
    //ModalView,
  },

  created() {
    // if (this.userData.memberSq != undefined) {
    // axios
    //     .get(
    //     "http://localhost:8082/itjobgo/resume/loadPhoto?memberSq=" +
    //         this.userData.memberSq,
    //     { responseType: "arraybuffer" }
    //     )
    //     .then((res) => {
    //     const url = window.URL.createObjectURL(new Blob([res.data]));
    //     this.previewImage = url;
    //     });
    // }
  },

  computed: {
    ...mapState(["userData"]),
  },

  methods: {
    daumPostcode: function() {
      daum.postcode.load(function() {
        new daum.Postcode({
          oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ""; // 주소 변수
            var extraAddr = ""; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === "R") {
              // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
            } else {
              // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === "R") {
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if (data.buildingName !== "" && data.apartment === "Y") {
                extraAddr +=
                  extraAddr !== ""
                    ? ", " + data.buildingName
                    : data.buildingName;
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if (extraAddr !== "") {
                extraAddr = " (" + extraAddr + ")";
              }
              // 조합된 참고항목을 해당 필드에 넣는다.
              document.getElementById("sample6_extraAddress").value = extraAddr;
              $("#sample6_extraAddress").attr("value", extraAddr);
            } else {
              document.getElementById("sample6_extraAddress").value = "";
              $("#sample6_extraAddress").attr("value", "");
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("sample6_postcode").value = data.zonecode;

            $("#sample6_postcode").attr("value", data.zonecode); //value 추가해서 업데이트할 때 사용

            document.getElementById("sample6_address").value = addr;
            $("#sample6_address").attr("value", addr);
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
          },
        }).open();
      });
    },

    insertResume() {
      let formData = new FormData();

      //이력서 제목
      formData.append("rtitle", this.rtitle);

      //개인정보
      formData.append("memberNo", this.userData.memberSq);
      formData.append("rname", this.userData.memberName);
      formData.append("remail", this.userData.memberEmail);

      formData.append("engName", this.engName);
      formData.append("birth", this.birth);
      formData.append("gender", this.gender);

      //   formData.append('address',this.result.address);
      //   formData.append('addressDetail',this.addressDetail);
      // 다음주소
      formData.append("postcode", $("#sample6_postcode").val());
      formData.append("address", $("#sample6_address").val());
      formData.append("addressDetail", $("#sample6_detailAddress").val());

      formData.append("telephone", this.telephone);
      formData.append("rphone", this.userData.memberPhone);
      formData.append("upfile", this.files);

      //학력사항
      formData.append("school1", this.school1);
      formData.append("school2", this.school2);
      formData.append("schoolName1", this.schoolName1);
      formData.append("schoolName2", this.schoolName2);
      formData.append("schoolStartDate1", this.schoolStartDate1);
      formData.append("schoolStartDate2", this.schoolStartDate2);
      formData.append("schoolFinishDate1", this.schoolFinishDate1);
      formData.append("schoolFinishDate2", this.schoolFinishDate2);
      formData.append("major1", this.major1);
      formData.append("major2", this.major2);
      formData.append("education1", this.education1);
      formData.append("education2", this.education2);

      // 경력사항
      formData.append("workStartDate", this.workStartDate);
      formData.append("workFinishDate", this.workFinishDate);
      formData.append("workName", this.workName);
      formData.append("workLevel", this.workLevel);
      formData.append("workState", this.workState);
      formData.append("workDetail", this.workDetail);

      // 자격증
      formData.append("licenseName", this.licenseName);
      formData.append("licenseAgency", this.licenseAgency);
      formData.append("licenseDate", this.licenseDate);

      //외국어능력
      formData.append("languageName", this.languageName);
      formData.append("languageLevel", this.languageLevel);
      formData.append("languageTest", this.languageTest);
      formData.append("languageScore", this.languageScore);
      formData.append("languageDate", this.languageDate);

      //주요활동 및 수상
      formData.append("activity", this.activity);
      formData.append("activityStartDate", this.activityStartDate);
      formData.append("activityFinishDate", this.activityFinishDate);
      formData.append("activityAgency", this.activityAgency);
      formData.append("activityWork", this.activityWork);
      formData.append("activityDetail", this.activityDetail);

      //참여 프로젝트
      formData.append("projectPart", this.projectPart);
      formData.append("projectStartDate", this.projectStartDate);
      formData.append("projectFinishDate", this.projectFinishDate);
      formData.append("projectName", this.projectName);
      formData.append("projectWork", this.projectWork);
      formData.append("projectDetail", this.projectDetail);

      //해외경험
      formData.append("abroad", this.abroad);
      formData.append("abroadStartDate", this.abroadStartDate);
      formData.append("abroadFinishDate", this.abroadFinishDate);
      formData.append("abroadCountury", this.abroadCountury);
      formData.append("abroadAgency", this.abroadAgency);
      formData.append("abroadDetail", this.abroadDetail);

      for (let key of formData.entries()) {
        console.log(`${key}`);
      }

      axios
        .post(
          "http://localhost:8082/itjobgo/resume/insertResume.do",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setTimeout( () => this.$router.push({ path: '/resume/resumeList'}), 2000);
        })
        .catch((error) => console.log(error));
    },

    // handleFile(){
    //         this.files=this.$refs.upfiles.$refs.input.files[0];
    //         console.log(this.files);
    //     },
    handleFile() {
      this.files = this.$refs.fileInput.$refs.input.files[0];
      console.log(this.files);
    },

    selectImage() {
      this.$refs.fileInput.click();
    },

    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      // this.files = input.files;

      // if (file[0].name != null) {
      //     $(".submit-photo").show();
      // }

      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
  },

  data: () => ({
    //증명사진
    previewImage: null,
    resumePhoto: null,

    //이력서 제목
    rtitle: "",

    //개인정보
    engName: "",
    birth: "",
    gender: "",
    postcode: "",
    address: "",
    addressDetail: "",
    telephone: "",
    memail: "",
    mphone: "",
    files: "",

    //학력사항1
    school1: "",
    schoolName1: "",
    schoolStartDate1: "",
    schoolFinishDate1: "",
    major1: "",
    education1: "",

    school2: "",
    schoolName2: "",
    schoolStartDate2: "",
    schoolFinishDate2: "",
    major2: "",
    education2: "",

    //경력사항
    workStartDate: "",
    workFinishDate: "",
    workName: "",
    workLevel: "",
    workState: "",
    workDetail: "",

    //자격증
    licenseName: "",
    licenseAgency: "",
    licenseDate: "",

    //외국어
    languageName: "",
    languageLevel: "",
    languageTest: "",
    languageScore: "",
    languageDate: "",

    //주요활동 및 수상
    activity: "",
    activityStartDate: "",
    activityFinishDate: "",
    activityAgency: "",
    activityWork: "",
    activityDetail: "",

    //참여 프로젝트
    projectPart: "",
    projectStartDate: "",
    projectFinishDate: "",
    projectName: "",
    projectWork: "",
    projectDetail: "",

    //해외경험
    abroad: "",
    abroadStartDate: "",
    abroadFinishDate: "",
    abroadCountury: "",
    abroadAgency: "",
    abroadDetail: "",
  }),
};
</script>
<style scoped>
.insert_resume {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
}

.resumetable {
  table-layout: fixed;
  width: 100%;
}
.resumetitle2 {
  width: 30%;
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
p {
  font-weight: border;
  font-size: 20px;
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
#submit {
  background-color: #424874;
  border-color: #424874;
}
#reset {
  margin-left: 10px;
  background-color: #9ba4b4;
  border-color: #9ba4b4;
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

.upload-photo {
  height: 37px;
  width: 106px;
}
</style>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="submenuimage">
        <p class="subtitle">모임 개설</p>
      </div>

      <b-container class="main mt-5">
        <form @submit.prevent="enroller" enctype="multipart/form-data">
          <h2 class="text-center my-4">모임 신청서</h2>
          <small class="required-field"
            ><span class="star">*</span> 모든 항목을 작성해주세요</small
          >
          <div class="meeting-div">
            <b-row>
              <b-col md="3" class="meeting-title">
                <label for="title"
                  ><span class="star">*</span> 모임 명 / 모임 주제
                </label>
              </b-col>
              <b-col md="9">
                <b-form-input
                  id="title"
                  required
                  v-model="mtitle"
                  placeholder="모임명"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="3" class="meeting-desc">
                <label for="title"><span class="star">*</span> 모임 설명</label>
              </b-col>
              <b-col md="9">
                <b-form-textarea
                  id="textarea-state"
                  placeholder="모임 목록에 보여질 간단한 정보에 대해서 적어주세요"
                  rows="3"
                  required
                  v-model="simcontent"
                ></b-form-textarea
              ></b-col>
            </b-row>
          </div>
          <!-- 개설자 정보 -->

          <b-card title="개설자정보" class="my-3">
            <b-row>
              <b-col md="3">
                <label for="name" class="left-field">개설자 이름:</label></b-col
              >
              <b-col md="9">
                <b-form-input
                  id="name"
                  readonly
                  v-model="userData.memberName"
                  placeholder="이름"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="3">
                <label for="email" class="left-field"
                  >개설자 이메일:</label
                ></b-col
              >
              <b-col md="9"
                ><b-form-input
                  id="email"
                  readonly
                  v-model="userData.memberEmail"
                  type="email"
                  placeholder="이메일"
                ></b-form-input
              ></b-col>
            </b-row>
            <b-row>
              <b-col md="3">
                <label for="phone" class="left-field"
                  >개설자 전화번호:</label
                ></b-col
              >
              <b-col md="9">
                <b-form-input
                  readonly
                  v-model="userData.memberPhone"
                  type="tel"
                  id="phone"
                  placeholder="번호"
                ></b-form-input
              ></b-col>
            </b-row>
          </b-card>

          <!-- 개설 상세 내용 -->
          <b-card title="개설내용" class="my-3">
            <b-row>
              <b-col class="d-flex center" cols="4" sm="4">
                <span class="star">*</span>
                <b-form-group
                  label-cols-sm="4"
                  label-cols-lg="4"
                  label="신청 날짜"
                  class="left-field"
                  label-for="example-datepicker"
                >
                  <b-form-datepicker
                    id="example-datepicker"
                    aria-required="true"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    }"
                    :min="min"
                    v-model="sdate"
                    class="mb-3"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col class="d-flex" cols="4" sm="4"
                ><span class="star">*</span>
                <b-form-group
                  label-cols-sm="4"
                  label-cols-lg="4"
                  label="마감 날짜"
                  class="left-field"
                  label-for="example-datepicker2"
                >
                  <b-form-datepicker
                    id="example-datepicker2"
                    aria-required="true"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    }"
                    :min="fday"
                    :disabled="disabled"
                    v-model="fdate"
                    class="mb-3"
                  ></b-form-datepicker> </b-form-group
              ></b-col>
              <b-col class="d-flex center" cols="4" sm="4">
                <span class="star">*</span>
                <b-form-group
                  label-cols-sm="4"
                  label-cols-lg="4"
                  class="left-field"
                  label="시작 날짜"
                  label-for="example-datepicker3"
                >
                  <b-form-datepicker
                    id="example-datepicker3"
                    aria-required="true"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    }"
                    :min="startday"
                    :disabled="disabled"
                    v-model="rdate"
                    class="mb-3"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <span class="star_">*</span
                ><span class="left-field">백엔드</span>
                <b-form-group class="slabel" label-for="back"
                  ><b-form-spinbutton id="back" v-model="back" min="1" max="100"
                /></b-form-group>
              </b-col>
              <b-col>
                <span class="star_">*</span
                ><span class="left-field">프론트</span>
                <b-form-group class="slabel" label-for="front">
                  <b-form-spinbutton
                    id="front"
                    v-model="front"
                    min="1"
                    max="100"/></b-form-group
              ></b-col>
              <b-col>
                <span class="star_">*</span
                ><span class="left-field">디자이너</span>
                <b-form-group class="slabel" label-for="design">
                  <b-form-spinbutton
                    id="design"
                    v-model="desgin"
                    min="1"
                    max="100"/></b-form-group
              ></b-col>
            </b-row>

            <b-row>
              <b-col cols="12" md="12">
                <v-file-input
                  label="대표이미지"
                  filled
                  required
                  accept=".gif,.jpg,.png"
                  ref="upfiles"
                  prepend-icon="mdi-camera"
                  v-on:change="handleFile"
                ></v-file-input>
              </b-col>
            </b-row>
            <div id="preview">
              <img v-if="url" :src="url" /></div
          ></b-card>
          <b-card title="상세모집요강">
            <span class="star te">*</span
            ><b-form-textarea
              id="textarea-auto-height"
              placeholder="상세모집요강"
              rows="3"
              required
              max-rows="8"
              v-model="mcontent"
            ></b-form-textarea>
            <b-row>
              <b-col>
                <span class="star te">*</span
                ><b-card>
                  <v-combobox
                    label="사용할 언어"
                    multiple
                    small-chips
                    v-model="langs"
                  ></v-combobox
                ></b-card>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="1">
                <span class="star ml-2">*</span>
                <span class="left-field ml-2 ">주소</span></b-col
              ><b-col md="9">
                <b-input required readonly v-model="result.address"></b-input
              ></b-col>
              <b-col md="2" class="text-center">
                <b-button type="button" @click="address">주소검색</b-button>
                <modal-view
                  v-if="showModal"
                  @close="showModal = false"
                  @raddress="printaddress"
                >
                  <h3 slot="header">
                    주소검색하기
                    <i class="fas fa-times" @click="showModal = false"></i>
                  </h3>
                </modal-view>
              </b-col> </b-row
          ></b-card>

          <b-row
            ><b-col class="text-center">
              <b-button id="s-btn" type="submit">개설완료</b-button></b-col
            ></b-row
          >
        </form>
      </b-container>
    </div>
  </div>
</template>

<script>
// import VueDaumMap from 'vue-daum-map'
import axios from "axios";
import ModalView from "../common/ModalView.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");
export default {
  components: {
    ModalView,
  },
  computed: {
    ...mapState(["userData"]),
    startday() {
      let startday = new Date(this.fdate);
      startday.setDate(startday.getDate() + 1);
      return startday;
    },
    fday() {
      let deadline = new Date(this.sdate);
      deadline.setDate(deadline.getDate() + 1);
      return deadline;
    },
    disabled() {
      if (this.sdate === "") {
        return this.state;
      } else {
        return !this.state;
      }
    },
  },
  methods: {
    // 지도가 로드 완료되면 load 이벤트 발생
    onLoad(map) {
      this.map = map;
    },
    address() {
      this.showModal = !this.showModal;
    },
    test() {
      console.log("tt");
    },
    printaddress(result) {
      this.result = result;
    },
    enroller() {
      if (this.result.address == undefined) {
        alert("값이 비여있습니다.");
        return;
      }
      let formData = new FormData();
      formData.append("mtitle", this.mtitle);
      formData.append("mwriter", this.userData.memberName);
      formData.append("memail", this.userData.memberEmail);
      formData.append("mphone", this.userData.memberPhone);
      formData.append("sdate", this.sdate);
      formData.append("fdate", this.fdate);
      formData.append("back", this.back);
      formData.append("front", this.front);
      formData.append("desgin", this.desgin);
      formData.append("simcontent", this.simcontent);
      formData.append("upfile", this.files);
      formData.append("mcontent", this.mcontent);
      formData.append("langs", this.langs);
      formData.append("address", this.result.address);
      formData.append("rdate", this.rdate);
      formData.append("memberSq", this.userData.memberSq);

      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/meeting/enrollmeeting",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => this.$router.replace({ name: "meeting" }))
        .catch((error) => console.log(error));
    },
    handleFile() {
      this.files = this.$refs.upfiles.$refs.input.files[0];
      const cfile = this.$refs.upfiles.$refs.input.files[0];
      this.url = URL.createObjectURL(cfile);
    },
  },

  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const minDate = new Date(today);

    return {
      valid: false,
      result: "",
      text: "",
      tname: "",
      pname: "",
      simcontent: "",
      mtitle: "",
      mwriter: "",
      sdate: "",
      fdate: "",
      rdate: "",
      memail: "",
      mphone: "",
      files: "",
      mcontent: "",
      langs: [],
      min: minDate,
      state: "disabled",
      url: null,
      back: 1,
      front: 1,
      desgin: 1,
      showModal: false,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      tnameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 20 || "Name must be less than 20 characters",
      ],
      // items: ["1","2","3","4","5","6"],
    };
  },
};
// appKey: 'b87477b7ea45a3fb35e3fe159f0d8976', // 테스트용 appkey
// center: {lat:33.4555555, lng:126.570667}, // 지도의 중심 좌표
// level: 3, // 지도의 레벨(확대, 축소 정도),
// mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
// libraries: [], // 추가로 불러올 라이브러리
// map: null, // 지도 객체. 지도가 로드되면 할당됨.,
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
.slabel {
  text-align: center;
  margin-top: 10px;
}
.container {
  max-height: auto;
}
#s-btn {
  background-color: #424874;
}
.main {
  border: 1px solid #4e515763;
}
.submenuimage {
  background-image: url("../../assets/images/computer-2583383_1920.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.subtitle {
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
  font-size: 50px;
}

/* css수정 부분 */
.meeting-div {
  clear: both;
}
.left-field {
  font-size: 20px;
}
.meeting-desc {
  text-align: center;
  padding-top: 35px;
  font-size: 20px;
}
.meeting-title {
  text-align: center;
  padding-top: 20px;
  font-size: 20px;
}
#title {
  height: 50px;
}
.card-title {
  text-align: center;
}
#textarea-state {
  resize: none;
}
.required-field {
  float: right;
  color: #ff4646;
}
.star {
  color: #ff4646;
}
.star_ {
  color: #ff4646;
  margin-left: 125px;
  margin-right: 5px;
  margin-bottom: 15px;
}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 150px;
}
</style>

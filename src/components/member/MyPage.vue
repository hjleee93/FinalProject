<template>
  <b-container>
    <div class="header-body text-center mb-7 my-4">
      <b-row class="justify-content-center">
        <b-col xl="5" lg="6" md="8" class="px-5">
          <h1 class="text-black">MY PAGE</h1>
        </b-col>
      </b-row>
    </div>

    <div id="PersonHead">
      <!-- 사진영역 -->
      <div class="photoArea">
        <b-form @submit.prevent="uploadPhoto" enctype="multipart/form-data">
          <div v-if="userData.memberPic == null">
            <div
              class="imagePreviewWrapper"
              :style="{ 'background-image': `url(${previewImage})` }"
              @click="selectImage"
            ></div>

            <div class="filebox text-center">
              <p>
                <b-btn class="upload-photo">
                  <label for="uploadPhoto">사진선택</label
                  ><b-form-file
                    ref="fileInput"
                    id="uploadPhoto"
                    v-model="resumePhoto"
                    style="display:none"
                    @input="pickFile"
                  ></b-form-file
                ></b-btn>
              </p>

              <b-button
                class="submit-photo"
                @click="uploadPhoto"
                id="submitPhoto"
                >사진업로드</b-button
              >
            </div>
          </div>
        </b-form>
        <p class="name font-weight-bold">{{ userData.memberName }}님</p>
      </div>

      <!-- //사진영역 -->

      <!-- 사용자정보 영역 -->
      <ul class="infoList">
        <!-- 이력서 공개중 -->

        <li class="topList first resume">
          <p class="title">이력서 등록수</p>
          <p class="count">
            <a href="http://www.alba.co.kr/person/resume/MagResume.asp">1</a>개
          </p>
        </li>
        <li class="topList openState">
          <p class="title">참여한 프로젝트수</p>
          <p class="count">
            <a href="http://www.alba.co.kr/person/resume/MagResume.asp">0</a>개
          </p>
        </li>

        <li class="topList last onlineCount">
          <p class="title">내가 한 질문</p>
          <p class="count">
            <a href="http://www.alba.co.kr/person/online/ApplicationList.asp"
              >0</a
            >건
          </p>
        </li>
        <li class="first resumeCompany">
          <p class="title">등록된 포트폴리오</p>
          <p class="count">
            <a href="http://www.alba.co.kr/person/resumeread/CompanyList.asp"
              >0</a
            >건
          </p>
        </li>
        <li class="apply">
          <p class="title">질문</p>
          <p class="count">
            <a
              href="http://www.alba.co.kr/person/resumeread/CompanyList.asp?resumepage=3"
              >0</a
            >건
          </p>
        </li>
        <li class="last scrap">
          <p class="title">내가 쓴 글</p>
          <p class="count">
            <a href="http://www.alba.co.kr/person/scrap/ScrapList.asp">0</a>건
          </p>
        </li>

        <li class="first bottomList userInfomation">
          <div class="tel">
            <span class="item"><span class="bullet"></span>연락처</span>
            <span class="mobile">{{ userData.memberPhone }}</span>
            <span class="tel" style="display:none;">-</span>
            <div class="mobileCert"></div>
          </div>
          <div class="mail">
            <span class="item"><span class="bullet"></span>이메일</span
            ><b>{{ userData.memberEmail }}</b>
          </div>
          <div class="address">
            <span class="item"><span class="bullet"></span>주소</span
            ><b>{{ userData.memberAddr }} {{ userData.memberAddrDtl }}</b>
          </div>
          <template v-if="userData.memberAddr != null">
            <b-btn class="chg-info" href="/chgMemberInfo">개인정보수정</b-btn>
          </template>
          <template v-else>
            <b-btn class="chg-info" id="profile" href="/chgMemberInfo"
              >프로필 작성</b-btn
            >
          </template>
        </li>
      </ul>
      <div></div>
    </div>

    <div class="mt-5 resume-section">
      <b-tabs content-class="mt-3">
        <b-tab title="온라인 지원 현황" active><p>I'm the first tab</p></b-tab>
        <b-tab title="Second"><p>I'm the second tab</p></b-tab>
        <b-tab title="Disabled"><p>I'm a disabled tab!</p></b-tab>
      </b-tabs>
    </div>
    <!-- 프로젝트 -->
    <div class="mt-5 resume-section">
      <b-tabs content-class="mt-3">
        <b-tab title="최신 열람한 기업" active><p>I'm the first tab</p></b-tab>
        <b-tab title="Second"><p>I'm the second tab</p></b-tab>
        <b-tab title="Disabled"><p>I'm a disabled tab!</p></b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
import $ from "jquery";
const { mapState } = createNamespacedHelpers("memberStore");

export default {
  data: () => ({
    previewImage: null,
    resumePhoto: null,
    files: "",
  }),
  created() {
    // let memberEmail = localStorage.getItem("memberEmail");

    setTimeout(() => {
      if (this.userData.memberSq != undefined) {
        axios
          .get(
            "http://localhost:8082/itjobgo/member/loadPhoto?memberSq=" +
              this.userData.memberSq,
            { responseType: "arraybuffer" }
          )
          .then((res) => {
            console.log("사진불러오기");
            const url = window.URL.createObjectURL(new Blob([res.data]));
            console.log(url);
            this.previewImage = url;
          });
      }
    }, 200);
  },
  // created(){
  // 	this.$store.dispatch('memberStore/getMemberInfo');
  // 	console.log(this.userData.memberLevel);
  // 	if(this.userData.memberLevel == 3  ){
  // 		this.$swal(
  // 			{text:"소셜로그인",
  // 		allowOutsideClick: false,
  // 		confirmButtonText: `정보 등록하기`,}
  // 		),function(){
  // 			window.location.href = "/chgMemberInfo";
  // 		};
  // 	}

  // },
  computed: {
    ...mapState(["userData"]),
  },
  methods: {
    uploadPhoto: function() {
      let formData = new FormData();
      formData.append("memberSq", this.userData.memberSq);
      formData.append("memberEmail", this.userData.memberEmail);
      formData.append("upFile", this.files[0]);

      for (let key of formData.entries()) {
        console.log(`${key}`);
      }
      axios
        .post("http://localhost:8082/itjobgo/member/updatePhoto", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }) //form server 연결
        .then(function(res) {
          if (res.data.result > 0) {
            console.log(res.data);
            alert("사진이 등록되었습니다.");
            $(".submit-photo").hide();
          } else {
            alert("사진 등록에 실패했습니다. 다시 시도해주세요.");
          }
        });
    },

    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      this.files = input.files;
      if (file[0].name != null) {
        $(".submit-photo").show();
        // $(".upload-photo").hide();
      }
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
};
</script>

<style scoped>
@import "../../assets/css/myPage.css";
</style>

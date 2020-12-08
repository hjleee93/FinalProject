<!-- 관리자 마이페이지 -->
<template>
  <b-container class="mb-5">
    <div class="header-body text-center mb-7 my-4">
      <b-row class="justify-content-center">
        <b-col xl="5" lg="6" md="8" class="px-5">
          <h1 class="text-black">ADMIN PAGE</h1>
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
          <p class="title">공지사항</p>
          <p class="count">
            <a href="#noticeDiv">{{ noticeCount }}</a
            >개
          </p>
        </li>
        <li class="topList openState">
          <p class="title">참고사이트</p>
          <p class="count"><a href="#projDiv" class="scroll">1</a>개</p>
        </li>

        <li class="topList last onlineCount">
          <p class="title">등록된 컨설턴트</p>
          <p class="count">
            <a href="#qnaDiv" class="scroll"> {{ qnaCount }} </a>명
          </p>
        </li>
        <!--  <li class="first resumeCompany">
          <p class="title">등록된 포트폴리오</p>
          <p class="count">
            <a href="#portfDiv" class="scroll">{{ portfCount }}</a
            >건
          </p>
        </li>
        <li class="apply">
          <p class="title">스크랩한 구인광고</p>
          <p class="count">
            <a href="#scrapDiv" class="scroll">{{ scrapCount }}</a
            >건
          </p>
        </li>
        <li class="commu">
          <p class="title">내가 쓴 글</p>
          <p class="count">
            <a href="#communityDiv" class="scroll">{{ commuCount }}</a
            >건
          </p>
        </li> -->

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
        </li>
      </ul>
    </div>
    <!-- 공지사항 -->
    <div id="noticeDiv"></div>
    <div>
      <p class="h3 mt-5 font-weight-bold text-center">
        공지사항
      </p>
      <p id="noticeAll" class="mb-2">
        <b-btn @click="moveNoticeAll">전체보기</b-btn>
      </p>
      <v-simple-table class="notice">
        <thead class="notice-table">
          <tr>
            <th class="text-left">
              분류
            </th>
            <th class="text-left">
              제목
            </th>
            <th class="text-left">
              작성일
            </th>
          </tr>
        </thead>

        <template v-if="noticeList[0] != undefined">
          <tbody>
            <tr
              id="noticeBody"
              class="notice-table"
              v-for="(nt, i) in noticeList"
              :key="i"
              @click="moveNotice(noticeList[i].noticeSq)"
            >
              <template v-if="noticeList[i] != undefined">
                <td>
                  {{ noticeList[i].noticeDivision }}
                </td>
                <td>
                  {{ noticeList[i].noticeTitle }}
                </td>

                <td>{{ formatDate(noticeList[i].noticeDate) }}</td>
              </template>
            </tr>
          </tbody>
        </template>
        <template v-else>
          <tbody>
            <tr>
              <td colspan="3" class="text-center">
                작성한 글이 없습니다.
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </b-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");
import $ from "jquery";

import axios from "axios";
$(document).ready(function($) {
  $(".scroll").click(function(event) {
    event.preventDefault();

    $("html,body").animate({ scrollTop: $(this.hash).offset().top - 200 }, 600);
  });
});
export default {
  data: () => ({
    resumePhoto: null,
    previewImage: null,
  }),
  created() {
    if (this.userData.memberSq != undefined) {
      axios
        .get(
          "http://localhost:8082/itjobgo/member/loadPhoto?memberSq=" +
            this.userData.memberSq,
          { responseType: "arraybuffer" }
        )
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));

          this.previewImage = url;
        });
    }

    this.$store.dispatch("FETCH_NOTICE");
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
          if (res.data > 0) {
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
    moveNoticeAll() {
      this.$router.push({ name: "NoticeList" });
    },
    moveNotice(id) {
      this.$router.push({ name: "noticeList", params: { id: id } });
    },
    //날짜표시
    formatDate(value) {
      return this.$moment(value).format("YYYY-MM-DD");
    },
  },
  computed: {
    ...mapState(["userData"]),
    noticeList() {
      var obj = new Object(); //반환할 객체
      if (this.$store.state.noticeList != undefined) {
        for (let i = 0; i < this.$store.state.noticeList.length; i++) {
          obj[i] = this.$store.state.noticeList[i];
        }
      }

      var arr = [];
      for (let i = 0; i < 3; i++) {
        arr[i] = Object.values(obj)[i];
      }
      // console.log(arr);
      return arr;
    },
    noticeCount() {
      return this.$store.state.noticeList.length;
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/myPage.css";
</style>

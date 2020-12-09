<template>
  <b-container class="mb-5">
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
          <p class="count"><a href="#projDiv" class="scroll">1</a>개</p>
        </li>

        <li class="topList last onlineCount">
          <p class="title">내가 한 질문</p>
          <p class="count">
            <a href="#qnaDiv" class="scroll"> {{ qnaCount }} </a>건
          </p>
        </li>
        <li class="first resumeCompany">
          <p class="title">등록된 포트폴리오</p>
          <p class="count">
            <a href="#portfDiv" class="scroll">{{ portfCount }}</a
            >건
          </p>
        </li>
        <li class="apply">
          <p class="title">스크랩한 구인광고</p>
          <p class="count" v-if="this.$store.scrap != undefined">
            <a href="#scrapDiv" class="scroll">{{ this.$store.scrap.length }}</a
            >건
          </p>
        </li>
        <li class="commu">
          <p class="title">내가 쓴 글</p>
          <p class="count">
            <a href="#communityDiv" class="scroll">{{ commuCount }}</a
            >건
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

    <!-- 스크랩 구인정보 -->
    <div id="scrapDiv"></div>
    <div>
      <p class="h3 my-5 font-weight-bold text-center">
        스크랩한 구인정보
      </p>

      <v-simple-table class="scrap">
        <thead class="scrap-table">
          <tr>
            <th class="text-left">
              기업명
            </th>
            <th class="text-left">
              제목
            </th>
            <th class="text-left">
              지원방법
            </th>
            <th class="text-left">
              마감일
            </th>
          </tr>
        </thead>
        <template v-if="scrap[0] != undefined">
          <tbody>
            <tr
              id="scrapBody"
              class="scrap-table"
              v-for="(sc, i) in scrap"
              :key="i"
              @click="moveJobDtl(scrap[i].jobNo)"
            >
              <td>
                {{ scrap[i].company }}
              </td>
              <td>{{ scrap[i].jobTitle }}</td>
              <td>{{ scrap[i].applyMethod }}</td>
              <template v-if="scrap[i].deadline.includes('채용시까지')">
                <td>채용시까지</td>
              </template>
              <template v-else>
                <td>
                  <b-btn
                    class="d-day-btn argent-btn mr-2"
                    v-if="
                      $moment(formatDate(scrap[i].deadline)).diff(
                        $moment(new Date()),
                        'days'
                      ) +
                        1 <=
                        7
                    "
                    >D-
                    {{
                      $moment(formatDate(scrap[i].deadline)).diff(
                        $moment(new Date()),
                        "days"
                      ) + 1
                    }}
                  </b-btn>
                  <!-- d-day 20일이하  -->
                  <b-btn
                    class="d-day-btn warn-btn mr-2"
                    v-else-if="
                      $moment(formatDate(scrap[i].deadline)).diff(
                        $moment(new Date()),
                        'days'
                      ) +
                        1 >
                        7 &&
                        $moment(formatDate(scrap[i].deadline)).diff(
                          $moment(new Date()),
                          'days'
                        ) +
                          1 <=
                          20
                    "
                    >D-
                    {{
                      $moment(formatDate(scrap[i].deadline)).diff(
                        $moment(new Date()),
                        "days"
                      ) + 1
                    }}
                  </b-btn>

                  <b-btn class="d-day-btn ok-btn mr-2" v-else
                    >D-
                    {{
                      $moment(formatDate(scrap[i].deadline)).diff(
                        $moment(new Date()),
                        "days"
                      ) + 1
                    }}
                  </b-btn>
                </td></template
              >
            </tr>
          </tbody>
        </template>
        <template v-else>
          <tbody>
            <tr>
              <td colspan="4" class="text-center">
                스크랩한 구직 정보가 없습니다.
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <!-- 질문 -->
    <div id="qnaDiv"></div>
    <div>
      <p class="h3 my-5 font-weight-bold text-center">
        등록한 질문
      </p>
      <v-simple-table class="qna">
        <thead class="qna-table">
          <tr>
            <th class="text-left">
              분류
            </th>
            <th class="text-left">
              제목
            </th>
            <th class="text-left">
              답변여부
            </th>
            <th class="text-left">
              작성일
            </th>
          </tr>
        </thead>
        <template v-if="qnaboard1[0] != undefined">
          <tbody>
            <tr
              id="qnaBody"
              class="qna-table"
              v-for="(qna, i) in qnaboard1"
              :key="i"
              @click="moveQna(qnaboard1[i].qboardNo)"
            >
              <template v-if="qnaboard1[i] != undefined">
                <td>
                  {{ qnaboard1[i].qnaCategory }}
                </td>
                <td>
                  {{ qnaboard1[i].qnaTitle }}
                </td>
                <template v-if="qnaboard1[i].qnaAnswerYn == 'N'">
                  <td>등록된 답변이 없습니다.</td>
                </template>
                <template v-else> <td>답변 완료</td></template>
                <td>{{ formatDate(qnaboard1[i].qnaDate) }}</td>
              </template>
            </tr>
          </tbody>
        </template>
        <template v-else>
          <tbody>
            <tr>
              <td colspan="4" class="text-center">
                등록된 질문이 없습니다.
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <!-- TODO: 프로젝트 -->
    <!-- <div id="scrapDiv"></div>
    <div>
      <p class="h3 my-5 font-weight-bold text-center">
        참여하고 계신 프로젝트
      </p>
      <v-simple-table>
        <thead class="qna-table">
          <tr>
            <th class="text-left">
              분류
            </th>
            <th class="text-left">
              제목
            </th>
            <th class="text-left">
              답변여부
            </th>
            <th class="text-left">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="qna-table" v-for="(qna, i) in qnaboard" :key="i">
            <td>
              {{ qnaboard[i].qnaCategory }}
            </td>
            <td>
              <router-link
                :to="{
                  name: 'qnaView',
                  params: { id: qnaboard[i].qnaSeq },
                }"
                class="qna-router"
                >{{ qnaboard[i].qnaTitle }}</router-link
              >
            </td>
            <td>{{ qnaboard[i].qnaAnswerYn }}</td>
            <td>{{ formatDate(qnaboard[i].qnaDate) }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </div> -->

    <div id="portfDiv"></div>
    <div>
      <p class="h3 my-5 font-weight-bold text-center">
        포트폴리오
      </p>
      <v-simple-table class="pf">
        <thead class="pf-table">
          <tr>
            <th class="text-left">
              분류
            </th>
            <th class="text-left">
              제목
            </th>
            <th class="text-left">
              답변여부
            </th>
            <th class="text-left">
              작성일
            </th>
          </tr>
        </thead>
        <template v-if="pboard[0] != undefined">
          <tbody>
            <tr
              class="pf-table"
              id="pfBody"
              v-for="(pf, index) in pboard"
              :key="index"
              @click="movePortf(pboard[index].pboardNo)"
            >
              <template v-if="pboard[index] != undefined">
                <td>{{ pboard[index].pboardDivision }}</td>
                <td>{{ pboard[index].pboardTitle }}</td>
                <template v-if="pboard[index].pboardStatus == 'N'">
                  <td>등록된 답변이 없습니다.</td>
                </template>
                <template v-else> <td>답변 완료</td></template>

                <td>{{ formatDate(pboard[index].pboardDate) }}</td>
              </template>
            </tr>
          </tbody>
        </template>
        <template v-else>
          <tbody>
            <tr>
              <td colspan="4" class="text-center">
                등록된 포트폴리오가 없습니다.
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <!-- 자유게시판 연동 -->
    <div id="communityDiv"></div>
    <div>
      <p class="h3 my-5 font-weight-bold text-center">
        내가 작성한 글
      </p>
      <v-simple-table class="community">
        <thead class="community-table">
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
        <template v-if="communityboard[0] != undefined">
          <tbody>
            <tr
              id="communityBody"
              class="qna-table"
              v-for="(qna, i) in communityboard"
              :key="i"
              @click="moveCommu(communityboard[i].boardSq)"
            >
              <template v-if="communityboard[i] != undefined">
                <td>
                  {{ communityboard[i].boardDivision }}
                </td>
                <td>
                  {{ communityboard[i].boardTitle }}
                </td>

                <td>{{ formatDate(communityboard[i].boardDate) }}</td>
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
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
import $ from "jquery";

const { mapState: memberState } = createNamespacedHelpers("memberStore");
const { mapState: jobState } = createNamespacedHelpers("jobStore");

$(document).ready(function($) {
  $(".scroll").click(function(event) {
    event.preventDefault();

    $("html,body").animate({ scrollTop: $(this.hash).offset().top - 200 }, 600);
  });
});

export default {
  data: () => ({
    previewImage: null,
    resumePhoto: null,
    files: "",
    scrapcount: "",
    scrapArr: [],
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
  },
  async mounted() {
    await this.$store.dispatch("jobStore/loadScrap", {
      memberSq: this.userData.memberSq,
    });
    this.$store.dispatch("FETCH_PBOARD");
    this.$store.dispatch("FETCH_QNABOARD");
    this.$store.dispatch("FETCH_COMMUNITYBOARD");

    this.$store.dispatch("jobStore/loadJobTable");
  },
  computed: {
    ...memberState(["loginStatus", "userData"]),
    ...jobState(["tableList", "jobInfo", "scrap"]),

    communityboard() {
      let objArr = new Object(); //반환할 객체

      for (let i = 0; i < this.$store.state.communityboard.length; i++) {
        if (
          this.$store.state.communityboard[i].memberNum ==
          this.userData.memberSq
        ) {
          objArr[i] = this.$store.state.communityboard[i];
        }
      }
      let tem = [];
      for (let i = 0; i < 3; i++) {
        tem[i] = Object.values(objArr)[i];
      }

      return tem;
    },
    // //스크랩한 글 리턴
    // scrap() {
    //   var temp = new Object(); //반환할 객체
    //   console.log("this.$store.scrap: " + JSON.stringify(this.$store.scrap));
    //   if (this.$store.scrap != undefined) {
    //     for (let i = 0; i < 3; i++) {
    //       temp[i] = this.$store.scrap[i];
    //     }
    //   }

    //   return temp;
    // },
    pboard() {
      var objTemp = new Object(); //반환할 객체

      for (let i = 0; i < this.$store.state.pboard.length; i++) {
        if (this.$store.state.pboard[i].pboardId == this.userData.memberSq) {
          objTemp[i] = this.$store.state.pboard[i];
        }
      }
      var temp = [];
      for (let i = 0; i < 3; i++) {
        temp[i] = Object.values(objTemp)[i];
      }

      return temp;
    },
    qnaboard1() {
      var obj = new Object(); //반환할 객체
      if (this.$store.state.qnaboard1 != undefined) {
        for (let i = 0; i < this.$store.state.qnaboard1.length; i++) {
          if (
            this.$store.state.qnaboard1[i].memberNum == this.userData.memberSq
          ) {
            obj[i] = this.$store.state.qnaboard1[i];
          }
        }
      }

      var arr = [];
      for (let i = 0; i < 3; i++) {
        arr[i] = Object.values(obj)[i];
      }
      // console.log(arr);
      return arr;
    },
    // 자유 게시판 카운트 용
    commuCount() {
      let count = 0;

      if (this.$store.state.communityboard != undefined) {
        for (let i = 0; i < this.$store.state.communityboard.length; i++) {
          if (
            this.$store.state.communityboard[i].memberNum ==
            this.userData.memberSq
          ) {
            count++;
          }
        }
      }
      return count;
    },
    //질문 카운트용
    qnaCount() {
      let count = 0;

      if (this.$store.state.qnaboard1 != undefined) {
        for (let i = 0; i < this.$store.state.qnaboard1.length; i++) {
          if (
            this.$store.state.qnaboard1[i].memberNum == this.userData.memberSq
          ) {
            count++;
          }
        }
      }
      return count;
    },
    //포트폴리오 카운트
    portfCount() {
      let count = 0;
      for (let i = 0; i < this.$store.state.pboard.length; i++) {
        if (this.$store.state.pboard[i].pboardId == this.userData.memberSq) {
          count++;
        }
      }
      return count;
    },
  },
  methods: {
    moveCommu(id) {
      this.$router.push({ name: "CommunityBoardView", params: { id: id } });
    },
    moveJobDtl(jobNo) {
      this.$router.push({ name: "jobInfoDtl", params: { wantedNo: jobNo } });
    },
    moveQna(id) {
      this.$router.push({ name: "qnaView", params: { id: id } });
    },
    movePortf(id) {
      this.$router.push({ name: "Portinfo", params: { id: id } });
    },
    //날짜표시
    formatDate(value) {
      return this.$moment(value).format("YYYY-MM-DD");
    },
    uploadPhoto: function() {
      let formData = new FormData();
      formData.append("memberSq", this.userData.memberSq);
      formData.append("memberEmail", this.userData.memberEmail);
      formData.append("upFile", this.files[0]);

      if (this.files[0] != undefined) {
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
      } else {
        alert("사진을 넣어주세요");
      }
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
  },
};
</script>

<style scoped>
@import "../../assets/css/myPage.css";
</style>

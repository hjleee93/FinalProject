<template>
  <section class="banner-area relative" id="home">
    <div class="container main-top">
      <div
        class="row fullscreen d-flex align-items-center justify-content-center"
      >
        <!-- serach 바 -->
        <div class="banner-content col-lg-12">
          <b-form action="" class="serach-form-area">
            <div class="row justify-content-center form-wrap">
              <div class="col-lg-4 form-cols ">
                <b-form-input
                  type="text"
                  class="form-control"
                  name="search"
                  v-model="keyword"
                  placeholder="검색어를 입력해주세요"
                />
              </div>
              <div class="col-lg-3 form-cols">
                <div>
                  <button
                    type="button"
                    class="form-control"
                    name="search"
                    @click="locationSearch"
                  >
                    지역을 선택해주세요
                  </button>
                </div>
              </div>

              <div class="col-lg-3 form-cols ">
                <div>
                  <button
                    type="button"
                    class="form-control"
                    name="search"
                    @click="fieldSearch"
                  >
                    직종을 선택해주세요
                  </button>
                </div>
              </div>

              <div class="col-lg-2 form-cols">
                <b-button
                  type="button"
                  class="btn btn-info"
                  @click="jobSearch()"
                >
                  <span class="lnr lnr-magnifier"></span> Search
                </b-button>
              </div>
            </div>
            <!-- 지역선택 dept 1 -->
            <div class="location-div">
              <p>지역을 선택해주세요</p>
              <div class="prov-layer">
                <table>
                  <tr>
                    <td>
                      <b-btn @click="allSelected = ''">전체</b-btn>
                    </td>
                    <td @click="allSelected = '11000'"><b-btn>서울</b-btn></td>
                  </tr>
                  <tr>
                    <td><b-btn>세종</b-btn></td>
                    <td><b-btn>경기</b-btn></td>
                  </tr>
                  <tr>
                    <td><b-btn>부산</b-btn></td>
                    <td><b-btn>인천</b-btn></td>
                  </tr>
                  <tr>
                    <td><b-btn>대구</b-btn></td>
                    <td><b-btn>대전</b-btn></td>
                  </tr>
                  <tr>
                    <td><b-btn>울산</b-btn></td>
                    <td><b-btn>광주</b-btn></td>
                  </tr>
                  <tr>
                    <td><b-btn>전북</b-btn></td>
                    <td><b-btn>전남</b-btn></td>
                  </tr>
                  <tr>
                    <td><b-btn>경북</b-btn></td>
                    <td><b-btn>경남</b-btn></td>
                  </tr>
                  <tr>
                    <td><b-btn>충북</b-btn></td>
                    <td><b-btn>충남</b-btn></td>
                  </tr>

                  <tr>
                    <td><b-btn>강원</b-btn></td>
                    <td><b-btn>제주</b-btn></td>
                  </tr>
                  <tr></tr>
                </table>
              </div>
              <!-- 상세지역 dept 2 -->
              <div class="city-layer">
                <b-form-group>
                  <b-form-checkbox-group
                    id="checkbox-group-1"
                    v-model="selected1"
                    :options="options"
                  ></b-form-checkbox-group>
                </b-form-group>
              </div>
              <div class="mt-3">
                Selected: <strong>{{ allSelected }}</strong>
              </div>
            </div>
          </b-form>
        </div>
        <!-- 메인 -->
        <div class="col-4 pl-0">
          <!-- it소식 -->
          <b-carousel
            id="carousel-1"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <!-- Text slides with image -->
            <b-carousel-slide
              v-for="it in itnewsList"
              :key="it.id"
              id="itCrousel"
              class="carousel-custom"
              :style="{
                'background-size': '365px 385px',
                'background-image': `url(${`http://localhost:8082/itjobgo/itnews/imagesrequest${it.newsSq}`})`,
              }"
            >
              <div class="it-list py-2" @click="cardclick(it)">
                <p id="itCaption">{{ it.newsTitle }}</p>

                <p id="itContent">{{ it.newsContent }}</p>
              </div>

              <!-- <p>IT소식</p> -->
            </b-carousel-slide>
          </b-carousel>
        </div>

        <div class="col-4 pl-0">
          <!-- 공지  -->
          <div class="row">
            <template v-if="noticeList">
              <div class="card col-6 m-0 p-0 info-card">
                <div
                  class="m-2"
                  v-if="noticeList[noticeList.length - 1] != undefined"
                >
                  <b-btn class="ntc-btn">공지</b-btn>
                  <router-link
                    :to="{
                      name: 'NoticeView',
                      params: {
                        id: noticeList[noticeList.length - 1].noticeSq,
                      },
                    }"
                    class="notice-router"
                  >
                    <span>
                      {{ noticeList[noticeList.length - 1].noticeTitle }}
                    </span>

                    <p class="text-muted m-b-0 notice-content">
                      {{ noticeList[noticeList.length - 1].noticeContent }}
                    </p></router-link
                  >
                </div>
              </div>
            </template>

            <!-- 자유게시판  -->
            <template v-if="communityboard">
              <div class="card col-6 m-0 p-0 info-card">
                <div
                  class="m-2"
                  v-if="communityboard[communityboard.length - 1] != undefined"
                >
                  <b-btn class="com-btn">자유</b-btn>
                  <router-link
                    :to="{
                      name: 'CommunityBoardView',
                      params: {
                        id: communityboard[communityboard.length - 1].boardSq,
                      },
                    }"
                    class="commu-router"
                  >
                    <span>{{
                      communityboard[communityboard.length - 1].boardTitle
                    }}</span>
                    <p class="text-muted m-b-0 commu-content">
                      {{
                        communityboard[communityboard.length - 1].boardContent
                      }}
                    </p>
                  </router-link>
                </div>
                <div v-else><p class="m-2">등록된 게시물이 없습니다.</p></div>
              </div>
            </template>

            <!-- qna-->
            <div class="card col-6 m-0 p-0 info-card">
              <div
                class="m-2"
                v-if="qnaboard1[qnaboard1.length - 1] != undefined"
              >
                <router-link
                  :to="{
                    name: 'qnaView',
                    params: { id: qnaboard1[qnaboard1.length - 1].qboardNo },
                  }"
                  class="qna-router"
                >
                  <div class="qst">
                    <b-btn class="qna-btn">질문</b-btn>
                    <span>{{ qnaboard1[qnaboard1.length - 1].qnaTitle }}</span>
                  </div>
                  <p class="text-muted m-b-0">
                    {{ qnaboard1[qnaboard1.length - 1].qnaContent }}
                  </p>

                  <div class="ans">
                    <b-btn class="ans-btn">답변</b-btn>
                    <span
                      v-if="qnaboard1[qnaboard1.length - 1].qnaAnswerYn == 'N'"
                      ><small>등록된 답변이 없습니다.</small></span
                    >
                    <span v-else><small>답변 확인하기</small></span>
                  </div>
                </router-link>
              </div>

              <div v-else>
                <p class="m-2">등록된 질문이 없습니다.</p>
              </div>
            </div>
            <div class="card col-6 m-0 p-0 info-card">
              <div
                class="m-2"
                v-if="qnaboard1[qnaboard1.length - 2] != undefined"
              >
                <router-link
                  :to="{
                    name: 'qnaView',
                    params: { id: qnaboard1[qnaboard1.length - 2].qboardNo },
                  }"
                  class="qna-router"
                >
                  <div class="qst">
                    <b-btn class="qna-btn">질문</b-btn>
                    <span>{{ qnaboard1[qnaboard1.length - 2].qnaTitle }}</span>
                  </div>
                  <p class="text-muted m-b-0">
                    {{ qnaboard1[qnaboard1.length - 2].qnaContent }}
                  </p>

                  <div class="ans">
                    <b-btn class="ans-btn">답변</b-btn>
                    <span
                      v-if="qnaboard1[qnaboard1.length - 2].qnaAnswerYn == 'N'"
                      ><small>등록된 답변이 없습니다.</small></span
                    >
                    <span v-else><small>답변 확인하기</small></span>
                  </div>
                </router-link>
              </div>

              <div v-else>
                <p class="m-2">등록된 질문이 없습니다.</p>
              </div>

              <!-- qna fin -->
            </div>
          </div>
        </div>

        <div class="col-4 p-0 collab">
          <div class="card table-card collab">
            <div class="card-header ">
              <h5 class="text-center">최근 등록된 모임</h5>
            </div>

            <table>
              <tr v-for="(item, i) in meeting" :key="i">
                <td>
                  <div class="table-content">
                    <router-link
                      :to="{
                        name: 'meetinginfo',
                        params: { id: meeting[i].collabSq },
                      }"
                      class="collab-router"
                    >
                      <p class="m-2">
                        <b>{{ meeting[i].collabTitle }}</b>
                      </p>
                      <p class="m-2 txt">
                        {{ meeting[i].collabSimcontent }}
                      </p></router-link
                    >
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!-- 모임끝 -->
      </div>
    </div>

    <!-- 로그인 한 경우만 적용 -->
    <template v-if="userData.memberEmail != null">
      <!-- memberPosition이 등록된 경우 -->
      <template v-if="userData.memberPosition != null">
        <div class="container">
          <h3 class="m-3">
            <strong class="tit_cont"
              >{{ userData.memberName }}님을 위한
              <span id="userInfo" value="123">{{
                userData.memberPosition
              }}</span
              >추천 채용 정보</strong
            >
          </h3>
          <template v-if="rcmJobs.wantedRoot != undefined">
            <div class="row">
              <div
                class="col-xl-3 col-sm-6 col-12"
                v-for="(item, i) in rcmJobs.wantedRoot.wanted"
                :key="i"
              >
                <div class="card h-100">
                  <router-link
                    :to="{
                      name: 'jobInfoDtl',
                      params: { wantedNo: item.wantedAuthNo._text },
                    }"
                    class="job-card"
                  >
                    <div class="card-body">
                      <div class="card-title">{{ item.company._text }}</div>
                      <div>
                        <b-card-text>{{ item.title._text }}</b-card-text>
                      </div>
                    </div>
                    <div class="card-footer">
                      <small>
                        <b-card-text
                          >등록 일자: {{ item.regDt._text }}</b-card-text
                        ></small
                      >
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
      <!-- memberPosition이 등록되지 않은 경우 -->
      <template v-else-if="userData.memberPosition == null">
        <!-- 관리자인경우 -->
        <template v-if="userData.memberSq != '999'">
          <div class="container">
            <p class="m-3 text-center">
              {{ userData.memberName }}님 프로필을 등록해주시면 ITJOBGO에서 추천
              채용정보를 추천해드립니다.
            </p>
            <p class="text-center mt-4">
              <b-btn class="profile-btn" @click="moveMyPage(userData.memberSq)"
                >프로필 등록바로가기</b-btn
              >
            </p>
          </div>
        </template>
      </template>
    </template>

    <!-- 최신채용정보 -->

    <div class="container">
      <h3 class="m-3"><strong class="tit_cont">최신 채용 정보</strong></h3>
      <template v-if="jobs.wantedRoot != undefined">
        <div class="row">
          <div
            class="col-xl-3 col-sm-6 col-12"
            v-for="(item, i) in jobs.wantedRoot.wanted"
            :key="i"
          >
            <div class="card h-100">
              <router-link
                :to="{
                  name: 'jobInfoDtl',
                  params: {
                    wantedNo: item.wantedAuthNo._text,
                    url: item.wantedInfoUrl._text,
                  },
                }"
                class="job-card"
              >
                <div class="card-body">
                  <div class="card-title">{{ item.company._text }}</div>
                  <div>
                    <b-card-text>{{ item.title._text }}</b-card-text>
                  </div>
                </div>
                <div class="card-footer">
                  <small
                    ><b-card-text
                      >등록 일자: {{ item.regDt._text }}</b-card-text
                    ></small
                  >
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mapState } from "vuex";
// import $ from "jquery";

const { mapState: jobState } = createNamespacedHelpers("jobStore");
const { mapState: memberState } = createNamespacedHelpers("memberStore");
import $ from "jquery";

// var convert = require("xml-js");
// import axios from "axios";
//로그인한 사람에 따라 추천 parmeter 수정하기

export default {
  data() {
    return {
      // inputSearch,//search bar 검색어
      selected1: [],
      allSelected: null,
      rcmJson: [], //추천 채용정보
      selectedLocation: null,
      selectedJob: null,
      keyword: "",
      options: [
        { text: "Orange", value: "orange" },
        { text: "Apple", value: "apple" },
        { text: "Pineapple", value: "pineapple" },
        { text: "Grape", value: "grape" },
      ],
    };
  },
  methods: {
    locationSearch() {
      if ($(".location-div").hasClass("on")) {
        $(".location-div").removeClass("on");
      } else {
        $(".location-div").addClass("on");
      }
    },
    //상세 지역 선택
    seoulSelected() {
      $(".city-layer").addClass("on");
    },
    fieldSearch() {},
    //it소식 이동
    cardclick(value) {
      this.$router.push({ name: "itNewsView", params: { id: value.newsSq } });
    },
    moveMyPage: function(e) {
      //중복 라우터 방지
      if (this.$route.path != "/myPage/" + e) {
        console.log(this.$route.path);
        this.$router.push({ name: "myPage", params: { memberSq: e } });
      }
    },
    //서치바
    jobSearch: function() {
      const formData = {
        keyword: this.keyword,
        region: this.allSelected,
      };
      console.log("formData: " + JSON.stringify(formData));
      this.$router.push({
        name: "jobSearchDtl",
        query: formData,
      });
    },
    jobCategory: function() {
      $("#test").show();
    },
  },

  //214201,214200,214202 : 컴퓨터강사 : 백엔드, 프론트엔드, 퍼블리셔
  //022: 컴퓨터하드웨어, 통신공학 - 백엔드
  //023: 컴퓨터시스템 - 백엔드
  //024: 소프트웨어 - 백엔드
  //025: 데이터 - 백엔드
  //056, 214302: 디자이너 - 디자인

  async mounted() {
    //action에 있는 loadXml 호출용

    await this.$store.dispatch("memberStore/getMemberInfo");

    if (this.userData.memberPosition != undefined) {
      await this.$store.dispatch("jobStore/rcmJob", {
        memberPosition: this.userData.memberPosition,
      });
    }
    await this.$store.dispatch("jobStore/loadXml");
    this.$store.dispatch("FETCH_QNABOARD");
    this.$store.dispatch("FETCH_COMMUNITYBOARD");
    this.$store.dispatch("FECH_MEETINGLIST");
    this.$store.dispatch("FETCH_NOTICE");
    this.$store.dispatch("FECH_ITNEWS_LIST");
  },

  computed: {
    //구직정보 데이터

    //유저데이터 호출
    ...memberState(["loginStatus", "userData"]),
    ...jobState(["jobs", "rcmJobs"]),
    ...mapState(["qnaboard1", "communityboard", "noticeList"]),

    itnewsList() {
      return this.$store.state.itnewsList.slice(0, 3);
    },

    meeting() {
      return this.$store.state.meeting
        .slice()
        .reverse()
        .slice(0, 4);
    },
  },
};
</script>
<style scoped>
/* 상단 박스 css */

.commu-content,
.notice-content {
  overflow: hidden;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  height: 120px;
}
.collab-router,
.qna-router,
.commu-router,
.notice-router {
  text-decoration: none;
  color: black;
}

.qna-btn,
.ans-btn,
.com-btn,
.ntc-btn {
  height: 26px !important;
  width: 45px !important;
  font-size: 13px;
  padding: 0px;
  display: inline-block;
  cursor: auto !important;
  pointer-events: none;
}
.qna-btn {
  border-color: #ee6f57;
  color: #ee6f57;
  background-color: white;
}
.ans-btn {
  border-color: #16a596;
  color: #16a596;
  background-color: white;
}
.com-btn {
  border-color: #424874;
  color: #424874;
  background-color: white;
}
.ntc-btn {
  border-color: #a20a0a;
  color: #a20a0a;
  background-color: white;
}
.job-card {
  text-decoration: none;
  color: black;
}
.card.table-card {
  border-radius: 0px !important;
}

.job-card:hover {
  cursor: pointer;
}
/* 서치바 */
.location-div {
  width: 100%;
  border: 1px solid #424874;
  margin-top: 0px;
  padding-top: 0px;
  display: none;
}
div.location-div.on {
  display: block;
}
.prov-layer {
  width: 30%;
  border-right: 1px solid #424874;
  display: inline-block;
}
.city-layer {
  width: 70%;
  display: none;
}
.city-layer.on {
  display: inline-block;
}
/* 추천채용정보 */
.profile-btn {
  background-color: #424874;
  border: 0px;
  height: 45px;
}

.card-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1.75rem !important;
}
.table-content {
  height: 75px;
  border-bottom: 1px solid #ededed;
}
.card-header + table tr:last-child .table-content {
  border-bottom: none;
}
.info-card {
  border: 1px solid #ededed;
  height: 130px;
  border-radius: 0px !important;
}
.card-title {
  height: 60px;
}
.card-footer {
  height: 45px;
}
.card-text {
  height: 50px;
}

.main-top {
  height: 500px;
}
.banner-content .form-wrap {
  border: 3px solid #424874;
}
.banner-content .form-wrap .btn-info {
  background-color: #424874;
  width: 100%;
  height: 100%;
  color: #fff;
  border-radius: 0;
  border: none;
  text-transform: uppercase;
}
.banner-content .form-wrap .form-control {
  height: 40px;
  border-radius: 0;
  font-size: 14px;
}
.card.table-card {
  height: 385px;
}
div[role="region"] {
  height: 385px;
}
.info-card[data-v-8dc7cce2] {
  height: 193px;
}

.main-top[data-v-8dc7cce2] {
  height: auto;
}
.qst + .text-muted {
  max-height: 68px;
  overflow: hidden;

  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.ans {
  width: 100%;
  min-height: 50px;
  position: absolute;
  bottom: 0;
}
.txt {
  width: 365px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card.table-card[data-v-8dc7cce2] {
  overflow: hidden;
}
.card-header + table tr td:hover {
  background-color: #f4eef4;
}
.card:not(.collab):hover {
  background-color: #f4eef4;
}
.carousel-custom >>> div {
  position: unset !important;
  bottom: auto !important;
}
#test {
  border: 1px solid red;
  height: 200px;
  width: 500px;
  display: none;
}

#itCrousel,
#carousel-1 {
  min-width: 365px !important;
  min-height: 385px !important;
}
#itCaption {
  font-size: 20px;
}
.it-list {
  background: #ededed4c;
}
.it-list:hover {
  cursor: pointer;
}
#itContent {
  padding-right: 20px;
  padding-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

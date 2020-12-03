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
                  <b-button
                    v-b-toggle.collapse-3
                    class="form-control"
                    v-model="selectedLocation"
                    >수정수정</b-button
                  >
                  <b-collapse id="collapse-3" class="mt-2 toggle-btn">
                    <b-card>
                      <p class="card-text">
                        흠
                      </p>
                    </b-card>
                  </b-collapse>
                </div>
              </div>

              <div class="col-lg-3 form-cols ">
                <div>
                  <b-form-select
                    class="form-control"
                    v-model="selectedJob"
                    :options="options2"
                  ></b-form-select>
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
          </b-form>
        </div>

        <!-- 메인 -->
        <div class="col-4 pl-0">
          <b-carousel
            id="carousel-1"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <!-- Text slides with image -->
            <b-carousel-slide
              class="carousel-custom"
              caption="First slide"
              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
              ><p>IT소식</p>
            </b-carousel-slide>
          </b-carousel>
        </div>

        <div class="col-4 pl-0">
          <!-- 공지  -->
          <div class="row">
            <template v-if="communityboard">
              <div class="card col-6 m-0 p-0 info-card">
                <div class="m-2">
                  <b-btn class="ntc-btn">공지</b-btn><span></span>

                  <p class="text-muted m-b-0 notice-content"></p>
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
                v-if="qnaboard[qnaboard.length - 1] != undefined"
              >
                <router-link
                  :to="{
                    name: 'qnaView',
                    params: { id: qnaboard[qnaboard.length - 1].qnaSeq },
                  }"
                  class="qna-router"
                >
                  <div class="qst">
                    <b-btn class="qna-btn">질문</b-btn>
                    <span>{{ qnaboard[qnaboard.length - 1].qnaTitle }}</span>
                  </div>
                  <p class="text-muted m-b-0">
                    {{ qnaboard[qnaboard.length - 1].qnaContent }}
                  </p>

                  <div class="ans">
                    <b-btn class="ans-btn">답변</b-btn>
                    <span
                      v-if="qnaboard[qnaboard.length - 1].qnaAnswerYn == 'N'"
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
                v-if="qnaboard[qnaboard.length - 2] != undefined"
              >
                <router-link
                  :to="{
                    name: 'qnaView',
                    params: { id: qnaboard[qnaboard.length - 2].qnaSeq },
                  }"
                  class="qna-router"
                >
                  <div class="qst">
                    <b-btn class="qna-btn">질문</b-btn>
                    <span>{{ qnaboard[qnaboard.length - 2].qnaTitle }}</span>
                  </div>
                  <p class="text-muted m-b-0">
                    {{ qnaboard[qnaboard.length - 2].qnaContent }}
                  </p>

                  <div class="ans">
                    <b-btn class="ans-btn">답변</b-btn>
                    <span
                      v-if="qnaboard[qnaboard.length - 2].qnaAnswerYn == 'N'"
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
          <div class="row">
            <div
              class="col-xl-3 col-sm-6 col-12"
              v-for="(item, i) in rcmJson.wantedRoot.wanted"
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
        </div>
      </template>
      <!-- memberPosition이 등록되지 않은 경우 -->
      <template v-else-if="userData.memberPosition == null">
        <div class="container">
          <p class="m-3 text-center">
            {{ userData.memberName }}님 프로필을 등록해주시면 ITJOBGO에서 추천
            채용정보를 추천해드립니다.
          </p>
          <p class="text-center mt-4">
            <router-link to="/myPage"
              ><b-btn class="profile-btn"
                >프로필 등록바로가기</b-btn
              ></router-link
            >
          </p>
        </div>
      </template>
    </template>

    <!-- 최신채용정보 -->

    <div class="container">
      <h3 class="m-3"><strong class="tit_cont">최신 채용 정보</strong></h3>
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
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mapState } from "vuex";

const { mapState: jobState } = createNamespacedHelpers("jobStore");
const { mapState: memberState } = createNamespacedHelpers("memberStore");
// import $ from 'jquery';

var convert = require("xml-js");

//로그인한 사람에 따라 추천 parmeter 수정하기

export default {
  data() {
    return {
      // inputSearch,//search bar 검색어

      rcmJson: [], //추천 채용정보
      selectedLocation: null,
      selectedJob: null,
      keyword: "",
      options2: [
        { value: null, text: "직무를 선택해주세요" },
        { value: "aa", text: "Web developer" },
        { value: "bb", text: "Selected Option" },
        { value: { CC: "3PO" }, text: "This is an option with object value" },
        { value: "dd", text: "This one is disabled", disabled: true },
      ],
    };
  },
  methods: {
    //서치바
    jobSearch: function() {
      let keyword = this.keyword;
      this.$router.push({
        name: "jobSearchDtl",
        params: { keyword: keyword }, //검색 keyword pass
      });
    },
  },
  created() {
    //214201,214200,214202 : 컴퓨터강사 : 백엔드, 프론트엔드, 퍼블리셔
    //022: 컴퓨터하드웨어, 통신공학 - 백엔드
    //023: 컴퓨터시스템 - 백엔드
    //024: 소프트웨어 - 백엔드
    //025: 데이터 - 백엔드
    //056, 214302: 디자이너 - 디자인
    setTimeout(() => {
      //유저정보 대기
      if (this.userData.memberPosition != null) {
        this.$http
          .get(
            "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=20&keyword=" +
              this.userData.memberPosition
          ) //추천 채용정보
          .then((response) => {
            var xml = response.data;
            var json = convert.xml2json(xml, { compact: true });
            this.rcmJson = JSON.parse(json);
          });
      }
    }, 1000);
  },
  mounted() {
    //action에 있는 loadXml 호출용
    this.$store.dispatch("jobStore/loadXml");
    this.$store.dispatch("FETCH_QNABOARD");
    this.$store.dispatch("FETCH_COMMUNITYBOARD");
    this.$store.dispatch("FECH_MEETINGLIST");
  },
  computed: {
    //구직정보 데이터
    ...jobState([
      //매핑값
      "jobs",
    ]),
    //유저데이터 호출
    ...memberState(["loginStatus", "userData"]),

    ...mapState(["qnaboard", "communityboard"]),

    meeting() {
      return this.$store.state.meeting.slice().reverse();
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
.commu-router {
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
</style>

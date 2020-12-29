<template>
  <body>
    <div class="container-fluid">
      <div class="row">
        <!-- <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"> -->
        <!-- 메인 이미지 -->
        <div class="submenuimage3 ">
          <p class="subtitle" id="subtitle1">자유게시판</p>
        </div>

        <!-- 탭 -->
        <div class="container">
          <v-tabs centered color="grey darken-3">
            <v-tab to="/noticeList"><b>공지사항</b></v-tab>
            <v-tab to="/itNewsList"><b>IT소식</b></v-tab>
            <v-tab to="/communityBoardList"><b>자유게시판</b></v-tab>
            <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs>

          <h2 class="sub-header">자유게시판</h2>
          <br />
          <!-- 버튼 -->

          <b-row id="writecontain2" align-h="end">
            <b-button
              to="/communityBoardForm"
              exact
              v-if="userData.memberSq != null"
            >
              글쓰기
            </b-button>
          </b-row>
          <div class="overflow-hidden">
            <!-- 테이블 -->
            <v-card>
              <v-card-title class="search-bar">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

              <v-data-table
                class="qnahover"
                :headers="headers"
                :items="communityboard"
                :search="search"
                item-key="boardSq"
                single-line
                hide-details
              >
                <!-- :server-items-length="communityboard.length" -->

                <template v-slot:item="props">
                  <tr @click="handleClick(props.item.boardSq)">
                    <td class="text-xs-right">{{ props.item.boardSq }}</td>
                    <td class="text-xs-right">
                      {{ props.item.boardDivision }}
                    </td>
                    <td class="text-xs-right">
                      {{ props.item.boardTitle }} ({{
                        props.item.commentCount
                      }})
                    </td>
                    <td class="text-xs-right">{{ props.item.boardWriter }}</td>
                    <td class="text-xs-right">
                      {{ formatDate(props.item.boardDate) }}
                    </td>
                    <td class="text-xs-right">{{ props.item.boardCount }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
            <!-- <div>객체(임시) : {{communityboard}}</div>
            <div>날짜 [0] 인덱스 (임시) : {{communityboard[0].boardDate | moment('YYYY-MM-DD')}}</div> -->
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import vueMoment from "vue-moment";
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

Vue.use(vueMoment);

export default {
  created: function() {
    this.$store.dispatch("FETCH_COMMUNITYBOARD");
  },
  computed: {
    ...mapState({
      communityboard: (state) => state.communityboard,
    }),
    ...loadUserState(["userData"]),
  },

  methods: {
    handleClick(value) {
      this.$router.replace({
        name: "CommunityBoardView",
        params: { id: value },
      });
      // console.log(this.$moment(value.boardDate).format('YYYY-MM-DD'));
    },
    // 날짜변환 함수
    formatDate(value) {
      // console.log(value);
      return this.$moment(value).format("YYYY-MM-DD");
    },
  }, //method 끝

  data() {
    return {
      search: "",
      headers: [
        {
          text: "번호",
          align: "start",
          filterable: false,
          value: "boardSq",
        },
        { text: "분류", value: "boardDivision" },
        { text: "제목", value: "boardTitle" },
        { text: "작성자", value: "boardWriter" },
        { text: "작성날짜", value: "boardDate" },
        //수정중입니다.
        // { text: '작성날짜', value: '[boardDate | this.$moment("YYYY-MM-DD")]'},
        { text: "조회수", value: "boardCount" },
      ],
    };
  },
};
</script>

<style>
@import "../../assets/css/BoardList.css";

#writecontain2 > .btn {
  position: relative;
  top: 50px;
  left: -20px;
  background-color: #424874;
  border: none;
  color: white;
}
#writecontain2 {
  margin-bottom: 10%;
}

#subtitle1 {
  color: white;
  font-size: 50px;
  font-weight: bold;
}
.example::-webkit-scrollbar {
  display: none;
}
* {
  font-family: "Noto Sans KR", sans-serif;
}

.search-bar {
  width: 30%;
  margin-left: 72%;
}
.submenuimage3 {
  background-image: url("../../assets/images/communityList.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.submenuimage3 {
  width: 100%;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
/* hover */
.qnahover >>> tbody tr :hover {
  cursor: pointer;
}
</style>

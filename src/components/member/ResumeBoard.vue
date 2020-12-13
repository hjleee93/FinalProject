<template>
  <body>
    <div class="container-fluid">
      <div class="row">
        <!-- 메인 이미지 -->
        <div class="submenuimage ">
          <p class="subtitle" id="subtitle">이력서</p>
        </div>
        <div class="container">
          <!-- 게시판시작 -->

          <div class="overflow">
            <!-- 테이블 -->
            {{ resume }}
            <!-- <v-card>
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
                class="row-pointer mt-4"
                :headers="headers"
                :items="resume"
                :search="search"
              >
              
              </v-data-table>
            </v-card> -->
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
// import { mapState } from "vuex";

const { mapState: memberState } = createNamespacedHelpers("memberStore");

export default {
  data: () => ({
    search: "",

    headers: [
      { text: "제목", value: "company", class: "custom-header" },
      { text: "날짜", value: "title", class: "custom-header" },
      { text: "컨설팅 현황", value: "ability", class: "custom-header" },
    ],
  }),
  async mounted() {
    await this.$store.dispatch("memberStore/getMemberInfo");

    await this.$store.dispatch("FETCH_RESUME", this.userData.memberSq);
  },

  methods: {
    //상세페이지로 이동
    moveDtlPage: function(e) {
      this.$router.push({ name: "jobInfoDtl", params: { wantedNo: e } });
    },
  },
  computed: {
    ...memberState(["loginStatus", "userData"]),
  },
};
</script>

<style scoped>
#job-title {
  font-size: 16px;
  margin-top: 13px;
}
.title-dtl {
  width: 120px;
}
.job-info {
  height: 100px !important;
}

.d-day-btn {
  height: 26px !important;
  width: 45px !important;
  font-size: 13px;
  padding: 0px;
  display: inline-block;
  cursor: auto !important;
  pointer-events: none;
  border: 0px;
  font-weight: bold;
}
.argent-btn {
  background-color: #cf1b1b !important;
}
.warn-btn {
  background-color: #fddb3a !important;
}
.ok-btn {
  background-color: #158467 !important;
}
/* header css */
.row-pointer >>> thead tr {
  background-color: #ededed;
  border-top: 2px solid #d5d5d5;
}
.row-pointer >>> thead tr th span {
  font-size: 15px;
  font-weight: bold;
  color: #4e5157;
}
/* hover */
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}

.overflow .v-card {
  margin-bottom: 50px;
  box-shadow: 0 0 black !important;
}
.submenuimage {
  width: 100%;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
#subtitle {
  font-family: "Barlow Semi Condensed", sans-serif;
}
.subtitle {
  font-family: "Masque";
  color: #4e5157;
  font-size: 50px;
}

.sub-header {
  position: relative;
  padding-top: 45px;
  text-align: center;
}
.v-slide-group__content {
  justify-content: center;
}

.search-bar {
  width: 30%;
  margin-left: 72%;
}
</style>

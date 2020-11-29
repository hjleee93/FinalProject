<template>
  <body>
    <div class="container-fluid">
      <div class="row">
        <!-- 메인 이미지 -->
        <div class="submenuimage ">
          <p class="subtitle" id="subtitle">구인정보</p>
        </div>
        <div class="container">
          <!-- 탭 -->
          <v-tabs color="grey darken-3"> </v-tabs>

          <!-- 게시판시작 -->
          <!-- <p>{{this.keyword}}</p> -->

          <div class="overflow">
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
                class="row-pointer"
                :headers="headers"
                :items="tableList"
                :search="search"
                @click:row="moveDtlPage"
              ></v-data-table>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("jobStore");

export default {
  data: () => ({
    search: "",

    headers: [
      { text: "기업명", value: "company" },
      { text: "제목", value: "title" },
      { text: "지원자격", value: "ability" },
      { text: "근무조건", value: "Condition" },
      { text: "마감일·등록일", value: "deadline" },
    ],
  }),
  mounted() {
    this.$store.dispatch("jobStore/searchLoadTable", {
      keyword: this.$route.params.keyword,
    });
  },

  methods: {
    //상세페이지로 이동
    moveDtlPage: function(e) {
      this.$router.push({ name: "jobInfoDtl", params: { wantedNo: e.jobNo } });
    },
  },
  computed: {
    ...mapState([
      //매핑값
      "tableList",
      "jobInfo",
    ]),
  },
};
</script>

<style scoped>
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

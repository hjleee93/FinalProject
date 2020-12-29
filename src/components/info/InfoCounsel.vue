<template>
  <b-container fluid>
    <!--서브 이미지-->
    <b-row>
      <div class="submenuimageinfo">
        <p class="subtitle" id="subtitle">취업정보</p>
      </div>
    </b-row>

    <div class="container">
      <v-tabs centered color="grey darken-3">
        <v-tab to="/infoList"><b>ALL</b></v-tab>
        <v-tab to="/infoExplain"><b>설명회</b></v-tab>
        <v-tab to="/infoFair"><b>박람회</b></v-tab>
        <v-tab to="/infoCounsel"><b>상담회</b></v-tab>
        <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
      </v-tabs>

      <h4 class="sub-header">취업설명회 일정</h4>

      <div class="overflow-hidden">
        <!--테이블-->
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
            class="infohover"
            :headers="headers"
            :items="info"
            :search="search"
            item-key="infoSq"
            single-line
            hide-details
          >
            <template v-slot:item="props">
              <tr @click="handleClick(props.item.infoSq)">
                <td
                  v-if="props.item.infoCategory.includes('상담회')"
                  class="text-xs-right"
                >
                  {{ props.item.infoSq }}
                </td>
                <td
                  v-if="props.item.infoCategory.includes('상담회')"
                  class="text-xs-right"
                >
                  {{ props.item.infoTitle }}
                </td>
                <td
                  v-if="props.item.infoCategory.includes('상담회')"
                  class="text-xs-right"
                >
                  {{ props.item.infoDate }}
                </td>
                <td
                  v-if="props.item.infoCategory.includes('상담회')"
                  class="text-xs-right"
                >
                  {{ props.item.infoTime }}
                </td>
                <td
                  v-if="props.item.infoCategory.includes('상담회')"
                  class="text-xs-right"
                >
                  {{ props.item.infoContent }}
                </td>
                <td
                  v-if="props.item.infoCategory.includes('상담회')"
                  class="text-xs-right"
                >
                  {{ props.item.infoCount }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </div>

      <b-row id="writecontain" align-h="end">
        <b-button to="/infoForm" v-if="userData.memberEmail === 'admin@kh.com'">
          글쓰기
        </b-button>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import { createNamespacedHelpers } from "vuex";
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");

export default {
  created: function() {
    this.$store.dispatch("FETCH_INFO");
  },
  computed: {
    ...mapState({
      info: (state) => state.info,
    }),
    ...loadUserState(["userData"]),
  },
  methods: {
    handleClick(value) {
      this.$router.replace({ name: "InfoDetail", params: { id: value } });
    },
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "번호",
          align: "start",
          filterable: false,
          value: "infoSq",
        },
        { text: "기업명", value: "infoTitle" },
        { text: "날짜", value: "infoDate" },
        { text: "시간", value: "infoTime" },
        { text: "주소/내용", value: "infoContent" },
        { text: "조회수", value: "infoCount" },
      ],
    };
  },
};
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
.submenuimageinfo {
  background-image: url("../../assets/images/infoJob.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
  width: 100%;
}
.sub-header {
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 30px;
  margin-bottom: 20px;
}
.subtitle {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  color: rgb(253, 253, 253);
  text-shadow: 2px 2px #0d0d0e63;
  font-size: 50px;
}
#st_write1 {
  position: relative;
  top: 9px;
  left: 1035px;
  width: 73px;
  margin-bottom: 10px;
  right: -40px;
  margin-right: 3.5%;
  background-color: #424874;
  border: none;
  color: white;
}
.search-bar {
  width: 30%;
  margin-left: 72%;
}
#writecontain > .btn {
  background-color: #424874;
}
#writecontain {
  margin-bottom: 10%;
  margin-top: 5%;
  margin-bottom: 0%;
}
.infohover >>> tbody tr :hover {
  cursor: pointer;
}
</style>

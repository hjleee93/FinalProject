<template>
  <div class="resume_List">
    <body>
      <div class="container-fluid">
        <div class="submenuimage">
          <p class="subtitle">입사지원서 목록</p>
        </div>
        <div>
          <v-tabs centered color="grey darken-3">
            <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
            <v-tab active to="/resume/resumeList">입사지원서 보기</v-tab>
            <v-tab to="/resume/consultresume">입사지원서 컨설팅</v-tab>
            <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
            <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs>
        </div>
        <div class="container">
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
              <!-- vuetify에 data table에 items를 선언한 배열 변수로 지정해준다 -->
              <v-data-table
                class="row-pointer mt-4"
                :headers="headers"
                :items="resumeList"
                :search="search"
                item-key="name"
              >
                <template v-slot:item="props">
                  <tr>
                    <td
                      class="text-xs-right"
                      @click="handleClick(props.item.resumeNo)"
                    >
                      {{ props.item.resumelistNo }}
                    </td>
                    <td
                      class="text-xs-right"
                      @click="handleClick(props.item.resumeNo)"
                    >
                      {{ props.item.resumelistTitle }}
                    </td>
                    <td
                      class="text-xs-right"
                      @click="handleClick(props.item.resumeNo)"
                    >
                      {{ props.item.resumelistWriter }}
                    </td>
                    <td
                      class="text-xs-right"
                      @click="handleClick(props.item.resumeNo)"
                    >
                      {{ props.item.resumelistAttachment }}
                    </td>
                    <td
                      class="text-xs-right"
                      @click="handleClick(props.item.resumeNo)"
                    >
                      {{ formatDate(props.item.resumelistDate) }}
                    </td>
                    <td class="text-xs-right">
                      <b-button
                        pill
                        variant="outline-success"
                        @click="updateResume(props.item.resumeNo)"
                        >수정</b-button
                      >
                    </td>
                    <td class="text-xs-right">
                      <b-button
                        pill
                        variant="outline-danger"
                        @click="deleteResume(props.item.resumeNo)"
                        >삭제</b-button
                      >
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
//import axios from "axios";
import { mapState } from "vuex";
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "",
          align: "start",
          filterable: false,
          value: "resumelistNo",
        },
        // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다

        { text: "제목", value: "resumelistTitle" },
        { text: "작성자", value: "resumelistWriter" },
        { text: "첨부파일", value: "resumelistAttachment" },
        { text: "작성일", value: "resumelistDate" },
        { text: "", value: "" },
        { text: "", value: "" },
      ],
      // spring에서 데이터를 받을 변수 배열형태를 선언한다
    };
  },
  computed: {
    ...mapState({
      resumeList: (state) => state.resumeList,
    }),
    ...loadUserState(["userData"]),
  },

  methods: {
    handleClick(value) {
      this.$router.push({ name: "resume", params: { id: value } });
      //console.log(value);
    },

    updateResume(value) {
      this.$router.push({ name: "updateresume", params: { id: value } });
      //console.log(value);
    },

    deleteResume(value) {
      alert("이력서를 삭제하시겠습니까?");
      const resumeNo = value;
      this.$store.dispatch("FETCH_RESUME_DELETE", resumeNo);
      setTimeout( () => this.$router.go(this.$router.currentRoute), 2000);
    },

    formatDate(value) {
      return this.$moment(value).format("YYYY-MM-DD");
    },
  },
  created() {
    const memberSq = this.userData.memberSq;
    this.$store.dispatch("FETCH_RESUMELIST", memberSq);
  },
};
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}

.submenuimage {
  background-image: url("../../assets/images/resume.jpeg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.subtitle {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
  font-size: 50px;
}
.consult_resume {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.submenuimage {
  width: 100%;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
#writecontain {
  margin-bottom: 10%;
}
#writecontain > .btn {
  background-color: #424874;
}
.overflow .v-card {
  box-shadow: 0 0 black !important;
  margin-bottom: 12%;
}
  .search-bar {
  width: 30%;
  margin-left: 72%;
  }
* {
  font-family: "Noto Sans KR", sans-serif;
}

/* hover */
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>

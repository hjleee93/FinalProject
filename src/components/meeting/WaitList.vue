<template>
  <div class="container-fluid">
    <div class="row">
      <div class="submenuimage">
        <p class="subtitle">WAITING LIST</p>
      </div>

      <div class="container">
        <v-tabs centered color="grey darken-3">
          <v-tab to="/meetingapply"><b>신청자승인</b></v-tab>
          <v-tab
            :to="{ name: 'mkmeeting', params: { memberSq: userData.memberSq } }"
            ><b>생성한모임</b></v-tab
          >
          <v-tab
            :to="{ name: 'approve', params: { memberSq: userData.memberSq } }"
            ><b>참여한모임</b></v-tab
          >
          <v-tab
            :to="{ name: 'waitList', params: { memberSq: userData.memberSq } }"
            ><b>승인 대기중인 모임</b></v-tab
          >
          <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
        </v-tabs>
      </div>
    </div>
    <b-container>
      <p class="text-center">
        {{ userData.memberName }}님이 신청한 모임의 개설자가 허가를 보류중인
        목록입니다
      </p>
      <b-row>
        <b-col>
          <v-data-table
            :headers="headers"
            :items="waitList"
            class="row-pointer mt-4"
            item-key="name"
          >
            <template v-slot:item="props">
              <template v-if="props.item.memberSq == userData.memberSq">
                <tr @click="movemeeting(props.item.mboard.collabSq)">
                  <td class="text-xs-right">
                    {{ props.item.mboard.collabTitle }}
                  </td>
                  <td class="text-xs-right">
                    {{ props.item.mboard.collabWriter }}
                  </td>
                  <td class="text-xs-right">
                    {{ formatDate(props.item.tmpDate) }}
                  </td>
                </tr>
              </template>
            </template>
          </v-data-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapState } from "vuex";
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");

export default {
  data() {
    return {
      memberSq: "",
      headers: [
        // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다
        { text: "모임 제목", value: "meetingTitle" },
        { text: "모임 개설자", value: "meetingWriter" },
        { text: "신청 날짜", value: "applyDate" },
      ],
    };
  },
  async mounted() {
    await this.$store.dispatch("memberStore/getMemberInfo");
    await this.$store.dispatch("FECH_WAITLIST", this.$route.params.memberSq);
  },

  computed: {
    ...mapState({
      waitList: (state) => state.waitList,
    }),
    ...loadUserState(["userData"]),
  },
  methods: {
    formatDate(value) {
      return this.$moment(value).format("YYYY-MM-DD");
    },
    movemeeting(item) {
      this.$router.push({ name: "meetinginfo", params: { id: item } });
    },
  },
};
</script>

<style scoped>
.submenuimage {
  background-image: url("../../assets/images/meeting-status.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.submenuimage {
  width: 100%;
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
</style>

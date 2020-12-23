<template>
  <div class="container-fluid">
    <div class="row">
      <div class="submenuimage">
        <p class="subtitle">CREATED MEETING LIST</p>
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
            :to="{
              name: 'waitList',
              params: { memberSq: userData.memberSq },
            }"
            ><b>승인 대기중인 모임</b></v-tab
          >
          <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
        </v-tabs>
      </div>
    </div>
    <b-container>
      <p class="text-center">
        {{ userData.memberName }}님이 개설하신 모임 목록입니다
      </p>
      <b-row>
        <b-col>
          <v-data-table
            class="row-pointer mt-4"
            :headers="headers"
            :items="mklist"
            item-key="name"
          >
            <template v-slot:item="props">
              <tr>
                <td class="text-xs-right">{{ props.item.collabSq }}</td>
                <td
                  class="text-xs-right"
                  @click="movemeeting(props.item.collabSq)"
                >
                  {{ props.item.title }}
                </td>
                <td class="text-xs-right">
                  {{ new Date(props.item.mdate).toLocaleDateString() }}
                </td>
                <td class="text-xs-right">
                  <b-button @click="update(props.item)">수정</b-button
                  ><b-button @click="deltemet(props.item, props.index)"
                    >삭제</b-button
                  >
                </td>
                <td class="text-xs-right">
                  <b-button
                    v-b-toggle.sidebar-backdrop
                    @click="applylist(props.item.collabSq)"
                    >참가자현황</b-button
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
          <b-sidebar
            id="sidebar-backdrop"
            title="모임 참가자 현황"
            :backdrop-variant="variant"
            backdrop
            shadow
          >
            <div class="px-3 py-2">
              <b-card title="참가자">
                <div v-for="user in enter" :key="user.id">
                  <b-avatar size="sm"></b-avatar>
                  <p class="enteruser">
                    {{
                      `${user.MEMBER_NAME}/${user.MEMBER_EMAIL}/${user.POSITION}`
                    }}
                  </p>
                </div>
              </b-card>
            </div>
          </b-sidebar>
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
      enter: [],
      variant: "dark",
      headers: [
        {
          text: "번호",
          align: "start",
          filterable: false,
          value: "collabSq",
        },
        // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다
        { text: "모임제목", value: "title" },
        { text: "생성일", value: "mdate" },
        { text: "수정/삭제", value: "status" },
        { text: "참가자현황" },
      ],
    };
  },
  created() {
    //로컬 사용해서 로그인한 사용자 이메일 가져오기
    const no = this.$route.params.memberSq;
    this.$store.dispatch("FECH_MKLIST", no);
  },
  computed: {
    ...mapState({
      mklist: (state) => state.mklist,
    }),
    ...loadUserState(["userData"]),
  },
  methods: {
    applylist(no) {
      this.$store.dispatch("FECH_APPLYLIST", no).then(({ data }) => {
        this.enter = data;
      });
    },
    movemeeting(item) {
      this.$router.push({ name: "meetinginfo", params: { id: item } });
    },
    deltemet(item, index) {
      let check = confirm("정말삭제하시겠습니까?");
      if (check == true) {
        const no = item.collabSq;
        this.$store.dispatch("FECH_MEETINGDEL", no).then(() => {
          this.mklist.splice(index, 1);
        });
      } else return;
    },
    update(item) {
      let update = confirm("수정하시겠습니까?");
      if (update == true) {
        const uno = item.collabSq;
        this.$router.push({ name: "meetingupdate", params: { id: uno } });
      }
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
#approve {
  color: blue;
}
#unpprove {
  color: red;
}
.enteruser {
  font-size: 14px;
}
* {
  font-family: "Noto Sans KR", sans-serif;
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

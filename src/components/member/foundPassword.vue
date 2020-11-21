<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">비밀번호 찾기</h1>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>

    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="border-0 mb-0 login-content">
            <b-card-header class="login-content">
              <div class="text-muted text-center mt-2 mb-3">
                가입시 사용하신 전화번호를 입력해주세요
              </div>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <b-form role="form" @submit.prevent="onSubmit">
                <!-- TODO: 첫 입력 문자로 입력되는거 수정해야됨 -->
                <b-form-input
                  alternative
                  class="mb-3"
                  type="number"
                  placeholder="Your phone"
                  v-model="phone"
                >
                </b-form-input>

                <div class="text-center">
                  <b-button type="primary" native-type="submit" class="my-4"
                    >Continue</b-button
                  >
                </div>
              </b-form>
            </b-card-body>
          </b-card>

          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/findEmail" class="text-dark"
                ><small>Forgot email?</small></router-link
              >
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-dark"
                ><small>Create new account</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    phone: "",
  }),

  methods: {
    onSubmit() {
      const formData = {
        memberPhone: this.phone,
        memberEmail: this.$route.params.memberEmail,
      };
      const self = this;
      axios
        .post(
          "http://localhost:8082/itjobgo/member/compareEmailPhone",
          formData
        ) //form server 연결
        .then((response) => {
          this.test1 = response.data;
          if (this.test1 == "") {
            //전화번호와 이메일이 매치되지 않는 경우
            this.$swal({
              text: "입력한 정보와 일치하는 정보가 없습니다.",
              icon: "error", //built in icons: success, warning, error, info
              timer: 5000, //timeOut for auto-close
            });
          } else {
            self.$router.push({
              name: "changePassword",
              params: { memberEmail: this.$route.params.memberEmail },
            }); //이메일 찾음 -> 페이지 이동
          }
        }); //반환값
    },
  },
};
</script>

<style scoped>

.login-content {
  background-color: #f7fafc !important;
  border-radius: 5px;
}
/* number필드 화살표 지우기 : 파폭제외 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* 파폭용  */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>

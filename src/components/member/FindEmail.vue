<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">이메일 찾기</h1>
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
                가입시 사용하신 전화번호와 이름을 입력하세요.
              </div>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <b-form role="form" @submit.prevent="onSubmit">
                <b-form-input
                  alternative
                  class="mb-3"
                  required
                  placeholder="Name"
                  v-model="memberName"
                >
                </b-form-input>
                <b-form-input
                  alternative
                  class="mb-3"
                  name="phoneNumber"
                  required
                  type="number"
                  placeholder="Phone Number"
                  v-model="phone"
                >
                </b-form-input>

                <div class="text-center">
                  <base-button type="primary" native-type="submit" class="my-4"
                    >Continue</base-button
                  >
                </div>
              </b-form>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/findPassword" class="text-dark"
                ><small>Forgot password?</small></router-link
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
    email: "",
    memberName: "",
    phone: "",
  }),
  methods: {
    onSubmit() {
      const formData = {
        memberPhone: this.phone,
        memberName: this.memberName,
      };
      const self = this;
      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/selectPhone",
          formData
        ) //form server 연결
        .then((response) => {
          this.info = response.data;
          if (this.info == "") {
            //전화번호 존재하지 않는 경우 alert
            this.$swal({
              text:
                "입력하신 정보가 일치하지 않습니다. 다시 한 번 확인해주세요.",
              icon: "error", //built in icons: success, warning, error, info
              timer: 5000, //timeOut for auto-close
            });
          } else {
            self.$router.replace({
              name: "foundEmail",
              params: { email: this.info.memberEmail },
            }); //전화번호 찾음 -> 페이지 이동
          }
        });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
.login-content {
  background-color: #f7fafc !important;
  border-radius: 5px;
}

.btn-primary {
  text-decoration: none;
  color: #fff;
  background-color: #424874;
  border-color: #424874;
}
.btn-primary:hover {
  text-decoration: none;
  border-color: #424874;
  background-color: #424874;
  transform: translateY(-1px);
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

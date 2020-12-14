<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black mt-3">회원탈퇴</h1>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="border-0 mb-0 ">
            <b-card-header class="info-content mb-4 text-center">
              <div class="text-muted text-center chg-info">
                <router-link class="nav-link px-0" to="/chgMemberInfo"
                  >개인정보수정</router-link
                >
              </div>
              <template
                v-if="
                  this.userData.memberLevel == 1 ||
                    this.userData.memberLevel == 2
                "
              >
                <div class="text-muted text-center chg-pwd">
                  <router-link class="nav-link px-0" to="/chgPwdInfo"
                    >비밀번호변경</router-link
                  >
                </div>
              </template>
              <div class="text-muted text-center out-info">
                <router-link class="nav-link px-0" to="/deleteMember"
                  >회원탈퇴</router-link
                >
              </div>
            </b-card-header>

            <b-card-body class="px-lg-5 py-lg-5 info-content">
              <div class="m-4 text-center">
                <p class="text-center font-weight-bold h5">
                  탈퇴 즉시 회원정보 삭제
                </p>

                -탈퇴 즉시 이력서 및 구직활동 정보가 모두 삭제되며, <br />삭제된
                정보는 복구되지 않습니다. <br />단, 공공적 성격의 게시물은
                삭제되지 않으므로 탈퇴 전 미리 삭제해주세요.
              </div>
              <!-- <b-form role="form" @submit.prevent="onSubmit"> -->
              <b-form role="form">
                <div id="account">
                  <template
                    v-if="
                      userData.memberLevel == 1 || userData.memberLevel == 2
                    "
                  >
                    <div id="email">
                      <b-input-group prepend="이메일">
                        <b-form-input
                          readonly
                          class="readonly-input email"
                          v-model="userData.memberEmail"
                        ></b-form-input>
                      </b-input-group>
                    </div>
                    <div class="pwd">
                      <b-input-group prepend="비밀번호">
                        <b-form-input
                          class="pwd"
                          required
                          type="password"
                          placeholder="현재 비밀번호 입력"
                          v-model="memberPwd"
                        ></b-form-input>
                      </b-input-group>
                    </div>
                  </template>
                </div>

                <div class="text-center">
                  <template v-if="userData.memberLevel == 4">
                    <base-button
                      type="primary "
                      class="delete-btn my-4"
                      @click="naverLoginURL()"
                      >회원 탈퇴</base-button
                    >
                  </template>
                  <template
                    v-if="
                      userData.memberLevel == 1 || userData.memberLevel == 2
                    "
                  >
                    <base-button
                      type="primary "
                      class="delete-btn my-4"
                      @click="deleteMember()"
                      >회원 탈퇴</base-button
                    >
                  </template>
                  <template v-if="userData.memberLevel == 3">
                    <base-button
                      type="primary "
                      class="delete-btn my-4"
                      @click="kakaoDelete"
                      >회원 탈퇴</base-button
                    >
                  </template>
                </div>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script
  type="text/javascript"
  src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"
  charset="utf-8"
></script>
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios";
const { mapState } = createNamespacedHelpers("memberStore");

export default {
  data: () => ({
    memberPwd: "",
    memberEmail: "",
  }),

  methods: {
    naverLoginURL() {
      axios
        .post(
          "https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=aYgNgGmIwR3wysmlCfRd&client_secret=voZaFcwXXi&access_token=" +
            this.userData.memberToken +
            "&service_provider=NAVER"
        )
        .then((res) => {
          let memberEmail = this.userData.memberEmail;
          let memberPwd = "0000";
          if (res.data.access_token == this.userData.memberToken) {
            //반환된 토큰값과 보낸 토큰값이 같은 경우
            this.$store.dispatch("memberStore/deleteMember", {
              memberEmail,
              memberPwd,
            });
          }
        });
    },
    kakaoDelete() {
      let memberEmail = this.userData.memberEmail;
      let memberPwd = "0000";
      if (Kakao.Auth == undefined) {
        window.Kakao.init("9865d6b20cfcf557f7f17640b4431305");
      }

      Kakao.Auth.setAccessToken(sessionStorage.access_token);
      const self = this;
      Kakao.API.request({
        url: "/v1/user/unlink",
        success(response) {
          if (response.id != undefined) {
            self.$store.dispatch("memberStore/deleteMember", {
              memberEmail,
              memberPwd,
            });
          }
        },
      });
    },
    deleteMember: function() {
      let memberEmail = this.userData.memberEmail;
      let memberPwd = this.memberPwd;

      //store action호출
      //일반회원으로 가입한 경우
      if (this.userData.memberLevel == 0) {
        this.$store.dispatch("memberStore/deleteMember", {
          memberEmail,
          memberPwd,
        });
      }
      //소셜로그인으로 가입한 경우
      else if (this.userData.memberLevel == 3) {
        // window.Kakao.init("9865d6b20cfcf557f7f17640b4431305");
        // Kakao.Auth.setAccessToken(localStorage.access_token);
        // Kakao.API.request({
        //   url: "/v1/user/unlink",
        //   success(response) {
        //     console.log(response.data);
        //   },
        // });
      }
    },
  },
  computed: {
    ...mapState(["userData", "loginStatus"]),
  },
};
</script>

<style scoped>
* {
  font-family: "Nanum Gothic", sans-serif;
}
.out-info {
  background-color: #f1f6f9;
  border: 2px solid #a6b1e1 !important;
}
.chg-pwd,
.chg-info {
  /* background-color: #f4eeff; */
  border-right: 0px !important;
}
.info-content {
  padding: 0 !important;
}
.card-header {
  border-bottom: 0px;
  background-color: white;
}
.chg-info,
.chg-pwd,
.out-info {
  width: 33%;
  border: 1px solid #ced4da;
  display: inline-block;
}
.nav-link {
  color: black;
}
.readonly-input {
  background-color: white;
}
.input-group-text {
  width: 85px;
  display: inline-block;
  border-radius: 0px;
}
.form-control,
.findPostcode {
  border-radius: 0px;
}
#account .email,
.name,
.phone,
.addr,
.postcode,
.addrDtl {
  border-bottom: 0px;
}
.input-group > .input-group-prepend > .input-group-text,
.pwd,
.pwd.form-control,
.addrExtra.form-control {
  border-bottom: 0px;
}

div > .pwd {
  border-bottom: 1px solid #ced4da;
}
#addrExtra {
  border-bottom: 1px solid #ced4da;
}
input {
  height: 45px;
}
.delete-btn {
  background-color: #424874;
  border: none;
}
</style>

<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">ItJobGo</h1>
              <p class="text-lead text-black">
                로그인하시면 ItJobGo의 더 많은 서비스를 이용하실 수 있습니다.
              </p>
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
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <a :href="naverLoginURL">
                  <img src="img/naver_logo.png" width="250px" />
                </a>
                <a @click="kakaoLogin">
                  <img
                    class="social-login"
                    src="img/kakao_logo.png"
                    width="250px"
                  />
                </a>

                <div>
                  <img
                    class="social-login"
                    src="img/google_logo.png"
                    width="250px"
                    @click="onSignIn()"
                  />
                </div>
              </div>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <validation-observer ref="formValidator">
                <!-- v-on:submit.prevent="onSubmit" : submit 방지용 -->
                <b-form role="form" v-on:submit.prevent="onSubmit">
                  <b-form-input
                    alternative
                    class="mb-3"
                    required
                    type="email"
                    placeholder="Email"
                    v-model="model.email"
                  >
                  </b-form-input>

                  <b-form-input
                    alternative
                    class="mb-3 pwdInput"
                    required
                    type="password"
                    placeholder="Password"
                    v-model="model.password"
                  >
                  </b-form-input>
                  <span class=" mb-0 error">
                    <b-icon
                      icon="exclamation-circle-fill"
                      variant="danger"
                    ></b-icon>
                    이메일 혹은 비밀번호를 잘못 입력하셨습니다.</span
                  >
                  <b-form-checkbox v-model="model.rememberMe"
                    >Remember me</b-form-checkbox
                  >
                  <div class="text-center">
                    <b-button id="loginBtn" type="submit" class="login-btn my-4"
                      >Sign in</b-button
                    >
                  </div>
                </b-form>
              </validation-observer>
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
<script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"></script>
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<script src="https://apis.google.com/js/platform.js"></script>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");

import axios from "axios";

export default {
  data() {
    return {
      kakao_client_id: "e1e8126c8b7e3af4fd185b1774cddd2c",
      redirect_uri: "http://localhost:8081/loginCallback", //카카오
      CLIENT_ID: "aYgNgGmIwR3wysmlCfRd",
      redirectURI: `http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/naverLogin`, //서버연결
      naverLoginURL:
        "https://nid.naver.com/oauth2.0/authorize?response_type=code",
      state: Math.floor(Math.random() * 9999) + 1,
      test1: [],
      model: {
        email: "",
        password: "",
        rememberMe: false,
      },
    };
  },

  //구글 로그인 //민지
  async mounted() {
    if (Kakao.Auth == undefined) {
      window.Kakao.init("9865d6b20cfcf557f7f17640b4431305");
    }

    if (gapi.auth2 == undefined) {
      //script 로드 안됏을 경우
      gapi.load("auth2", function() {
        gapi.auth2.init();
      });
    }
  },
  methods: {
    //todo: 구글 로그인 배포 후 확인
    onSignIn() {
      var auth2 = gapi.auth2.getAuthInstance();

      if (auth2.isSignedIn.get()) {
        // 로그인한 유저 정보 가져오기
        var profile = auth2.currentUser.get().getBasicProfile();
        let ranPhone = Math.floor(Math.random() * 9999999999);
        const formData = {
          memberName: profile.getName(),
          memberEmail: profile.getEmail(),
          memberPwd: "0000",
          memberLevel: 5,
          memberToken: auth2.currentUser.get().getAuthResponse().id_token,
          memberPhone: ranPhone,
        };
        const self = this; //this scope문제
        axios
          .post(
            "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/googleLogin",
            formData
          ) //form server 연결
          .then(function(res) {
            if (res.data > 0) {
              //가입성공
              sessionStorage.setItem("access_token", formData.memberToken); //로컬에 토큰 저장
              sessionStorage.setItem("memberEmail", formData.memberEmail);
              self.$store.dispatch(
                "memberStore/getMemberInfo",
                formData.memberEmail
              );
              self.$router.push("/"); //회원가입 후 경로 설정
            } else {
              alert("회원등록에 실패했습니다. 관리자에게 문의해주세요.");
            }
          })
          .catch((error) => {
            //서버문제인 경우
            alert("회원등록에 실패했습니다. 관리자에게 문의해주세요.");
          });
      }
    },

    onSubmit: function() {
      let memberEmail = this.model.email;
      let memberPwd = this.model.password;
      //local session 구분 처리용
      //false --> session
      //true --> local
      let rememberMe = this.model.rememberMe;

      this.$store.dispatch("memberStore/login", {
        memberEmail,
        memberPwd,
        rememberMe,
      });
    },
    kakaoLogin() {
      Kakao.Auth.authorize({
        redirectUri: `${window.location.origin}/loginCallback`,
      });
    },
  },
  computed: {
    ...mapState(["loginStatus", "loginError"]),
  },
  created() {
    this.naverLoginURL += "&client_id=" + this.CLIENT_ID;
    this.naverLoginURL += "&redirect_uri=" + this.redirectURI;
    this.naverLoginURL += "&state=" + this.state;
  },
};
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
.login-btn {
  text-decoration: none;
  color: #fff;
  background-color: #424874;
  border-color: #424874;
}
/* 구글 버튼 */

.google-btn {
  vertical-align: middle;
  margin-left: 89px;
  margin-top: 3px;
}
/* 카카오버튼 */
.social-login:hover {
  cursor: pointer;
}
.login-content {
  background-color: #f7fafc !important;
  border-radius: 5px;
}
.error {
  color: red;
  font-size: 14px;
  display: none;
}
</style>

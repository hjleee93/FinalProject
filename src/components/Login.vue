<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">ItJobGo</h1>
              <p class="text-lead text-black">로그인하시면 ItJobGo의 더 많은 서비스를 이용하실 수 있습니다.</p>
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
              <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
              <div class="btn-wrapper text-center">
                
                <a :href=naverLoginURL>
                 <img src="img/naver_logo.png" width="250px">
                
                </a>
                <a @click="kakaoLogin">
                 <img src="img/kakao_logo.png" width="250px">
                </a>
                 <a href="#">
                 <img src="img/google_logo.png" width="250px">
                </a>
              </div>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <validation-observer ref="formValidator">
                <b-form role="form" >
                  <b-form-input alternative
                              class="mb-3"
                              required
                              type="email"
                              placeholder="Email"
                              v-model="model.email">
                  </b-form-input>

                  <b-form-input alternative
                              class="mb-3"
                              required
                              type="password"
                              placeholder="Password"
                              v-model="model.password">
                  </b-form-input>
                  <span class=" mb-0 error">
                    <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon> 이메일 혹은 비밀번호를 잘못 입력하셨습니다.</span>
                  <b-form-checkbox v-model="model.rememberMe">Remember me</b-form-checkbox>
                  <div class="text-center">
                    <base-button type="primary" @click="login({memberEmail: model.email, memberPwd:model.password})" class="my-4">Sign in</base-button>
                    
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/findPassword" class="text-dark"><small>Forgot password?</small></router-link>
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-dark"><small>Create new account</small></router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  
  </div>
  
</template>
<script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"></script>
<script>
import { mapState} from 'vuex'

// import axios from "axios"

  export default {
    data() {
      
      return {
        CLIENT_ID: 'aYgNgGmIwR3wysmlCfRd',
        redirectURI:`http://localhost:8082/itjobgo/member/naverLogin`,
         naverLoginURL: 'https://nid.naver.com/oauth2.0/authorize?response_type=code',
         isPopup: true,
         state:123,
        test1: [],
        model: {
          email: '',
          password: '',
          rememberMe: false,
          
        }
      };
    },
    
    mounted() {    
    Kakao.isInitialized() 
    
    Kakao.Auth.setAccessToken(this.$route.params.accessToken)
    Kakao.API.request({
      url: '/v2/user/me',
      success(response) {
        console.log(response)
      },
      fail(error) {
        console.log(error)
      }
    })
  },
    methods: {
      // ...mapActions(['login']),
       login: function () {
        let memberEmail = this.model.email
        let memberPwd = this.model.password
        console.log("email: " + memberEmail)
        console.log("password: " + memberPwd)
        this.$store.dispatch('login', { memberEmail, memberPwd })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      },
      kakaoLogin() {
      Kakao.Auth.authorize({
        redirectUri: `${window.location.origin}/loginCallback`
      })
      
    }
      
  },
  computed:{
    ...mapState(["loginStatus","loginError"])
  },
  created () {
    this.naverLoginURL += '&client_id=' + this.CLIENT_ID;
    this.naverLoginURL += '&redirect_uri=' + this.redirectURI;
    this.naverLoginURL += '&state=' + this.state;

    
  }
  
  };
</script>


  
  	
  
<style scoped>
.login-content{
  background-color: #f7fafc !important;
  border-radius: 5px;
}
.error{
  color: red;
  font-size: 14px;
  display: none;
}
</style>

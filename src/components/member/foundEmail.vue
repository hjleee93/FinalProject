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
                입력하신 전화번호로 등록된 이메일입니다.<br>
              </div>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
                
              <p class="email">{{this.$route.params.email}}</p>
            </b-card-body>
          </b-card>

          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/findPassword" class="text-dark"
                ><small>Forgot Password?</small></router-link
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

    

<style scoped>
.email{
    margin:0 auto;
    text-align: center;
}
</style>
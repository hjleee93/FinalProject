<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">회원정보 수정</h1>
              
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
              <div class="text-muted text-center chg-info" ><router-link class="nav-link" to="/login">개인정보수정</router-link></div>
              <div class="text-muted text-center chg-pwd" ><router-link class="nav-link" to="/login">비밀번호변경</router-link></div>
              <div class="text-muted text-center out-info"><router-link class="nav-link" to="/login">회원탈퇴</router-link></div>
            </b-card-header>
            
            <b-card-body class="px-lg-5 py-lg-5">
              
            
                <b-form role="form" @submit.prevent="onSubmit">
                    <b-input-group prepend="이메일" class="mb-2">
                        <b-form-input 
                        readonly
                        class="readonly-input"
                        v-model= userData.memberPhone
                        prepend= "이메일"
                        background-color="white"
                        ></b-form-input>
                    </b-input-group>
                        <b-input-group prepend="비밀번호" class="mb-2">
                        <b-form-input 
                        readonly
                        class="readonly-input"
                        v-model= userData.memberPhone
                        prepend= "이메일"
                        background-color="white"
                        ></b-form-input>
                    </b-input-group>
                    
                  <base-input alternative
                              class="mb-3"
                              name="phoneNumber"
                              :rules="{required: true, tel: true}"
                              placeholder="Phone Number"
                              v-model="phone">
                  </base-input>

                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4">수정완료</base-button>
                  </div>
                </b-form>
              
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
     
  </div>
  
</template>

<script>
import {mapState} from 'vuex'

export default {
	computed:{
		...mapState(['userData'])
	}
}
</script>

<style scoped>
.login-content{
    padding:0 !important;
}
.chg-info, .chg-pwd, .out-info{
    width:33%;
    border:1px solid;
    display:inline-block;

}
.nav-link{
    color:black;
}
.readonly-input{
    background-color: white;
}
.input-group-text{
    width:85px;
   display: inline-block;
    
}
</style>
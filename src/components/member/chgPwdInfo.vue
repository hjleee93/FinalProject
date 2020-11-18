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
          <b-card no-body class="border-0 mb-0 ">
            <b-card-header class="info-content mb-4">
              <div class="text-muted text-center chg-info">
                <router-link class="nav-link" to="/chgMemberInfo"
                  >개인정보수정</router-link
                >
              </div>
              <div class="text-muted text-center chg-pwd">
                <router-link class="nav-link" to="/chgPwdInfo"
                  >비밀번호변경</router-link
                >
              </div>
              <div class="text-muted text-center out-info">
                <router-link class="nav-link" to="/outMember">회원탈퇴</router-link>
              </div>
            </b-card-header>

            <b-card-body class="px-lg-5 py-lg-5 info-content">
             

                <ValidationObserver ref="observer">
     <b-form role="form" slot-scope="{ validate }" @submit.prevent="validate().then(onSubmit)">
                
                  <b-input-group>
                    <b-form-input
                        class="pwd"
                      required
                      type="password"
                      placeholder="현재 비밀번호 입력"
                      v-model="memberPwd"
                    ></b-form-input>
                  </b-input-group>
                
                
      <ValidationProvider rules="required|min:8|passwordCheck" vid="password" name="비밀번호">
        <b-form-group 
          slot-scope="{ valid, errors }"
         >      
            <b-form-input
            required
            class="pwdCheck"
              type="password"
              v-model="password"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="새 비밀번호 입력">
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required|confirmed:password|min:8" name="비밀번호">
        <b-form-group 
          slot-scope="{ valid, errors }"
          label-for="exampleInput1">
            <b-form-input
              id="exampleInput1"
              type="password"
              required
              v-model="confirmation"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="비밀번호 확인">
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>



                  <div class="text-center">
                    <b-button class="btn-primary my-4" type="submit" variant="primary">Change Password</b-button>
                  </div>
               
    </b-form>
</ValidationObserver>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ValidationObserver, ValidationProvider,Validator } from 'vee-validate';

Validator.extend("passwordCheck", {
  getMessage: (field) =>
    `${field} 대소문자 하나 이상, 숫자, 특수문자(!@#$%^&*()?_)의 조합으로 8~20자리를 사용해야합니다.`,
  validate: (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/.test(
      value
    );
  },
});

export default {
    components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    memberPwd: "",
    password:"",
    confirmation: ''
  }),

  computed: {
    ...mapState(["userData"]),
  },
};
</script>

<style scoped>
.chg-pwd{
    background-color: #f1f6f9;
    border:2px solid #a6b1e1 !important;
}
.chg-info{
    /* background-color: #f4eeff; */
    border-right: 0px !important;
}
.out-info{
    border-left: 0px !important;
}
.info-content {
  padding: 0 !important;
  
}
.card-header{
    border-bottom:0px;
    background-color: white;
}
input{
    height:45px;
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
.form-control {
  border-radius: 0px;
}

fieldset{
    margin-bottom: 0%;
}
</style>

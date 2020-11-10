<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">비밀번호 변경</h1>
              
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
              <div class="text-muted text-center mt-2 mb-3">사용하실 비밀번호를 입력해주세요</div>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              
            <ValidationObserver ref="observer">
    <b-form slot-scope="{ validate }" @submit.prevent="validate().then(onSubmit)">
      <ValidationProvider rules="required|min:8|passwordCheck" vid="password" name="비밀번호">
        <b-form-group 
          slot-scope="{ valid, errors }"
          label="Password:"
          description="비밀번호는 대소문자 하나 이상, 숫자, 특수문자(!@#$%^&*()?_)의 조합으로 8~20자리를 사용해야합니다."
         >      
            <b-form-input
            required
              type="password"
              v-model="password"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter password">
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required|confirmed:password|min:8" name="비밀번호">
        <b-form-group 
          slot-scope="{ valid, errors }"
          label="Confirm Password:"
          label-for="exampleInput1">
            <b-form-input
              id="exampleInput1"
              type="password"
              required
              v-model="confirmation"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Confirm Password">
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
import { ValidationObserver, ValidationProvider,Validator } from 'vee-validate';

//비밀번호 유효성
Validator.extend("passwordCheck", {

  validate: value => {
    const strong_password = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
    );
    return strong_password.test(value);
  }
  
});
  export default {
    components: {
    ValidationObserver,
    ValidationProvider
  },
    data: () => ({
      
        
          password: '',
          confirmation: ''
        }),
     
    methods: {
      onSubmit() {
        // this will be called only after form is valid. You can do api call here to login
      }
    }
  };
</script>

<style>
.login-content{
  background-color: #f7fafc !important;
  border-radius: 5px;
}


.btn-primary  {
  text-decoration: none;
    color: #fff;
    background-color: #5e72e4;
    border-color: #5e72e4;
}
.btn-primary:hover{
  text-decoration: none;
  border-color: #5e72e4;
  background-color: #5e72e4;
  transform: translateY(-1px);
}

</style>
<template>
  <div>
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">Create an account</h1>
              <p class="text-lead text-black">
                간편한 회원가입으로 ItJobGo의 다양한 서비스를 누리세요
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="border-0 mb-0 login-content">
            <b-card-body class="px-lg-5 py-lg-5">
              <ValidationObserver ref="observer">
                <b-form
                  slot-scope="{ validate }"
                  @submit.prevent="validate().then(onSubmit)"
                  @reset="resetForm"
                >
                  <ValidationProvider
                    rules="required|email|emailCheck"
                    name="이메일"
                  >
                    <b-form-group
                      slot-scope="{ valid, errors }"
                      label="Email address:"
                    >
                      <b-form-input
                        required
                        type="email"
                        v-model="email"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="Enter email"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <ValidationProvider
                    rules="required|passwordCheck"
                    vid="password"
                    name="비밀번호"
                  >
                    <b-form-group
                      slot-scope="{ valid, errors }"
                      label="Password:"
                    >
                      <b-form-input
                        required
                        type="password"
                        v-model="password"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="Enter password"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <ValidationProvider
                    rules="required|confirmed:password|min:8"
                    name="비밀번호"
                  >
                    <b-form-group
                      slot-scope="{ valid, errors }"
                      label="Confirm Password:"
                      label-for="exampleInput1"
                    >
                      <b-form-input
                        id="exampleInput1"
                        type="password"
                        required
                        v-model="confirmation"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="Confirm Password"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <ValidationProvider rules="required|min:2" name="이름">
                    <b-form-group
                      id="input-group-2"
                      label="Your Name:"
                      label-for="input-2"
                      slot-scope="{ valid, errors }"
                    >
                      <b-form-input
                        id="input-2"
                        v-model="userName"
                        :state="errors[0] ? false : valid ? true : null"
                        required
                        placeholder="Enter name"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <ValidationProvider
                    rules="required|digits:11|phoneCheck"
                    name="전화번호"
                  >
                    <b-form-group
                      id="exampleInputGroup3"
                      slot-scope="{ valid, errors }"
                      label="Phone Number:"
                      label-for="exampleInput3"
                    >
                      <b-form-input
                        required
                        type="text"
                        v-model="phoneNumber"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="Please enter number only"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>

                  <div class="text-center">
                    <b-button
                      class="btn-primary my-4"
                      type="submit"
                      variant="primary"
                      >Create Account</b-button
                    >
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
import axios from "axios";
import {
  ValidationObserver,
  ValidationProvider,
  Validator,
} from "vee-validate";

//비밀번호 유효성
Validator.extend("passwordCheck", {
  getMessage: (field) =>
    `${field} 대소문자 하나 이상, 숫자, 특수문자(!@#$%^&*()?_)의 조합으로 8~20자리를 사용해야합니다.`,
  validate: (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/.test(
      value
    );
  },
});

//이메일 중복(Custom rule): axios 연결 validate
Validator.extend("emailCheck", {
  getMessage: (field) => `중복된 ${field} 입니다. 다시 입력해주세요`,
  validate: (value) => {
    return axios
      .post(
        "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/checkEmail",
        {
          memberEmail: value,
        }
      )
      .then((response) => {
        if (response.data != "") {
          //리턴값이 없는 경우
          return false;
        } else {
          //리턴값 존재하는 경우
          return true;
        }
      });
  },
});

Validator.extend("phoneCheck", {
  getMessage: (field) => `중복된 ${field} 입니다. 다시 입력해주세요`,
  validate: (value) => {
    return axios
      .post(
        "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/checkPhone",
        {
          memberPhone: value,
        }
      )
      .then((response) => {
        if (response.data != "") {
          //리턴값이 없는 경우
          return false;
        } else {
          //리턴값 존재하는 경우
          return true;
        }
      });
  },
});

export default {
  name: "BootstrapForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    email: "",
    password: "",
    confirmation: "",
    userName: "",
    phoneNumber: "",
  }),

  methods: {
    //register
    onSubmit() {
      const formData = {
        memberEmail: this.email,
        memberPwd: this.password,
        memberName: this.userName,
        memberPhone: this.phoneNumber,
      };
      const self = this; //this scope문제

      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/register",
          formData
        ) //form server 연결
        .then(function(res) {
          if (res.data > 0) {
            //가입성공
            alert("가입에 성공하셨습니다!");
            self.$router.push("/login"); //회원가입 후 경로 설정
          } else {
            alert("회원가입에 실패하였습니다. 다시 시도해주세요");
          }
        })
        .catch(() => {
          //서버문제인 경우
          alert("회원가입에 실패하였습니다. 관리자에게 문의해주세요");
        });
    },

    resetForm() {
      this.email = "";
      this.password = "";
      this.confirmation = "";
      this.userName = "";
      this.phoneNumber = "";
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
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
</style>

<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black mt-3">비밀번호 변경</h1>
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
            <b-card-header class="info-content mb-4  text-center">
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
              <ValidationObserver ref="observer">
                <b-form
                  role="form"
                  slot-scope="{ validate }"
                  @submit.prevent="validate().then(onSubmit)"
                >
                  <b-input-group>
                    <b-form-input
                      class="pwd"
                      required
                      type="password"
                      placeholder="현재 비밀번호 입력"
                      v-model="memberPwd"
                    ></b-form-input>
                  </b-input-group>

                  <ValidationProvider
                    rules="required|min:8|passwordCheck"
                    vid="password"
                    name="비밀번호"
                  >
                    <b-form-group slot-scope="{ valid, errors }">
                      <b-form-input
                        required
                        class="pwdCheck"
                        type="password"
                        v-model="password"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="새 비밀번호 입력"
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
                      label-for="exampleInput1"
                    >
                      <b-form-input
                        id="exampleInput1"
                        type="password"
                        required
                        v-model="confirmation"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="비밀번호 확인"
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
                      >Change Password</b-button
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
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");
import {
  ValidationObserver,
  ValidationProvider,
  Validator,
} from "vee-validate";
import axios from "axios";

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
    ValidationProvider,
  },
  data: () => ({
    memberPwd: "",
    password: "",
    confirmation: "",
  }),
  methods: {
    onSubmit() {
      const formData = {
        memberEmail: this.userData.memberEmail,
        memberPwd: this.memberPwd,
        memberNewPwd: this.password,
      };

      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/updatePwdInfo",
          formData
        ) //form server 연결
        .then((res) => {
          if (res.data > 0) {
            //업데이트 ok
            this.$swal({
              text: "비밀번호가 변경되었습니다. 로그아웃 됩니다. ",
              icon: "success",
            });
            setTimeout(() => this.$router.push({ path: "/" }), 2000); //메인페이지로 이동

            //스토리지 삭제
            localStorage.clear();
            sessionStorage.clear();
          } else if (res.data == -1) {
            //비밀번호 틀린경우
            this.$swal({
              text: "비밀번호가 틀렸습니다. 다시 확인해주세요",
              icon: "error",
            });
          } else {
            this.$swal({
              text:
                "비밀번호 변경에 실패했습니다. 다시 한 번 시도해주시거나 관리자에게 문의해주세요",
              icon: "error",
            });
          }
        })
        .catch(() => {
          this.$swal({
            text: "비밀번호 변경에 실패했습니다. 관리자에게 문의해주세요",
            icon: "error",
          });
        });
    },
  },

  computed: {
    ...mapState(["userData"]),
  },
};
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
.chg-pwd {
  background-color: #f1f6f9;
  border: 2px solid #a6b1e1 !important;
}
.chg-info {
  /* background-color: #f4eeff; */
  border-right: 0px !important;
}
.out-info {
  border-left: 0px !important;
}
.info-content {
  padding: 0 !important;
}
.card-header {
  border-bottom: 0px;
  background-color: white;
}
input {
  height: 45px;
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

fieldset {
  margin-bottom: 0%;
}

form[role="form"]
  div[role="group"]:nth-of-type(1)
  input:not(".form-control.is-invalid") {
  border-bottom: none;
}

/* .form-control.is-invalid, .was-validated .form-control:invalid{border:none}
.form-control.is-invalid:focus, .was-validated .form-control:invalid:focus, .form-control.is-invalid, .was-validated .form-control:invalid{
  box-shadow: inset 0px 0px 0px 1px rgb(220 53 69) !important;

} */
</style>

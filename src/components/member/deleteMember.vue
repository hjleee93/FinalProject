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
                <router-link class="nav-link px-0" to="/chgMemberInfo"
                  >개인정보수정</router-link
                >
              </div>
              <div class="text-muted text-center chg-pwd">
                <router-link class="nav-link px-0" to="/chgPwdInfo"
                  >비밀번호변경</router-link
                >
              </div>
              <div class="text-muted text-center out-info">
                <router-link class="nav-link px-0" to="/deleteMember"
                  >회원탈퇴</router-link
                >
              </div>
            </b-card-header>

            <b-card-body class="px-lg-5 py-lg-5 info-content">
              <div class="m-4 text-center">
                <p class="text-center font-weight-bold h5">탈퇴 즉시 회원정보 삭제</p>

                -탈퇴 즉시 이력서 및 구직활동 정보가 모두 삭제되며, 삭제된
                정보는 복구되지 않습니다. 단, 공공적 성격의 게시물은 삭제되지
                않으므로 탈퇴 전 미리 삭제해주세요.
              </div>
              <!-- <b-form role="form" @submit.prevent="onSubmit"> -->
                <b-form role="form">
                <div id="account">
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
                </div>

                <div class="text-center">
                  <base-button type="primary"  class="my-4"
                    @click="deleteMember()">회원 탈퇴</base-button
                  >
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
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");

export default {
  data: () => ({
    memberPwd: ""
  }),

  methods: {
    deleteMember:function(){
      let memberEmail = this.userData.memberEmail;
      let memberPwd =  this.memberPwd;
      //store action호출
      this.$store.dispatch('memberStore/deleteMember', { memberEmail, memberPwd })
      
    }
   
  
  },
  computed: {
    ...mapState(["userData","loginStatus"]),
  },
  
};
</script>

<style scoped>
.out-info{
    background-color: #f1f6f9;
    border:2px solid #a6b1e1 !important;
}
.chg-pwd,.chg-info{
    /* background-color: #f4eeff; */
    border-right: 0px !important;
}
.info-content {
  padding: 0 !important;
  
}
.card-header{
    border-bottom:0px;
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

</style>

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
              <b-form role="form" @submit.prevent="onSubmit">
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

                <div id="information">
                  <b-input-group prepend="이름" class="mt-4">
                    <b-form-input
                      readonly
                      class="readonly-input name"
                      v-model="userData.memberName"
                    ></b-form-input>
                  </b-input-group>
                  <b-input-group prepend="휴대폰">
                    <b-form-input
                      class="readonly-input phone"
                      type="number"
                      :state="telSize"
                      v-model="userData.memberPhone"
                    ></b-form-input>
                  </b-input-group>
                </div>
                <b-input-group prepend="우편번호">
                  <b-form-input
                    readonly
                    class="readonly-input postcode"
                    type="text"
                    id="sample6_postcode"
                    v-model="userData.memberPostCode"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button class="findPostcode" @click="daumPostcode()">우편번호 찾기</b-button>
                  </b-input-group-append>
                </b-input-group>

                <b-input-group prepend="주소">
                  <b-form-input
                    readonly
                    class="readonly-input addr"
                    type="text"
                    id="sample6_address"
                    v-model="userData.memberAddr"
                  ></b-form-input>
                </b-input-group>

                 <b-input-group prepend="상세주소">
                  <b-form-input
                    readonly
                    class="readonly-input addrDtl"
                    type="text"
                    id="sample6_detailAddress"
                    placeholder="상세주소를 입력해주세요"
                    v-model="userData.memberAddrDtl"
                  ></b-form-input>
                </b-input-group>

                <div id="addrExtra">
            <b-input-group prepend="추가주소" >
                  <b-form-input
                  
                    readonly
                    class="readonly-input addrExtra"
                    type="text"
                    id="sample6_extraAddress"
                    
                    v-model="userData.memberAddrExtra"
                  ></b-form-input>
                </b-input-group>
                <b-input-group prepend="포지션" >
                  <b-form-select
                    class="position"
                    type="text"
                    v-model="userData.memberPosition"
                    :options="position"
                  ></b-form-select>
                </b-input-group>
                
                </div>
                
                <div class="text-center">
                  <base-button type="primary" native-type="submit" class="my-4"
                    >수정완료</base-button
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

<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false"></script>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    memberPwd: "",
    position: [{ text: '관심있는 직군을 선택해주세요', value: null },'디자인', '백엔드', '프론트엔드', '퍼블리싱'],
  }),

  methods: {
     onSubmit() {
      const formData = {
        memberEmail: this.userData.memberEmail,
        memberPwd: this.memberPwd,
        memberPhone: this.userData.memberPhone,
        memberPostCode: this.userData.memberPostCode,
        memberAddr: this.userData.memberAddr,
        memberAddrDtl: this.userData.memberAddrDtl,
        memberAddrExtra: this.userData.memberAddrExtra,
        memberPosition: this.userData.memberPosition
      };
      const self = this; //this scope문제

      axios
        .post("http://localhost:8082/itjobgo/member/updateInfo", formData) //form server 연결
        .then(function(res) {
          console.log(formData)
          if (res.status >= 200 && res.status <= 204) {
            //가입성공
            alert("가입에 성공하셨습니다!");
            self.$router.push("/login"); //회원가입 후 경로 설정
          }
        })
        .catch((error) => {
          alert("회원가입에 실패하였습니다. 다시 시도해주세요");
          console.log("실패", error);
        });
    },
    daumPostcode: function() {
      daum.postcode.load(function() {
        new daum.Postcode({
          oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ""; // 주소 변수
            var extraAddr = ""; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === "R") {
              // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
            } else {
              // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === "R") {
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if (data.buildingName !== "" && data.apartment === "Y") {
                extraAddr +=
                  extraAddr !== ""
                    ? ", " + data.buildingName
                    : data.buildingName;
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if (extraAddr !== "") {
                extraAddr = " (" + extraAddr + ")";
              }
              // 조합된 참고항목을 해당 필드에 넣는다.
              document.getElementById("sample6_extraAddress").value = extraAddr;
            } else {
              document.getElementById("sample6_extraAddress").value = "";
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("sample6_postcode").value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
          },
        }).open();
      });
    },
  },
  computed: {
    ...mapState(["userData"]),
    
      telSize() {
        return this.userData.memberPhone.length == 11 ? true : false
      }
    
  },
};
</script>

<style scoped>
.chg-info{
    background-color: #f1f6f9;
    border:2px solid #a6b1e1 !important;
}
.chg-pwd{
    /* background-color: #f4eeff; */
    border-right: 0px !important;
}
.chg-pwd{
    border-left: 0px !important;
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
.form-control, .findPostcode {
  border-radius: 0px;
}
.postcode{
  border-top: 0px;
}
#account .email, .name, .addr, .postcode, .addrDtl {
  border-bottom: 0px;
}
.input-group > .input-group-prepend > .input-group-text, .pwd, .pwd.form-control, .addrExtra.form-control{
  border-bottom: 0px;
}

div > .pwd{
    border-bottom: 1px solid #ced4da;
}
#addrExtra{
    border-bottom: 1px solid #ced4da;
}
input, select{
    height:45px;
}
select{
  border-bottom: 0px;
}
button{
  background-color: #424874;
  border: 0px;
}

/* number필드 화살표 지우기 : 파폭제외 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* 파폭용  */
input[type=number] {
  -moz-appearance: textfield;
}
</style>

<template>
  <div></div>
</template>

<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<script>
import axios from "axios";
import store from "../../store.js";
export default {
  async created() {
    await window.Kakao.init("9865d6b20cfcf557f7f17640b4431305");
  },
  async mounted() {
    Kakao.Auth.setAccessToken(this.$route.params.accessToken);
    var memberToken = this.$route.params.accessToken;
    let ranPhone = Math.floor(Math.random() * 9999999999);
    const self = this; //this scope문제
    Kakao.API.request({
      url: "/v2/user/me",
      success(response) {
        console.log(">>" + response.kakao_account.email);
        console.log(" this.memberToken: " + memberToken);
        const formData = {
          memberEmail: response.kakao_account.email,
          memberToken: memberToken,
          memberLevel: 3,
          memberName: response.kakao_account.profile.nickname,
          memberPwd: "0000",
          memberPhone: ranPhone,
        };

        axios
          .post("http://localhost:8082/itjobgo/member/kakaoRegister", formData) //form server 연결
          .then(function(res) {
            console.log(formData);
            if (res.data > 0) {
              //가입성공

              sessionStorage.setItem("access_token", memberToken); //로컬에 토큰 저장
              sessionStorage.setItem(
                "memberEmail",
                response.kakao_account.email
              );
              self.$store.dispatch(
                "memberStore/getMemberInfo",
                response.kakao_account.email
              );
              self.$router.push("/"); //회원가입 후 경로 설정
            }
          })
          .catch((error) => {
            console.log("실패", error);
          });
      },
      fail(error) {
        console.log(error);
      },
    });
  },
};
</script>

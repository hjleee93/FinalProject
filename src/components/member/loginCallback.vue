<!-- 카카오로그인 callback -->
<template>
  <v-layout column> </v-layout>
</template>
<script>
import axios from "axios";
export default {
    
  mounted() {
    const qs = require('qs')
    let accessToken = null
    const parameter = {
      grant_type: 'authorization_code',
      client_id: 'e1e8126c8b7e3af4fd185b1774cddd2c',
      code: this.$route.query.code
    }
    axios
      .post('https://kauth.kakao.com/oauth/token', qs.stringify(parameter), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      .then((res) => {
        accessToken = res.data.access_token;//카카오 토큰
        console.log("카카오토큰: " + accessToken)
        
        this.$router.push({
          name: 'kakaoCallbackLogin',
          params: {
            accessToken
          }
        })
        
      })
  }
}
</script>
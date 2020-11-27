<!-- 네이버로그인api -->
<template>
    <div>
    </div>
</template>

<script>
export default {
    name:'NaverLogin',
    data () {
    return {
      access_token: '',
      memberEmail:''
    };
  },
  methods: {
  },
  created () {
    
    this.access_token = this.$route.query.token;
    this.memberEmail = this.$route.query.email;
    localStorage.setItem("access_token", this.access_token);//로컬에 토큰 저장
    localStorage.setItem("memberEmail", this.memberEmail);
    this.$store.dispatch('memberStore/getMemberInfo',this.memberEmail);
    
    this.$router.push('/');
  }
}
</script>
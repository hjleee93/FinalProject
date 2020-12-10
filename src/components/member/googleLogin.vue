<!-- 구글 로그인 api -->
<template>
    <div>
    </div>
</template>

<script>
export default {
    name:'',
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
        localStorage.setItem("access_token", this.access_token);
        localStorage.setItem("memberEmail", this.memberEmail);
        this.$store.dispatch('memberStore/getMemberInfo',this.memberEmail);
        
        this.$router.push('/');
    }
}
</script>